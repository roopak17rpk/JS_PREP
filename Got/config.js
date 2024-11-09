const fs = require('fs');
const path = require('path');

/**
 * Configuration Manager for Game Settings
 */
class ConfigManager {
  constructor() {
    this.configPath = path.join(__dirname, 'config.json');
    this.defaultConfig = {
      difficulty: 'DEDICATED',
      musicEnabled: true,
      lastPlayed: null
    };
  }

  /**
   * Loads configuration from file
   * @returns {Object} Configuration object
   */
  loadConfig() {
    try {
      if (!fs.existsSync(this.configPath)) {
        this.saveConfig(this.defaultConfig);
        return this.defaultConfig;
      }
      return JSON.parse(fs.readFileSync(this.configPath, 'utf8'));
    } catch (error) {
      console.log("Error loading config:", error);
      return this.defaultConfig;
    }
  }

  /**
   * Saves configuration to file
   * @param {Object} config - Configuration to save
   */
  saveConfig(config) {
    try {
      fs.writeFileSync(this.configPath, JSON.stringify(config, null, 2));
    } catch (error) {
      console.log("Error saving config:", error);
    }
  }

  /**
   * Updates specific configuration value
   * @param {string} key - Configuration key
   * @param {any} value - New value
   */
  updateConfig(key, value) {
    const config = this.loadConfig();
    config[key] = value;
    this.saveConfig(config);
  }
}

module.exports = new ConfigManager(); 