const { POINT_CONSTANTS } = require('./utils');

// Calculate base points for typical sessions (using only minimum)
const TYPICAL_SESSION_POINTS = {
  MIN: POINT_CONSTANTS.TYPICAL_SESSION_MIN + 
       Math.floor(POINT_CONSTANTS.TYPICAL_SESSION_MIN / 30) * 15
};

// Difficulty multipliers
const DIFFICULTY_SETTINGS = {
  CASUAL: {
    name: "Casual (3 months journey)",
    multiplier: 0.5,
    description: "For those who watch occasionally - Complete journey in 3 months"
  },
  DEDICATED: {
    name: "Dedicated (6 months journey)",
    multiplier: 1,
    description: "For regular watchers - Complete journey in 6 months"
  },
  HARDCORE: {
    name: "Hardcore (12 months journey)",
    multiplier: 2,
    description: "For the most dedicated fans - Complete journey in 12 months"
  }
};

// Base milestones (for Dedicated difficulty - 6 months)
const BASE_MILESTONES = [
  // Month 1 (Assuming average 2-3 hours daily)
  { points: TYPICAL_SESSION_POINTS.MIN * 3, title: "Street Rat of Flea Bottom" },
  { points: TYPICAL_SESSION_POINTS.MIN * 7, title: "Merchant of the Free Cities" },
  { points: TYPICAL_SESSION_POINTS.MIN * 15, title: "Captain of the City Watch" },
  
  // Month 2
  { points: TYPICAL_SESSION_POINTS.MIN * 25, title: "Night's Watch Recruit" },
  { points: TYPICAL_SESSION_POINTS.MIN * 35, title: "Ranger Beyond the Wall" },
  { points: TYPICAL_SESSION_POINTS.MIN * 45, title: "First Ranger" },
  
  // Month 3
  { points: TYPICAL_SESSION_POINTS.MIN * 60, title: "Lord Commander" },
  { points: TYPICAL_SESSION_POINTS.MIN * 75, title: "Knight of the Seven Kingdoms" },
  { points: TYPICAL_SESSION_POINTS.MIN * 90, title: "Lord of a Great House" },
  
  // Month 4
  { points: TYPICAL_SESSION_POINTS.MIN * 105, title: "Master of Whispers" },
  { points: TYPICAL_SESSION_POINTS.MIN * 120, title: "Master of Ships" },
  { points: TYPICAL_SESSION_POINTS.MIN * 135, title: "Master of Laws" },
  
  // Month 5
  { points: TYPICAL_SESSION_POINTS.MIN * 150, title: "Master of Coin" },
  { points: TYPICAL_SESSION_POINTS.MIN * 165, title: "Hand of the King" },
  { points: TYPICAL_SESSION_POINTS.MIN * 180, title: "Warg of the North" },
  
  // Month 6 (Final Stretch)
  { points: TYPICAL_SESSION_POINTS.MIN * 200, title: "Blood of the Dragon" },
  { points: TYPICAL_SESSION_POINTS.MIN * 220, title: "Dragon Rider" },
  { points: TYPICAL_SESSION_POINTS.MIN * 240, title: "Protector of the Realm" },
  { points: TYPICAL_SESSION_POINTS.MIN * 260, title: "King/Queen of the Seven Kingdoms" },
  { points: TYPICAL_SESSION_POINTS.MIN * 280, title: "Azor Ahai Reborn" },
  { points: TYPICAL_SESSION_POINTS.MIN * 300, title: "The Prince/Princess That Was Promised" }
];

/**
 * Gets milestones based on difficulty setting
 * @param {string} difficulty - Difficulty level
 * @returns {Array} - Array of milestones with adjusted points
 */
const getMilestonesForDifficulty = (difficulty) => {
  return BASE_MILESTONES.map(milestone => ({
    ...milestone,
    points: Math.floor(milestone.points * DIFFICULTY_SETTINGS[difficulty].multiplier)
  }));
};

// Achievement categories for different point ranges
const ACHIEVEMENT_TIERS = {
  COMMON: 'common',      // 0 - 30,000
  UNCOMMON: 'uncommon',  // 30,000 - 200,000
  RARE: 'rare',         // 200,000 - 1,000,000
  EPIC: 'epic',         // 1,000,000 - 5,000,000
  LEGENDARY: 'legendary' // 5,000,000+
};

// Regions for different title ranges
const TITLE_REGIONS = {
  'Street Rat of Flea Bottom': "King's Landing",
  'Merchant of the Free Cities': 'Free Cities',
  'Captain of the City Watch': "King's Landing",
  "Night's Watch Recruit": 'The Wall',
  'Ranger Beyond the Wall': 'Beyond the Wall',
  'First Ranger': 'The Wall',
  'Lord Commander': 'The Wall',
  'Knight of the Seven Kingdoms': 'The Seven Kingdoms',
  'Lord of a Great House': 'The Seven Kingdoms',
  'Warden of the Realm': 'The Seven Kingdoms',
  'Master of Whispers': 'Red Keep',
  'Master of Ships': 'Red Keep',
  'Master of Laws': 'Red Keep',
  'Master of Coin': 'Red Keep',
  'Hand of the King': 'Red Keep',
  'Warg of the North': 'The North',
  'Blood of the Dragon': 'Valyria',
  'Dragon Rider': 'The Skies of Westeros',
  'Protector of the Realm': 'The Seven Kingdoms',
  'King/Queen of the Seven Kingdoms': 'Iron Throne',
  'Azor Ahai Reborn': 'The Known World',
  'The Prince/Princess That Was Promised': 'The Realm of Light'
};

module.exports = {
  MILESTONES: BASE_MILESTONES,
  DIFFICULTY_SETTINGS,
  getMilestonesForDifficulty,
  TITLE_REGIONS,
  ACHIEVEMENT_TIERS
}; 