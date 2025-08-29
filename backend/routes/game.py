from fastapi import APIRouter, HTTPException, Depends
from typing import List
from motor.motor_asyncio import AsyncIOMotorDatabase
from ..database import get_database
from ..models.player import (
    PlayerProgress, GameSession, LevelCompletion, 
    PlayerCreate, PlayerResponse
)
from datetime import datetime
import uuid

router = APIRouter(prefix="/api/game", tags=["game"])

@router.post("/player", response_model=PlayerResponse)
async def create_player(
    player_data: PlayerCreate,
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    """Crear un nuevo jugador"""
    player_id = str(uuid.uuid4())
    
    # Crear progreso inicial
    initial_progress = PlayerProgress(
        player_id=player_id,
        current_level=1,
        completed_levels=[],
        stars_earned=0
    )
    
    # Guardar jugador
    player_doc = {
        "id": player_id,
        "player_name": player_data.player_name,
        "created_at": datetime.utcnow()
    }
    
    await db.players.insert_one(player_doc)
    await db.player_progress.insert_one(initial_progress.dict())
    
    return PlayerResponse(
        id=player_id,
        player_name=player_data.player_name,
        progress=initial_progress,
        created_at=player_doc["created_at"]
    )

@router.get("/player/{player_id}/progress", response_model=PlayerProgress)
async def get_player_progress(
    player_id: str,
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    """Obtener progreso del jugador"""
    progress = await db.player_progress.find_one({"player_id": player_id})
    
    if not progress:
        raise HTTPException(status_code=404, detail="Player progress not found")
    
    return PlayerProgress(**progress)

@router.put("/player/{player_id}/progress")
async def update_player_progress(
    player_id: str,
    progress_data: PlayerProgress,
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    """Actualizar progreso del jugador"""
    progress_data.player_id = player_id
    progress_data.updated_at = datetime.utcnow()
    
    result = await db.player_progress.update_one(
        {"player_id": player_id},
        {"$set": progress_data.dict()},
        upsert=True
    )
    
    return {"updated": result.modified_count > 0 or result.upserted_id is not None}

@router.post("/session/start")
async def start_game_session(
    player_id: str,
    level_id: int,
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    """Iniciar una sesión de juego"""
    session = GameSession(
        player_id=player_id,
        level_id=level_id
    )
    
    await db.game_sessions.insert_one(session.dict())
    
    return {"session_id": session.id}

@router.put("/session/{session_id}/complete")
async def complete_game_session(
    session_id: str,
    moves_count: int,
    final_grid_state: dict,
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    """Completar una sesión de juego"""
    session = await db.game_sessions.find_one({"id": session_id})
    
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")
    
    # Calcular tiempo de completion
    start_time = session["start_time"]
    end_time = datetime.utcnow()
    completion_time = int((end_time - start_time).total_seconds())
    
    # Actualizar sesión
    await db.game_sessions.update_one(
        {"id": session_id},
        {
            "$set": {
                "completed": True,
                "end_time": end_time,
                "moves_count": moves_count,
                "completion_time": completion_time,
                "final_grid_state": final_grid_state
            }
        }
    )
    
    # Determinar estrellas ganadas basado en tiempo
    stars = calculate_stars(session["level_id"], completion_time, moves_count)
    
    # Registrar completion
    completion = LevelCompletion(
        player_id=session["player_id"],
        level_id=session["level_id"],
        stars_earned=stars,
        completion_time=completion_time,
        moves_count=moves_count
    )
    
    await db.level_completions.insert_one(completion.dict())
    
    # Actualizar progreso del jugador
    await update_player_level_progress(
        session["player_id"], 
        session["level_id"], 
        stars, 
        completion_time,
        db
    )
    
    return {
        "completed": True,
        "stars_earned": stars,
        "completion_time": completion_time,
        "moves_count": moves_count
    }

@router.get("/leaderboard/{level_id}")
async def get_level_leaderboard(
    level_id: int,
    limit: int = 10,
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    """Obtener leaderboard de un nivel"""
    pipeline = [
        {"$match": {"level_id": level_id}},
        {
            "$lookup": {
                "from": "players",
                "localField": "player_id",
                "foreignField": "id",
                "as": "player"
            }
        },
        {"$unwind": "$player"},
        {
            "$project": {
                "player_name": "$player.player_name",
                "stars_earned": 1,
                "completion_time": 1,
                "moves_count": 1,
                "completed_at": 1
            }
        },
        {"$sort": {"stars_earned": -1, "completion_time": 1, "moves_count": 1}},
        {"$limit": limit}
    ]
    
    results = await db.level_completions.aggregate(pipeline).to_list(limit)
    return results

@router.get("/stats/global")
async def get_global_stats(db: AsyncIOMotorDatabase = Depends(get_database)):
    """Estadísticas globales del juego"""
    total_players = await db.players.count_documents({})
    total_completions = await db.level_completions.count_documents({})
    
    # Nivel más popular
    pipeline = [
        {"$group": {"_id": "$level_id", "count": {"$sum": 1}}},
        {"$sort": {"count": -1}},
        {"$limit": 1}
    ]
    
    popular_level = await db.level_completions.aggregate(pipeline).to_list(1)
    most_popular_level = popular_level[0]["_id"] if popular_level else 1
    
    # Tiempo promedio por nivel
    avg_times_pipeline = [
        {"$group": {"_id": "$level_id", "avg_time": {"$avg": "$completion_time"}}},
        {"$sort": {"_id": 1}}
    ]
    
    avg_times = await db.level_completions.aggregate(avg_times_pipeline).to_list(10)
    
    return {
        "total_players": total_players,
        "total_completions": total_completions,
        "most_popular_level": most_popular_level,
        "average_completion_times": avg_times
    }

async def update_player_level_progress(
    player_id: str, 
    level_id: int, 
    stars: int, 
    completion_time: int,
    db: AsyncIOMotorDatabase
):
    """Actualizar progreso del jugador después de completar un nivel"""
    progress = await db.player_progress.find_one({"player_id": player_id})
    
    if progress:
        # Añadir nivel completado si no está ya
        if level_id not in progress.get("completed_levels", []):
            await db.player_progress.update_one(
                {"player_id": player_id},
                {
                    "$push": {"completed_levels": level_id},
                    "$inc": {"stars_earned": stars},
                    "$set": {
                        f"best_completion_times.{level_id}": completion_time,
                        "updated_at": datetime.utcnow()
                    }
                }
            )
            
            # Desbloquear siguiente nivel si es necesario
            if level_id == progress.get("current_level", 1):
                await db.player_progress.update_one(
                    {"player_id": player_id},
                    {"$set": {"current_level": level_id + 1}}
                )

def calculate_stars(level_id: int, completion_time: int, moves_count: int) -> int:
    """Calcular estrellas basado en rendimiento"""
    # Tiempo objetivo por nivel (en segundos)
    time_thresholds = {
        1: {"gold": 60, "silver": 120},
        2: {"gold": 90, "silver": 180},
        3: {"gold": 120, "silver": 240},
        4: {"gold": 150, "silver": 300},
        5: {"gold": 200, "silver": 400},
        6: {"gold": 300, "silver": 600}
    }
    
    thresholds = time_thresholds.get(level_id, {"gold": 180, "silver": 360})
    
    # Calcular estrellas
    if completion_time <= thresholds["gold"] and moves_count <= 20:
        return 3  # 3 estrellas
    elif completion_time <= thresholds["silver"] and moves_count <= 35:
        return 2  # 2 estrellas
    else:
        return 1  # 1 estrella