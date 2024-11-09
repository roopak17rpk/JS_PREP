/**
 * Calculates the current streak of consecutive days
 * @param {Array} entries - Array of watching history entries
 * @returns {number} - Current streak count
 */
const calculateStreak = (entries) => {
  if (!entries.length) return 0;

  // Sort entries by date in descending order (newest first)
  const sortedEntries = [...entries].sort((a, b) => {
    const [dayA, monthA, yearA] = a.date.split('/').map(Number);
    const [dayB, monthB, yearB] = b.date.split('/').map(Number);
    const dateA = new Date(yearA, monthA - 1, dayA);
    const dateB = new Date(yearB, monthB - 1, dayB);
    return dateB - dateA;
  });

  let currentStreak = 1;
  
  for (let i = 1; i < sortedEntries.length; i++) {
    const [prevDay, prevMonth, prevYear] = sortedEntries[i-1].date.split('/').map(Number);
    const [currDay, currMonth, currYear] = sortedEntries[i].date.split('/').map(Number);
    
    const prevDate = new Date(prevYear, prevMonth - 1, prevDay);
    const currDate = new Date(currYear, currMonth - 1, currDay);
    
    const diffTime = prevDate - currDate;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      currentStreak++;
    } else {
      break;
    }
  }
  return currentStreak;
};

/**
 * Calculates points based on time watched and streak
 * @param {number} timeInMinutes - Time spent watching in minutes
 * @param {number} streak - Current streak count
 * @returns {number} - Total points earned
 */
const calculatePoints = (timeInMinutes, streak) => {
  if (!timeInMinutes) return 0;
  
  // Base points calculation (1 minute = 1 point minimum)
  let points = timeInMinutes;

  // Additional points for longer watching sessions
  // Every 30 minutes gives bonus points
  for (let i = 1; i <= Math.floor(timeInMinutes / 30); i++) {
    points += 15 * i; // Progressive bonus
  }

  // Streak multiplier (25% bonus per streak day)
  const streakMultiplier = 1 + (streak * 0.25);
  points = Math.floor(points * streakMultiplier);

  // Streak bonus points
  if (streak > 1) {
    const streakBonus = streak * 100; // 100 bonus points per streak day
    points += streakBonus;
  }

  return points;
};

module.exports = {
  calculateStreak,
  calculatePoints
}; 