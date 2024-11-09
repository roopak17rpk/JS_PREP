/**
 * Application State Manager
 */
class StateManager {
  constructor() {
    this.currentAudio = null;
    this.isPlayingMusic = true;
    this.currentDifficulty = 'DEDICATED';
  }

  /**
   * Updates application state
   * @param {Object} newState - New state values
   */
  updateState(newState) {
    Object.assign(this, newState);
  }

  /**
   * Gets current state
   * @returns {Object} Current state
   */
  getState() {
    return {
      currentAudio: this.currentAudio,
      isPlayingMusic: this.isPlayingMusic,
      currentDifficulty: this.currentDifficulty
    };
  }
}

module.exports = new StateManager(); 