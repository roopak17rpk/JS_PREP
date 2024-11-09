/**
 * Constants for point calculations and streak management
 */
const POINT_CONSTANTS = {
  MINIMUM_STREAK_TIME: 120, // 2 hours minimum for streak multiplier
  BASE_STREAK_MULTIPLIER: 0.20, // 20% bonus per streak day
  PROGRESSIVE_BONUS_INTERVAL: 30, // Minutes interval for progressive bonus
  PROGRESSIVE_BONUS_POINTS: 15, // Points per interval
  TYPICAL_SESSION_MIN: 240, // 4 hours typical session
};

/**
 * Calculates the current streak
 * @param {Array} entries - Array of watching history entries
 * @returns {Object} - Streak information
 */
const calculateStreak = (entries) => {
  if (!entries.length) return { 
    currentStreak: 0
  };

  // Sort entries by date in descending order (newest first)
  const sortedEntries = [...entries].sort((a, b) => {
    const [dayA, monthA, yearA] = a.date.split('/').map(Number);
    const [dayB, monthB, yearB] = b.date.split('/').map(Number);
    const dateA = new Date(yearA, monthA - 1, dayA);
    const dateB = new Date(yearB, monthB - 1, dayB);
    return dateB - dateA;
  });

  let currentStreak = 1;

  // Check if the latest entry meets minimum time requirement
  if (sortedEntries[0].timeInvested < POINT_CONSTANTS.MINIMUM_STREAK_TIME) {
    return { currentStreak: 0 };
  }

  for (let i = 1; i < sortedEntries.length; i++) {
    const [prevDay, prevMonth, prevYear] = sortedEntries[i-1].date.split('/').map(Number);
    const [currDay, currMonth, currYear] = sortedEntries[i].date.split('/').map(Number);
    
    const prevDate = new Date(prevYear, prevMonth - 1, prevDay);
    const currDate = new Date(currYear, currMonth - 1, currDay);
    
    const diffTime = prevDate - currDate;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    // Check both consecutive days and minimum time requirement
    if (diffDays === 1 && sortedEntries[i].timeInvested >= POINT_CONSTANTS.MINIMUM_STREAK_TIME) {
      currentStreak++;
    } else {
      break;
    }
  }

  return { currentStreak };
};

/**
 * Calculates points
 * @param {number} timeInMinutes - Time spent watching in minutes
 * @param {Object} streakInfo - Information about current streak
 * @returns {Object} - Calculated points and bonus breakdown
 */
const calculatePoints = (timeInMinutes, streakInfo) => {
  const {
    MINIMUM_STREAK_TIME,
    BASE_STREAK_MULTIPLIER,
    PROGRESSIVE_BONUS_INTERVAL,
    PROGRESSIVE_BONUS_POINTS
  } = POINT_CONSTANTS;

  // Initialize points breakdown
  let pointsBreakdown = {
    basePoints: timeInMinutes,
    progressiveBonus: 0,
    streakBonus: 0,
    totalPoints: 0,
    multiplierUsed: 0
  };

  // Calculate progressive bonus for longer sessions
  for (let i = 1; i <= Math.floor(timeInMinutes / PROGRESSIVE_BONUS_INTERVAL); i++) {
    pointsBreakdown.progressiveBonus += PROGRESSIVE_BONUS_POINTS * i;
  }

  // Calculate streak bonus only if minimum time threshold is met
  if (timeInMinutes >= MINIMUM_STREAK_TIME && streakInfo.currentStreak > 1) {
    pointsBreakdown.multiplierUsed = streakInfo.currentStreak * BASE_STREAK_MULTIPLIER;
    pointsBreakdown.streakBonus = Math.floor(
      (pointsBreakdown.basePoints + pointsBreakdown.progressiveBonus) * 
      pointsBreakdown.multiplierUsed
    );
  }

  // Calculate total points
  pointsBreakdown.totalPoints = 
    pointsBreakdown.basePoints + 
    pointsBreakdown.progressiveBonus + 
    pointsBreakdown.streakBonus;

  return pointsBreakdown;
};

module.exports = {
  calculateStreak,
  calculatePoints,
  POINT_CONSTANTS
}; 