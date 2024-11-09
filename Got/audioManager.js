const player = require('play-sound')({});
const fs = require('fs');
const path = require('path');
const state = require('./state');
const config = require('./config');

/**
 * Audio Manager for handling music playback
 */
class AudioManager {
  constructor() {
    this.audioPath = path.join(__dirname, 'Official Opening Credits_ Game of Thrones (HBO).mp3');
  }

  /**
   * Plays background music in loop
   */
  playBackgroundMusic() {
    if (!state.isPlayingMusic) return;
    
    if (!fs.existsSync(this.audioPath)) {
      console.log("Warning: Theme music file not found at:", this.audioPath);
      return;
    }

    state.currentAudio = player.play(this.audioPath, (err) => {
      if (err && !err.killed) {
        console.log("Error playing audio:", err);
      }
      if (state.isPlayingMusic) {
        this.playBackgroundMusic();
      }
    });
  }

  /**
   * Toggles music playback
   */
  toggleMusic() {
    state.isPlayingMusic = !state.isPlayingMusic;
    config.updateConfig('musicEnabled', state.isPlayingMusic);

    if (!state.isPlayingMusic && state.currentAudio) {
      state.currentAudio.kill();
      state.currentAudio = null;
    } else if (state.isPlayingMusic) {
      this.playBackgroundMusic();
    }
  }

  /**
   * Stops music playback
   */
  stopMusic() {
    if (state.currentAudio) {
      state.currentAudio.kill();
      state.currentAudio = null;
    }
  }
}

module.exports = new AudioManager(); 