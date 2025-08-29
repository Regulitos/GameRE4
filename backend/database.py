from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorDatabase
import os

# Cliente de MongoDB
client: AsyncIOMotorClient = None
database: AsyncIOMotorDatabase = None

async def get_database() -> AsyncIOMotorDatabase:
    """Obtener instancia de la base de datos"""
    return database

async def connect_to_mongo():
    """Conectar a MongoDB"""
    global client, database
    
    mongo_url = os.environ.get('MONGO_URL', 'mongodb://localhost:27017')
    db_name = os.environ.get('DB_NAME', 'puzzle_inventory')
    
    client = AsyncIOMotorClient(mongo_url)
    database = client[db_name]
    
    # Crear índices para optimización
    await create_indexes()

async def close_mongo_connection():
    """Cerrar conexión a MongoDB"""
    if client:
        client.close()

async def create_indexes():
    """Crear índices para optimizar consultas"""
    if database:
        # Índices para player_progress
        await database.player_progress.create_index("player_id", unique=True)
        
        # Índices para game_sessions
        await database.game_sessions.create_index([("player_id", 1), ("level_id", 1)])
        await database.game_sessions.create_index("start_time")
        
        # Índices para level_completions
        await database.level_completions.create_index([("level_id", 1), ("completion_time", 1)])
        await database.level_completions.create_index([("player_id", 1), ("level_id", 1)])
        await database.level_completions.create_index("completed_at")
        
        # Índices para players
        await database.players.create_index("id", unique=True)