const fs = require('fs');
const { MILESTONES, ACHIEVEMENT_TIERS, TITLE_REGIONS, getMilestonesForDifficulty } = require('./constants');
const { calculateStreak, calculatePoints } = require('./utils');

/**
 * GameLogger class handles all data operations for the Game of Thrones tracker
 */
class GameLogger {
  /**
   * @param {string} filePath - Path to the JSON file storing the data
   * @param {string} difficulty - Difficulty setting
   */
  constructor(filePath, difficulty = 'DEDICATED') {
    this.filePath = filePath;
    this.difficulty = difficulty;
  }

  /**
   * Gets achievement tier based on points
   * @param {number} points - Total points
   * @returns {string} - Achievement tier
   */
  getAchievementTier(points) {
    if (points >= 5000000) return ACHIEVEMENT_TIERS.LEGENDARY;
    if (points >= 1000000) return ACHIEVEMENT_TIERS.EPIC;
    if (points >= 200000) return ACHIEVEMENT_TIERS.RARE;
    if (points >= 30000) return ACHIEVEMENT_TIERS.UNCOMMON;
    return ACHIEVEMENT_TIERS.COMMON;
  }

  /**
   * Gets title details including region and tier
   * @param {number} totalPoints - Total points accumulated
   * @returns {Object} - Title details
   */
  getTitleDetails(totalPoints) {
    const milestones = getMilestonesForDifficulty(this.difficulty);
    for (let i = milestones.length - 1; i >= 0; i--) {
      if (totalPoints >= milestones[i].points) {
        const title = milestones[i].title;
        return {
          title,
          region: TITLE_REGIONS[title] || 'Unknown Lands',
          tier: this.getAchievementTier(totalPoints),
          nextMilestone: milestones[i + 1] || null,
          pointsToNext: milestones[i + 1] ? milestones[i + 1].points - totalPoints : 0
        };
      }
    }
    return {
      title: "Newcomer",
      region: "Westeros",
      tier: ACHIEVEMENT_TIERS.COMMON,
      nextMilestone: milestones[0],
      pointsToNext: milestones[0].points
    };
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

    const titleDetails = this.getTitleDetails(totalPoints);

    return {
      streak,
      totalTimeInvested,
      totalPoints,
      ...titleDetails,
      progressToNext: titleDetails.nextMilestone ? 
        ((totalPoints / titleDetails.nextMilestone.points) * 100).toFixed(2) + '%' : 
        'Maximum Title Achieved!'
    };
  }

  /**
   * Validates and converts date to DD/MM/YYYY format
   * @param {string} date - Date string to validate
   * @returns {boolean} - Whether the date is valid
   */
  isValidDateFormat(date) {
    // Check for DD/MM/YYYY format
    const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
    if (!dateRegex.test(date)) {
      return false;
    }

    // Validate the date is real
    const [day, month, year] = date.split('/').map(Number);
    const dateObj = new Date(year, month - 1, day);
    return dateObj.getDate() === day &&
           dateObj.getMonth() === month - 1 &&
           dateObj.getFullYear() === year;
  }

  /**
   * Converts date from any format to DD/MM/YYYY
   * @param {string} date - Date string to convert
   * @returns {string} - Formatted date string
   */
  formatDate(date) {
    const [day, month, year] = date.split('/').map(Number);
    return `${String(day).padStart(2, '0')}/${String(month).padStart(2, '0')}/${year}`;
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
      
      // Ensure date is in DD/MM/YYYY format
      const formattedData = {
        ...data,
        date: this.formatDate(data.date)
      };
      
      existingData.push(formattedData);
      const total = this.calculateTotal(existingData);
      
      // Check for milestone achievement
      const previousTotal = this.calculateTotal(existingData.slice(0, -1));
      const milestoneAchieved = previousTotal.title !== total.title;
      
      fs.writeFileSync(
        this.filePath,
        JSON.stringify({ 
          entries: existingData, 
          total,
          lastRecalculated: new Date().toISOString(),
          milestoneAchieved,
          previousTitle: milestoneAchieved ? previousTotal.title : null
        }, null, 2)
      );

      return {
        ...total,
        milestoneAchieved,
        previousTitle: milestoneAchieved ? previousTotal.title : null
      };
    } catch (error) {
      console.log("error writing data:", error);
      return null;
    }
  }

  /**
   * Modifies existing entry in the game data file
   * @param {string} date - Date of entry to modify
   * @param {number} newTimeInMinutes - New time value
   * @param {boolean} appendTime - Whether to append time to existing entry
   * @returns {boolean} - Success status
   */
  modifyGameData(date, newTimeInMinutes, appendTime = false) {
    try {
      if (!this.isValidDateFormat(date)) {
        console.log("\nInvalid date format. Please use DD/MM/YYYY (e.g., 09/11/2024)");
        return false;
      }

      let existingData = this.readGameData() || [];
      const formattedDate = this.formatDate(date);
      const index = existingData.findIndex(entry => {
        // Convert existing entry dates to DD/MM/YYYY format for comparison
        const [month, day, year] = entry.date.split('/').map(Number);
        const entryFormatted = `${String(day).padStart(2, '0')}/${String(month).padStart(2, '0')}/${year}`;
        return entryFormatted === formattedDate;
      });
      
      if (index === -1) {
        console.log("No entry found for the specified date");
        return false;
      }

      // Sort entries chronologically for streak calculation
      existingData.sort((a, b) => {
        const [dayA, monthA, yearA] = this.formatDate(a.date).split('/').map(Number);
        const [dayB, monthB, yearB] = this.formatDate(b.date).split('/').map(Number);
        return new Date(yearA, monthA - 1, dayA) - new Date(yearB, monthB - 1, dayB);
      });

      const finalTime = appendTime ? 
        existingData[index].timeInvested + Number(newTimeInMinutes) : 
        Number(newTimeInMinutes);

      const streakInfo = calculateStreak(existingData);
      const pointsBreakdown = calculatePoints(finalTime, streakInfo);

      // Update the entry with the new format
      existingData[index] = {
        date: formattedDate,
        streak: streakInfo.currentStreak,
        points: pointsBreakdown.totalPoints,
        timeInvested: finalTime,
        breakdown: pointsBreakdown // Store point breakdown for reference
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

  /**
   * Gets progress details for current title
   * @returns {Object} Progress information
   */
  getProgressDetails() {
    const data = this.readGameData() || [];
    const total = this.calculateTotal(data);
    const titleDetails = this.getTitleDetails(total.totalPoints);

    return {
      currentTitle: titleDetails.title,
      region: titleDetails.region,
      tier: titleDetails.tier,
      nextTitle: titleDetails.nextMilestone?.title || 'Maximum Title Achieved',
      pointsToNext: titleDetails.pointsToNext,
      progressPercentage: ((total.totalPoints / (titleDetails.nextMilestone?.points || total.totalPoints)) * 100).toFixed(2),
      totalPoints: total.totalPoints,
      streak: total.streak
    };
  }
}

module.exports = GameLogger; 