from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime
import uuid

class PlayerProgress(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    player_id: str
    current_level: int = 1
    completed_levels: List[int] = []
    stars_earned: int = 0
    total_playtime: int = 0  # en segundos
    best_completion_times: dict = {}  # level_id -> tiempo en segundos
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class GameSession(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    player_id: str
    level_id: int
    start_time: datetime = Field(default_factory=datetime.utcnow)
    end_time: Optional[datetime] = None
    completed: bool = False
    moves_count: int = 0
    completion_time: Optional[int] = None  # en segundos
    final_grid_state: dict = {}

class LevelCompletion(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    player_id: str
    level_id: int
    stars_earned: int
    completion_time: int  # en segundos
    moves_count: int
    completed_at: datetime = Field(default_factory=datetime.utcnow)

class PlayerCreate(BaseModel):
    player_name: Optional[str] = "Survivor"
    
class PlayerResponse(BaseModel):
    id: str
    player_name: str
    progress: PlayerProgress
    created_at: datetime