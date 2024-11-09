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
    const streakInfo = calculateStreak(entries);
    const totalTimeInvested = entries.reduce(
      (sum, entry) => sum + (entry.timeInvested || 0),
      0
    );

    const totalPoints = entries.reduce((sum, entry) => {
      if (entry.points && typeof entry.points === 'object' && 'totalPoints' in entry.points) {
        return sum + entry.points.totalPoints;
      }
      if (typeof entry.points === 'number') {
        return sum + entry.points;
      }
      return sum;
    }, 0);

    const titleDetails = this.getTitleDetails(totalPoints);

    return {
      streak: streakInfo.currentStreak,
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
      
      // Check if an entry for today already exists
      const formattedDate = this.formatDate(data.date);
      const todayEntryIndex = existingData.findIndex(entry => 
        this.formatDate(entry.date) === formattedDate
      );

      // If entry exists for today, add time and recalculate points
      if (todayEntryIndex !== -1) {
        const existingEntry = existingData[todayEntryIndex];
        const newTimeInvested = existingEntry.timeInvested + Number(data.timeInvested);
        
        // Calculate new streak and points with updated time
        const streakInfo = calculateStreak([
          ...existingData.slice(0, todayEntryIndex),
          ...existingData.slice(todayEntryIndex + 1),
          { date: formattedDate, timeInvested: newTimeInvested }
        ]);
        
        const pointsBreakdown = calculatePoints(newTimeInvested, streakInfo);

        // Update only necessary fields
        existingData[todayEntryIndex] = {
          ...existingEntry, // Preserve existing data
          timeInvested: newTimeInvested,
          streak: streakInfo.currentStreak,
          points: pointsBreakdown.totalPoints
        };

        console.log(`\nUpdated time for ${formattedDate}`);
        console.log(`Previous time: ${existingEntry.timeInvested} minutes`);
        console.log(`Added time: ${data.timeInvested} minutes`);
        console.log(`New total time: ${newTimeInvested} minutes`);
      } else {
        // No existing entry for today, add new entry
        const formattedData = {
          ...data,
          date: formattedDate,
          points: data.points.totalPoints || data.points,
          streak: data.streak.currentStreak || data.streak
        };
        existingData.push(formattedData);
      }

      // Sort entries by date
      existingData.sort((a, b) => {
        const [dayA, monthA, yearA] = this.formatDate(a.date).split('/').map(Number);
        const [dayB, monthB, yearB] = this.formatDate(b.date).split('/').map(Number);
        return new Date(yearA, monthA - 1, dayA) - new Date(yearB, monthB - 1, dayB);
      });

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
        previousTitle: milestoneAchieved ? previousTotal.title : null,
        isUpdatedEntry: todayEntryIndex !== -1,
        timeAdded: todayEntryIndex !== -1 ? data.timeInvested : 0
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
        const entryDate = entry.date.split('/').map(num => String(num).padStart(2, '0')).join('/');
        return entryDate === formattedDate;
      });
      
      if (index === -1) {
        console.log(`No entry found for ${formattedDate}`);
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

      // Remove the existing entry
      existingData.splice(index, 1);

      // Calculate streak and points with the updated time
      const streakInfo = calculateStreak([
        ...existingData,
        { date: formattedDate, timeInvested: finalTime }
      ]);

      const pointsBreakdown = calculatePoints(finalTime, streakInfo);

      // Create the updated entry with only necessary fields
      const updatedEntry = {
        date: formattedDate,
        streak: streakInfo.currentStreak,
        points: pointsBreakdown.totalPoints,
        timeInvested: finalTime
      };

      // Add the updated entry back
      existingData.push(updatedEntry);

      // Sort entries again after adding the updated entry
      existingData.sort((a, b) => {
        const [dayA, monthA, yearA] = this.formatDate(a.date).split('/').map(Number);
        const [dayB, monthB, yearB] = this.formatDate(b.date).split('/').map(Number);
        return new Date(yearA, monthA - 1, dayA) - new Date(yearB, monthB - 1, dayB);
      });

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
      // If file doesn't exist, create with initial data
      if (!fs.existsSync(this.filePath)) {
        const initialData = {
          entries: [],
          total: { streak: 0, totalTimeInvested: 0, totalPoints: 0, title: "Newcomer" },
          lastRecalculated: new Date().toISOString()
        };
        fs.writeFileSync(this.filePath, JSON.stringify(initialData, null, 2));
        return [];
      }

      // Read file content
      const rawData = fs.readFileSync(this.filePath, "utf8");

      // Handle empty or invalid file
      if (!rawData || rawData.trim() === '') {
        const initialData = {
          entries: [],
          total: { streak: 0, totalTimeInvested: 0, totalPoints: 0, title: "Newcomer" },
          lastRecalculated: new Date().toISOString()
        };
        fs.writeFileSync(this.filePath, JSON.stringify(initialData, null, 2));
        return [];
      }

      // Parse data
      const parsedData = JSON.parse(rawData);
      
      // Validate data structure
      if (!parsedData || !parsedData.entries) {
        const initialData = {
          entries: [],
          total: { streak: 0, totalTimeInvested: 0, totalPoints: 0, title: "Newcomer" },
          lastRecalculated: new Date().toISOString()
        };
        fs.writeFileSync(this.filePath, JSON.stringify(initialData, null, 2));
        return [];
      }

      return Array.isArray(parsedData.entries) ? parsedData.entries : [];
    } catch (error) {
      console.log("Error reading data:", error);
      // On any error, reset the file with initial data
      const initialData = {
        entries: [],
        total: { streak: 0, totalTimeInvested: 0, totalPoints: 0, title: "Newcomer" },
        lastRecalculated: new Date().toISOString()
      };
      try {
        fs.writeFileSync(this.filePath, JSON.stringify(initialData, null, 2));
      } catch (writeError) {
        console.log("Error writing initial data:", writeError);
      }
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

      // First combine entries with same date
      const uniqueEntries = existingData.reduce((acc, current) => {
        const formattedDate = this.formatDate(current.date);
        const existingEntry = acc.find(entry => this.formatDate(entry.date) === formattedDate);
        
        if (existingEntry) {
          // Combine time and log the merge
          console.log(`\nCombining entries for date: ${formattedDate}`);
          console.log(`Entry 1: ${existingEntry.timeInvested} minutes`);
          console.log(`Entry 2: ${current.timeInvested} minutes`);
          
          existingEntry.timeInvested += current.timeInvested;
          console.log(`Combined time: ${existingEntry.timeInvested} minutes`);
        } else {
          acc.push(current);
        }
        return acc;
      }, []);

      // Sort entries by date
      uniqueEntries.sort((a, b) => {
        const [dayA, monthA, yearA] = this.formatDate(a.date).split('/').map(Number);
        const [dayB, monthB, yearB] = this.formatDate(b.date).split('/').map(Number);
        return new Date(yearA, monthA - 1, dayA) - new Date(yearB, monthB - 1, dayB);
      });

      let entriesFixed = 0;
      
      // Recalculate points and streaks for each entry
      const recalculatedData = uniqueEntries.map((entry, index) => {
        const entriesUpToNow = uniqueEntries.slice(0, index + 1);
        const streakInfo = calculateStreak(entriesUpToNow);
        
        // Check if timeInvested exists and is a number
        const timeInvested = typeof entry.timeInvested === 'number' ? 
          entry.timeInvested : 
          (Number(entry.timeInvested) || 0);

        const pointsBreakdown = calculatePoints(timeInvested, streakInfo);

        // Check if any data was missing or different
        if (
          entry.streak !== streakInfo.currentStreak || 
          entry.points !== pointsBreakdown.totalPoints || 
          entry.timeInvested !== timeInvested ||
          !entry.hasOwnProperty('streak') ||
          !entry.hasOwnProperty('points')
        ) {
          entriesFixed++;
          console.log(`\nFixed entry for date: ${entry.date}`);
          console.log(`Old: Streak=${entry.streak}, Points=${entry.points}, Time=${entry.timeInvested}`);
          console.log(`New: Streak=${streakInfo.currentStreak}, Points=${pointsBreakdown.totalPoints}, Time=${timeInvested}`);
        }

        return {
          date: this.formatDate(entry.date), // Ensure consistent date format
          streak: streakInfo.currentStreak,
          points: pointsBreakdown.totalPoints,
          timeInvested: timeInvested
        };
      });

      const total = this.calculateTotal(recalculatedData);
      
      fs.writeFileSync(
        this.filePath,
        JSON.stringify({ 
          entries: recalculatedData,
          total,
          lastRecalculated: new Date().toISOString(),
          entriesFixed,
          duplicatesCombined: existingData.length - uniqueEntries.length
        }, null, 2)
      );

      if (existingData.length !== uniqueEntries.length) {
        console.log(`\nCombined ${existingData.length - uniqueEntries.length} duplicate entries`);
      }
      console.log(`Fixed ${entriesFixed} entries during recalculation`);
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

  /**
   * Deletes an entry for a specific date
   * @param {string} date - Date of entry to delete
   * @returns {boolean} - Success status
   */
  deleteGameData(date) {
    try {
      if (!this.isValidDateFormat(date)) {
        console.log("\nInvalid date format. Please use DD/MM/YYYY (e.g., 09/11/2024)");
        return false;
      }

      let existingData = this.readGameData() || [];
      const formattedDate = this.formatDate(date);
      
      const index = existingData.findIndex(entry => 
        this.formatDate(entry.date) === formattedDate
      );
      
      if (index === -1) {
        console.log(`No entry found for ${formattedDate}`);
        return false;
      }

      // Remove the entry
      existingData.splice(index, 1);

      // Recalculate totals
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
      console.log("error deleting data:", error);
      return false;
    }
  }
}

module.exports = GameLogger; 