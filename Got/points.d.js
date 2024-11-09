/**
 * Game of Thrones Points System Documentation
 * 
 * Base Rules:
 * 1. Minimum 2 hours (120 minutes) required for streak
 * 2. Streak breaks if:
 *    - Miss a day
 *    - Watch less than 2 hours
 * 3. All streak benefits lost when streak breaks
 * 
 * Point Components:
 * 1. Base Points: 1 point per minute
 * 2. Progressive Bonus: Every 30 minutes adds (15 * interval_number) points
 * 3. Streak Bonus: 20% bonus per streak day (requires minimum 2 hours)
 */

/**
 * Example 1: Short Session (90 minutes)
 * @example
 * const shortSession = {
 *   timeInMinutes: 90,
 *   basePoints: 90,
 *   progressiveBonus: {
 *     "30min": 15,
 *     "60min": 30,
 *     "90min": 45,
 *     total: 90
 *   },
 *   streakBonus: 0, // below 2-hour minimum
 *   totalPoints: 180
 * };
 */

/**
 * Example 2: Minimum Streak Session (120 minutes)
 * @example
 * const minStreakSession = {
 *   timeInMinutes: 120,
 *   basePoints: 120,
 *   progressiveBonus: {
 *     "30min": 15,
 *     "60min": 30,
 *     "90min": 45,
 *     "120min": 60,
 *     total: 150
 *   },
 *   streakBonus: 0, // first day
 *   totalPoints: 270
 * };
 */

/**
 * Example 3: Long Session (240 minutes / 4 hours)
 * @example
 * const longSession = {
 *   timeInMinutes: 240,
 *   basePoints: 240,
 *   progressiveBonus: {
 *     "30min": 15,
 *     "60min": 30,
 *     "90min": 45,
 *     "120min": 60,
 *     "150min": 75,
 *     "180min": 90,
 *     "210min": 105,
 *     "240min": 120,
 *     total: 540
 *   },
 *   streakBonus: 0, // first day
 *   totalPoints: 780
 * };
 */

/**
 * Example 4: Perfect Streak (3 days, 4 hours each)
 * @example
 * const perfectStreak = {
 *   day1: {
 *     timeInMinutes: 240,
 *     basePoints: 240,
 *     progressiveBonus: 540,
 *     streakBonus: 0, // first day
 *     totalPoints: 780
 *   },
 *   day2: {
 *     timeInMinutes: 240,
 *     basePoints: 240,
 *     progressiveBonus: 540,
 *     streakBonus: 156, // 20% of (240 + 540) = 156
 *     totalPoints: 936
 *   },
 *   day3: {
 *     timeInMinutes: 240,
 *     basePoints: 240,
 *     progressiveBonus: 540,
 *     streakBonus: 312, // 40% of (240 + 540) = 312
 *     totalPoints: 1092
 *   }
 * };
 */

/**
 * Example 5: Broken Streak
 * @example
 * const brokenStreak = {
 *   day1: {
 *     timeInMinutes: 240,
 *     basePoints: 240,
 *     progressiveBonus: 540,
 *     streakBonus: 0,
 *     totalPoints: 780
 *   },
 *   day2: {
 *     timeInMinutes: 90, // Below 2 hours - Streak Broken
 *     basePoints: 90,
 *     progressiveBonus: 90,
 *     streakBonus: 0, // Lost streak bonus
 *     totalPoints: 180
 *   },
 *   day3: {
 *     timeInMinutes: 240,
 *     basePoints: 240,
 *     progressiveBonus: 540,
 *     streakBonus: 0, // New streak starts
 *     totalPoints: 780
 *   }
 * };
 */

/**
 * Weekly Progress Example (Consistent 2-hour Daily Sessions)
 * @example
 * const weeklyProgress = {
 *   day1: { points: 270 },                    // Base session
 *   day2: { points: 324 },                    // 20% streak bonus
 *   day3: { points: 378 },                    // 40% streak bonus
 *   day4: { points: 432 },                    // 60% streak bonus
 *   day5: { points: 486 },                    // 80% streak bonus
 *   day6: { points: 540 },                    // 100% streak bonus
 *   day7: { points: 594 },                    // 120% streak bonus
 *   weeklyTotal: 3024
 * };
 */

/**
 * Tips for Maximum Points:
 * 1. Consistency is Key
 *    - Maintain at least 2 hours daily
 *    - Longer sessions give better progressive bonuses
 *    - Don't break streaks
 * 
 * 2. Optimal Session Length
 *    - 4 hours gives excellent progressive bonus
 *    - Each additional 30 minutes adds significant points
 *    - Balance between time investment and points
 * 
 * 3. Streak Management
 *    - Always watch minimum 2 hours to maintain streak
 *    - Longer streaks give massive point bonuses
 *    - Plan ahead for days you might miss
 * 
 * 4. Point Maximization
 *    - Start with longer sessions to build base points
 *    - Use streak multiplier to maximize returns
 *    - Regular 4-hour sessions with streak can earn 1000+ points daily
 */ 