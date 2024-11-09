const fs = require('fs');
const { MILESTONES } = require('./constants');
const { calculateStreak, calculatePoints } = require('./utils');

/**
 * GameLogger class handles all data operations for the Game of Thrones tracker
 */
class GameLogger {
  /**
   * @param {string} filePath - Path to the JSON file storing the data
   */
  constructor(filePath) {
    this.filePath = filePath;
  }

  /**
   * Determines user's title based on total points
   * @param {number} totalPoints - Total points accumulated
   * @returns {string} - Current title
   */
  getTitle(totalPoints) {
    for (let i = MILESTONES.length - 1; i >= 0; i--) {
      if (totalPoints >= MILESTONES[i].points) {
        return MILESTONES[i].title;
      }
    }
    return "Newcomer";
  }

  /**
   * Calculates total statistics from all entries
   * @param {Array} entries - Array of watching history entries
   * @returns {Object} - Total statistics including streak, points, and title
   */
  calculateTotal(entries) {
    const streak = calculateStreak(entries);
    const totalTimeInvested = entries.reduce(
      (sum, entry) => sum + (entry.timeInvested || 0),
      0
    );

    const totalPoints = entries.reduce(
      (sum, entry) => sum + (entry.points || 0),
      0
    );

    return {
      streak,
      totalTimeInvested,
      totalPoints,
      title: this.getTitle(totalPoints)
    };
  }

  /**
   * Writes new entry to the game data file
   * @param {Object} data - New entry data
   */
  writeGameData(data) {
    try {
      let existingData = [];
      if (fs.existsSync(this.filePath)) {
        existingData = this.readGameData() || [];
      }
      existingData.push(data);
      const total = this.calculateTotal(existingData);
      
      fs.writeFileSync(
        this.filePath,
        JSON.stringify({ 
          entries: existingData, 
          total,
          lastRecalculated: new Date().toISOString()
        }, null, 2)
      );
    } catch (error) {
      console.log("error writing data:", error);
    }
  }

  /**
   * Modifies existing entry in the game data file
   * @param {string} date - Date of entry to modify
   * @param {number} newTimeInMinutes - New time value
   * @returns {boolean} - Success status
   */
  modifyGameData(date, newTimeInMinutes) {
    try {
      let existingData = this.readGameData() || [];
      
      // Validate date format (DD/MM/YYYY)
      if (!/^\d{2}\/\d{2}\/\d{4}$/.test(date)) {
        console.log("Invalid date format. Please use DD/MM/YYYY");
        return false;
      }

      const index = existingData.findIndex(entry => entry.date === date);
      
      if (index === -1) {
        console.log("No entry found for the specified date");
        return false;
      }

      // Sort entries chronologically for streak calculation
      existingData.sort((a, b) => {
        const [dayA, monthA, yearA] = a.date.split('/').map(Number);
        const [dayB, monthB, yearB] = b.date.split('/').map(Number);
        return new Date(yearA, monthA - 1, dayA) - new Date(yearB, monthB - 1, dayB);
      });

      const streak = calculateStreak(existingData);
      const points = calculatePoints(Number(newTimeInMinutes), streak);

      existingData[index] = {
        date,
        streak,
        points,
        timeInvested: Number(newTimeInMinutes)
      };

      const total = this.calculateTotal(existingData);
      fs.writeFileSync(
        this.filePath,
        JSON.stringify({ 
          entries: existingData, 
          total,
          lastRecalculated: new Date().toISOString()
        }, null, 2)
      );
      return true;
    } catch (error) {
      console.log("error modifying data:", error);
      return false;
    }
  }

  /**
   * Reads all entries from the game data file
   * @returns {Array} - Array of all entries
   */
  readGameData() {
    try {
      if (!fs.existsSync(this.filePath)) {
        const initialData = {
          entries: [],
          total: { streak: 0, totalTimeInvested: 0, totalPoints: 0, title: "Newcomer" },
          lastRecalculated: new Date().toISOString()
        };
        fs.writeFileSync(this.filePath, JSON.stringify(initialData, null, 2));
        return [];
      }
      const rawData = fs.readFileSync(this.filePath, "utf8");
      const parsedData = JSON.parse(rawData);
      return Array.isArray(parsedData.entries) ? parsedData.entries : [];
    } catch (error) {
      console.log("error reading data:", error);
      return [];
    }
  }

  /**
   * Recalculates all points and streaks for existing entries
   * @returns {boolean} - Success status
   */
  recalculateAllData() {
    try {
      let existingData = this.readGameData() || [];
      if (!existingData.length) {
        console.log("No data to recalculate");
        return false;
      }

      // Sort entries by date
      existingData.sort((a, b) => new Date(a.date) - new Date(b.date));

      let entriesFixed = 0;
      
      // Recalculate points and streaks for each entry
      const recalculatedData = existingData.map((entry, index) => {
        const entriesUpToNow = existingData.slice(0, index + 1);
        const newStreak = calculateStreak(entriesUpToNow);
        
        // Check if timeInvested exists and is a number
        const timeInvested = typeof entry.timeInvested === 'number' ? 
          entry.timeInvested : 
          (Number(entry.timeInvested) || 0);

        const newPoints = calculatePoints(timeInvested, newStreak);

        // Check if any data was missing or different
        if (
          entry.streak !== newStreak || 
          entry.points !== newPoints || 
          entry.timeInvested !== timeInvested ||
          !entry.hasOwnProperty('streak') ||
          !entry.hasOwnProperty('points')
        ) {
          entriesFixed++;
          console.log(`Fixed entry for date: ${entry.date}`);
          console.log(`Old: Streak=${entry.streak}, Points=${entry.points}, Time=${entry.timeInvested}`);
          console.log(`New: Streak=${newStreak}, Points=${newPoints}, Time=${timeInvested}\n`);
        }

        return {
          date: entry.date,
          streak: newStreak,
          points: newPoints,
          timeInvested: timeInvested
        };
      });

      const total = this.calculateTotal(recalculatedData);
      
      // Write recalculated data back to file
      fs.writeFileSync(
        this.filePath,
        JSON.stringify({ 
          entries: recalculatedData,
          total,
          lastRecalculated: new Date().toISOString(),
          entriesFixed
        }, null, 2)
      );

      console.log(`\nFixed ${entriesFixed} entries during recalculation`);
      return true;
    } catch (error) {
      console.log("error recalculating data:", error);
      return false;
    }
  }
}

module.exports = GameLogger; 