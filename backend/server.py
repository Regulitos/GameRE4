from fastapi import FastAPI, APIRouter
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from pathlib import Path
import os
import logging
from .database import connect_to_mongo, close_mongo_connection
from .routes.game import router as game_router

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Create the main app
app = FastAPI(title="Puzzle Inventory API", version="1.0.0")

# Create a router with the /api prefix  
api_router = APIRouter(prefix="/api")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Health check endpoint
@api_router.get("/")
async def root():
    return {"message": "Puzzle Inventory API is running", "status": "healthy"}

@api_router.get("/health")
async def health_check():
    return {"status": "healthy", "service": "puzzle-inventory-api"}

# Include game routes
app.include_router(game_router)

# Include the main API router
app.include_router(api_router)

# Startup event
@app.on_event("startup")
async def startup_db_client():
    await connect_to_mongo()
    logging.info("Connected to MongoDB")

# Shutdown event  
@app.on_event("shutdown")
async def shutdown_db_client():
    await close_mongo_connection()
    logging.info("Disconnected from MongoDB")

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)

logger = logging.getLogger(__name__)