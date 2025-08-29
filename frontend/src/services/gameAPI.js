import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api/game`;

class GameAPI {
  constructor() {
    this.playerId = this.getOrCreatePlayerId();
    this.sessionId = null;
    this.startTime = null;
    this.movesCount = 0;
  }

  getOrCreatePlayerId() {
    let playerId = localStorage.getItem('puzzle_player_id');
    if (!playerId) {
      // Se creará cuando se haga la primera llamada al backend
      return null;
    }
    return playerId;
  }

  async createPlayer(playerName = 'Survivor') {
    try {
      const response = await axios.post(`${API}/player`, {
        player_name: playerName
      });

      const { id } = response.data;
      this.playerId = id;
      localStorage.setItem('puzzle_player_id', id);
      
      return response.data;
    } catch (error) {
      console.error('Error creating player:', error);
      throw error;
    }
  }

  async getPlayerProgress() {
    if (!this.playerId) {
      await this.createPlayer();
    }

    try {
      const response = await axios.get(`${API}/player/${this.playerId}/progress`);
      return response.data;
    } catch (error) {
      console.error('Error getting player progress:', error);
      // Si no existe, crear progreso inicial
      if (error.response?.status === 404) {
        await this.createPlayer();
        return await this.getPlayerProgress();
      }
      throw error;
    }
  }

  async updatePlayerProgress(progressData) {
    if (!this.playerId) {
      await this.createPlayer();
    }

    try {
      const response = await axios.put(`${API}/player/${this.playerId}/progress`, progressData);
      return response.data;
    } catch (error) {
      console.error('Error updating player progress:', error);
      throw error;
    }
  }

  async startGameSession(levelId) {
    if (!this.playerId) {
      await this.createPlayer();
    }

    try {
      const response = await axios.post(`${API}/session/start?player_id=${this.playerId}&level_id=${levelId}`);
      this.sessionId = response.data.session_id;
      this.startTime = Date.now();
      this.movesCount = 0;
      
      return this.sessionId;
    } catch (error) {
      console.error('Error starting game session:', error);
      throw error;
    }
  }

  incrementMoves() {
    this.movesCount++;
  }

  async completeGameSession(finalGridState) {
    if (!this.sessionId) {
      console.warn('No active session to complete');
      return null;
    }

    try {
      const response = await axios.put(`${API}/session/${this.sessionId}/complete`, {
        moves_count: this.movesCount,
        final_grid_state: finalGridState
      });

      // Reset session data
      this.sessionId = null;
      this.startTime = null;
      this.movesCount = 0;

      return response.data;
    } catch (error) {
      console.error('Error completing game session:', error);
      throw error;
    }
  }

  async getLevelLeaderboard(levelId, limit = 10) {
    try {
      const response = await axios.get(`${API}/leaderboard/${levelId}?limit=${limit}`);
      return response.data;
    } catch (error) {
      console.error('Error getting leaderboard:', error);
      throw error;
    }
  }

  async getGlobalStats() {
    try {
      const response = await axios.get(`${API}/stats/global`);
      return response.data;
    } catch (error) {
      console.error('Error getting global stats:', error);
      throw error;
    }
  }

  // Sincronizar progreso local con el servidor
  async syncProgress(localProgress) {
    try {
      const serverProgress = await this.getPlayerProgress();
      
      // Fusionar progreso local y del servidor (tomar el más avanzado)
      const syncedProgress = {
        ...serverProgress,
        current_level: Math.max(localProgress.currentLevel || 1, serverProgress.current_level),
        completed_levels: [...new Set([
          ...(localProgress.completedLevels || []),
          ...serverProgress.completed_levels
        ])],
        stars_earned: Math.max(localProgress.stars || 0, serverProgress.stars_earned)
      };

      await this.updatePlayerProgress(syncedProgress);
      return syncedProgress;
    } catch (error) {
      console.error('Error syncing progress:', error);
      return localProgress;
    }
  }

  // Funciones de utilidad
  getCurrentSessionTime() {
    if (!this.startTime) return 0;
    return Math.floor((Date.now() - this.startTime) / 1000);
  }

  getCurrentMoves() {
    return this.movesCount;
  }

  isSessionActive() {
    return !!this.sessionId;
  }
}

// Instancia singleton
const gameAPI = new GameAPI();

export default gameAPI;