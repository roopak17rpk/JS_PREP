/**
 * Constants for point calculations and streak management
 */
const POINT_CONSTANTS = {
  MINIMUM_STREAK_TIME: 120, // 2 hours minimum for streak multiplier
  BASE_STREAK_MULTIPLIER: 0.20, // 20% bonus per streak day
  STREAK_LOSS_PENALTIES: [0.75, 0.50, 0.25], // Penalties for days 1, 2, and 3 after streak loss
  PROGRESSIVE_BONUS_INTERVAL: 30, // Minutes interval for progressive bonus
  PROGRESSIVE_BONUS_POINTS: 15, // Points per interval
  TYPICAL_SESSION_MIN: 240, // 4 hours typical session
  TYPICAL_SESSION_MAX: 360, // 6 hours max typical session
};

/**
 * Calculates the current streak and manages streak loss penalties
 * @param {Array} entries - Array of watching history entries
 * @returns {Object} - Streak information including penalties
 */
const calculateStreak = (entries) => {
  if (!entries.length) return { 
    currentStreak: 0, 
    lastStreak: 0, 
    isStreakBroken: false,
    daysSinceStreak: 0 
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
  let lastStreak = 0;
  let isStreakBroken = false;
  let daysSinceStreak = 0;

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
      if (currentStreak > 1) {
        lastStreak = currentStreak;
        isStreakBroken = true;
        daysSinceStreak = Math.min(diffDays - 1, POINT_CONSTANTS.STREAK_LOSS_PENALTIES.length);
      }
      break;
    }
  }

  return { currentStreak, lastStreak, isStreakBroken, daysSinceStreak };
};

/**
 * Calculates points with graduated streak penalties
 * @param {number} timeInMinutes - Time spent watching in minutes
 * @param {Object} streakInfo - Information about current and previous streaks
 * @returns {Object} - Calculated points and bonus breakdown
 */
const calculatePoints = (timeInMinutes, streakInfo) => {
  const {
    MINIMUM_STREAK_TIME,
    BASE_STREAK_MULTIPLIER,
    STREAK_LOSS_PENALTIES,
    PROGRESSIVE_BONUS_INTERVAL,
    PROGRESSIVE_BONUS_POINTS
  } = POINT_CONSTANTS;

  // Initialize points breakdown
  let pointsBreakdown = {
    basePoints: timeInMinutes,
    progressiveBonus: 0,
    streakBonus: 0,
    penaltyDeduction: 0,
    totalPoints: 0,
    multiplierUsed: 0
  };

  // Calculate progressive bonus for longer sessions
  for (let i = 1; i <= Math.floor(timeInMinutes / PROGRESSIVE_BONUS_INTERVAL); i++) {
    pointsBreakdown.progressiveBonus += PROGRESSIVE_BONUS_POINTS * i;
  }

  // Calculate streak bonus only if minimum time threshold is met
  if (timeInMinutes >= MINIMUM_STREAK_TIME) {
    const { currentStreak, lastStreak, isStreakBroken, daysSinceStreak } = streakInfo;
    
    if (currentStreak > 1) {
      // Active streak bonus
      pointsBreakdown.multiplierUsed = currentStreak * BASE_STREAK_MULTIPLIER;
      pointsBreakdown.streakBonus = Math.floor(
        (pointsBreakdown.basePoints + pointsBreakdown.progressiveBonus) * 
        pointsBreakdown.multiplierUsed
      );
    } else if (isStreakBroken && lastStreak > 1) {
      // Apply graduated penalty based on days since streak loss
      const penaltyMultiplier = STREAK_LOSS_PENALTIES[daysSinceStreak - 1] || 0;
      pointsBreakdown.multiplierUsed = lastStreak * BASE_STREAK_MULTIPLIER * penaltyMultiplier;
      pointsBreakdown.streakBonus = Math.floor(
        (pointsBreakdown.basePoints + pointsBreakdown.progressiveBonus) * 
        pointsBreakdown.multiplierUsed
      );
    }
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