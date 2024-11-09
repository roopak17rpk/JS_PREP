const readline = require("readline");
const GameLogger = require("./GameLogger");
const { calculateStreak, calculatePoints } = require("./utils");
const { DIFFICULTY_SETTINGS } = require("./constants");
const state = require('./state');
const config = require('./config');
const audioManager = require('./audioManager');
const fs = require("fs");

// Initialize readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Global error handler
process.on('uncaughtException', (error) => {
  console.log("\nAn error occurred:", error.message);
  audioManager.stopMusic();
  rl.close();
  process.exit(1);
});

process.on('unhandledRejection', (error) => {
  console.log("\nAn error occurred:", error.message);
  audioManager.stopMusic();
  rl.close();
  process.exit(1);
});

// Handle clean exit
process.on('SIGINT', () => {
  console.log("\nFarewell, until we meet again...");
  audioManager.stopMusic();
  rl.close();
  process.exit(0);
});

// Handle readline close
rl.on('close', () => {
  audioManager.stopMusic();
  process.exit(0);
});

// Load saved configuration
const savedConfig = config.loadConfig();
state.updateState({
  currentDifficulty: savedConfig.difficulty,
  isPlayingMusic: savedConfig.musicEnabled
});

const ASCII_ART = {
  dragon: `
    /\\___/\\
   (  o o  )
   (  =^=  ) 
    (--m--)
     /   \\
    |     |
    |     |
     \\___/
    DRACARYS!`,
  
  direwolf: `
     /\\     /\\
    {  \\___/  }
     {  o o  }
     {  /_\\  }
      {____}
    WINTER IS COMING`,
  
  throne: `
      /\\||/\\
     /.....\\
    /.......\\
   /....╔╗...\\
  /.....║║....\\
 /.......║║.....\\
/........║║......\\
==================
  IRON THRONE`,

  wall: `
   |\\             /|
   | \\    Ice    / |
   |  \\  Wall   /  |
   |   \\       /   |
   |    \\     /    |
   |     \\   /     |
   |      \\ /      |
   |==================|
   |    THE WALL     |`,

  sword: `
     />
    //
   //
  //
 //
//
\\\\
 \\\\
  \\\\
   \\>
NEEDLE`
};

/**
 * Gets random ASCII art
 * @returns {string} Random ASCII art
 */
function getRandomArt() {
  const arts = Object.values(ASCII_ART);
  return arts[Math.floor(Math.random() * arts.length)];
}

/**
 * Gets ASCII art based on title
 * @param {string} title - Current title
 * @returns {string} Appropriate ASCII art
 */
function getTitleArt(title) {
  if (title.includes('Dragon')) return ASCII_ART.dragon;
  if (title.includes('Watch') || title.includes('Wall')) return ASCII_ART.wall;
  if (title.includes('King') || title.includes('Queen')) return ASCII_ART.throne;
  if (title.includes('Stark') || title.includes('North')) return ASCII_ART.direwolf;
  return ASCII_ART.sword;
}

function displayMenu() {
  console.clear();
  console.log(`
╔═══════════════════════════════════════════════╗
║             The Chronicles of                  ║
║         The Seven Kingdoms & Beyond           ║
╚═══════════════════════════════════════════════╝
${getRandomArt()}
`);
  console.log(`Current Difficulty: ${DIFFICULTY_SETTINGS[state.currentDifficulty].name}`);
  console.log(`Music: ${state.isPlayingMusic ? 'Playing' : 'Paused'}`);
  console.log("\nChoose your action, my Lord/Lady:");
  console.log("1. Record Your Conquest");
  console.log("2. View Your Saga");
  console.log("3. Rewrite History");
  console.log("4. Summon the Three-Eyed Raven (Recalculate)");
  console.log("5. Change Difficulty");
  console.log("6. Toggle Music");
  console.log("7. Exit the Realm");
  console.log("=====================================\n");

  askForChoice();
}

function askForChoice() {
  rl.question("What is your command? (1-7): ", handleChoice);
}

function isValidDateFormat(date) {
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

function handleInvalidChoice() {
  console.log("\nInvalid choice! Please select a valid option.");
  rl.question("\nPress Enter to return to the main menu...", () => {
    displayMenu();
  });
}

function handleChoice(choice) {
  const logger = new GameLogger("got_data.json", state.currentDifficulty);

  if (!["1", "2", "3", "4", "5", "6", "7"].includes(choice)) {
    handleInvalidChoice();
    return;
  }

  if (choice === "7") {
    console.log("\nFarewell, until we meet again...");
    if (state.currentAudio) {
      state.currentAudio.kill();
    }
    rl.close();
    return;
  }

  if (choice === "6") {
    audioManager.toggleMusic();
    console.log(`\nMusic has been ${state.isPlayingMusic ? 'resumed' : 'paused'}`);
    rl.question("\nPress Enter to return to the main menu...", () => {
      displayMenu();
    });
    return;
  }

  if (choice === "5") {
    displayDifficultyMenu();
    return;
  }

  if (choice === "1") {
    const today = new Date();
    const formattedDate = `${String(today.getDate()).padStart(2, '0')}/${String(today.getMonth() + 1).padStart(2, '0')}/${today.getFullYear()}`;
    const existingData = logger.readGameData() || [];
    
    // Check if entry exists for today
    const todayEntry = existingData.find(entry => {
      // Format both dates consistently for comparison
      const entryDate = entry.date.split('/').map(num => String(num).padStart(2, '0')).join('/');
      return entryDate === formattedDate;
    });

    if (todayEntry) {
      console.log("\nYou already have a conquest recorded for today!");
      console.log(`Current time: ${todayEntry.timeInvested} minutes`);
      console.log(`Current points: ${todayEntry.points}`);
      console.log("\nWould you like to:");
      console.log("1. Add more time to today's conquest");
      console.log("2. Modify today's time completely");
      console.log("3. Return to main menu");
      
      rl.question("\nChoose your action (1-3): ", (modChoice) => {
        if (modChoice === "1" || modChoice === "2") {
          const isAppending = modChoice === "1";
          const promptText = isAppending ? 
            "Additional time spent in the realm? " : 
            "New time spent in the realm? ";
          
          rl.question(promptText, (newTime) => {
            if (isNaN(newTime) || newTime <= 0) {
              console.log("\nPlease enter a valid number of minutes!");
              rl.question("\nPress Enter to return to the main menu...", () => {
                displayMenu();
              });
              return;
            }

            const success = logger.modifyGameData(formattedDate, newTime, isAppending);
            if (success) {
              console.log(`\n=== ${isAppending ? 'Time Added to' : 'Updated'} Today's Chronicles ===`);
              const data = logger.readGameData();
              const total = logger.calculateTotal(data);
              console.log(`Updated Title: ${total.title}`);
              console.log(`Current Streak: ${total.streak} days`);
              const updatedEntry = data.find(entry => 
                entry.date.split('/').map(num => String(num).padStart(2, '0')).join('/') === formattedDate
              );
              console.log(`Total Time Today: ${updatedEntry.timeInvested} minutes`);
              console.log(`Total Points Today: ${updatedEntry.points}`);
            }
            
            rl.question("\nPress Enter to return to the main menu...", () => {
              displayMenu();
            });
          });
        } else {
          displayMenu();
        }
      });
      return;
    }

    // Continue with normal flow if no entry exists for today
    rl.question("How many minutes did you dedicate to the realm? ", (timeInMinutes) => {
      if (isNaN(timeInMinutes) || timeInMinutes <= 0) {
        console.log("\nPlease enter a valid number of minutes!");
        rl.question("\nPress Enter to return to the main menu...", () => {
          displayMenu();
        });
        return;
      }

      const today = new Date();
      const formattedDate = `${String(today.getDate()).padStart(2, '0')}/${String(today.getMonth() + 1).padStart(2, '0')}/${today.getFullYear()}`;
      const existingData = logger.readGameData() || [];
      const streak = calculateStreak([
        ...existingData,
        {
          date: formattedDate,
          timeInvested: Number(timeInMinutes),
        },
      ]);

      const pointsBreakdown = calculatePoints(Number(timeInMinutes), streak);

      const data = {
        date: formattedDate,
        streak,
        points: pointsBreakdown,
        timeInvested: Number(timeInMinutes),
      };

      const result = logger.writeGameData(data);
      if (result.isUpdatedEntry) {
        console.log("\n=== Updated Today's Entry ===");
        const todayEntry = logger.readGameData().find(entry => entry.date === formattedDate);
        console.log(`Total time today: ${todayEntry.timeInvested} minutes`);
        console.log(`Total points today: ${todayEntry.points}`);
      } else if (result.milestoneAchieved) {
        console.log("\n=== NEW MILESTONE ACHIEVED! ===");
        console.log(getTitleArt(result.title));
        console.log(`You have risen from ${result.previousTitle} to ${result.title}!`);
        console.log(`You now rule in: ${result.region}`);
        console.log(`Achievement Tier: ${result.tier}`);
        if (result.nextMilestone) {
          console.log(`\nNext title: ${result.nextMilestone.title}`);
          console.log(`Progress to next: ${result.progressToNext}`);
        }
      }

      const total = logger.calculateTotal([...existingData, data]);
      
      console.log("\n=== The Maester's Chronicles ===");
      console.log(getTitleArt(total.title));
      console.log(getRandomQuote());
      console.log("\n=== Points Breakdown ===");
      console.log(`Base Points: ${pointsBreakdown.basePoints}`);
      console.log(`Progressive Bonus: ${pointsBreakdown.progressiveBonus}`);
      console.log(`Streak Bonus: ${pointsBreakdown.streakBonus}`);
      console.log(`Total Glory Earned: ${pointsBreakdown.totalPoints} points`);
      
      if (pointsBreakdown.multiplierUsed > 0) {
        console.log(`Streak Multiplier: ${(pointsBreakdown.multiplierUsed * 100).toFixed(0)}%`);
      }
      
      console.log(getMilestoneMessage(total.title));
      console.log(getStreakMessage(streak));
      
      // Wait for user to press enter before showing menu
      rl.question("\nPress Enter to return to the main menu...", () => {
        displayMenu();
      });
    });
  }

  if (choice === "2") {
    const data = logger.readGameData();
    console.log("\n=== The Grand Maester's Archives ===");
    console.log(ASCII_ART.throne);
    console.log("Your saga unfolds across the realms...\n");
    
    if (Array.isArray(data) && data.length > 0) {
      data.forEach((entry) => {
        console.log(
          `${entry.date} | Streak: ${entry.streak} | Glory Points: ${entry.points} | Time in Realm: ${entry.timeInvested} minutes`
        );
      });
      
      const total = logger.calculateTotal(data);
      console.log("\n=== The Scrolls of Power ===");
      console.log(`Total Glory: ${total.totalPoints} points`);
      console.log(`Current Title: ${total.title}`);
      console.log(`Consecutive Days in Combat: ${total.streak}`);
      console.log(`Time Invested in the Realm: ${total.totalTimeInvested} minutes`);
    } else {
      console.log("Your story has yet to begin, my Lord/Lady...");
    }
    
    const progress = logger.getProgressDetails();
    console.log("\n=== Your Current Status ===");
    console.log(`Title: ${progress.currentTitle}`);
    console.log(`Region: ${progress.region}`);
    console.log(`Achievement Tier: ${progress.tier}`);
    console.log(`Total Glory: ${progress.totalPoints} points`);
    console.log(`Current Streak: ${progress.streak} days`);
    if (progress.nextTitle !== 'Maximum Title Achieved') {
      console.log(`\nProgress to ${progress.nextTitle}:`);
      console.log(`${progress.progressPercentage}% (${progress.pointsToNext} points needed)`);
    }
    
    rl.question("\nPress Enter to return to the main menu...", () => {
      displayMenu();
    });
  }

  if (choice === "3") {
    console.log("\nThe Three-Eyed Raven sees all...");
    console.log(ASCII_ART.direwolf);
    console.log("\n1. Modify existing date");
    console.log("2. Append time to today's entry");
    console.log("3. Delete date entry");
    
    rl.question("\nChoose your action (1-3): ", (modChoice) => {
      if (modChoice === "1") {
        console.log("\nPlease enter the date in DD/MM/YYYY format (e.g., 09/11/2024)");
        rl.question("Which page of history needs correction? ", (date) => {
          if (!isValidDateFormat(date)) {
            console.log("\nInvalid date format! Please use DD/MM/YYYY format.");
            rl.question("\nPress Enter to return to the main menu...", () => {
              displayMenu();
            });
            return;
          }

          rl.question("What is the true time spent in the realm? ", (newTime) => {
            if (isNaN(newTime) || newTime <= 0) {
              console.log("\nPlease enter a valid number of minutes!");
              rl.question("\nPress Enter to return to the main menu...", () => {
                displayMenu();
              });
              return;
            }

            const success = logger.modifyGameData(date, newTime, false);
            if (success) {
              console.log("\n=== The History Has Been Rewritten ===");
              const data = logger.readGameData();
              const total = logger.calculateTotal(data);
              console.log(`Current Title: ${total.title}`);
              console.log(`Current Streak: ${total.streak} days`);
            } else {
              console.log("\nFailed to modify the record. The date might not exist in the chronicles.");
            }
            
            rl.question("\nPress Enter to return to the main menu...", () => {
              displayMenu();
            });
          });
        });
      } else if (modChoice === "2") {
        const today = new Date();
        const formattedDate = `${String(today.getDate()).padStart(2, '0')}/${String(today.getMonth() + 1).padStart(2, '0')}/${today.getFullYear()}`;
        
        // First check if today's entry exists
        const existingData = logger.readGameData() || [];
        const todayEntry = existingData.find(entry => 
          entry.date.split('/').map(num => String(num).padStart(2, '0')).join('/') === formattedDate
        );

        if (!todayEntry) {
          console.log("\nNo entry exists for today yet. Please use 'Record Your Conquest' first.");
          rl.question("\nPress Enter to return to the main menu...", () => {
            displayMenu();
          });
          return;
        }

        rl.question("Additional time spent in the realm? ", (additionalTime) => {
          if (isNaN(additionalTime) || additionalTime <= 0) {
            console.log("\nPlease enter a valid number of minutes!");
            rl.question("\nPress Enter to return to the main menu...", () => {
              displayMenu();
            });
            return;
          }

          const success = logger.modifyGameData(formattedDate, additionalTime, true);
          if (success) {
            console.log("\n=== Time Added to Today's Chronicles ===");
            const data = logger.readGameData();
            const total = logger.calculateTotal(data);
            console.log(`Updated Title: ${total.title}`);
            console.log(`Current Streak: ${total.streak} days`);
            const updatedEntry = data.find(entry => 
              entry.date.split('/').map(num => String(num).padStart(2, '0')).join('/') === formattedDate
            );
            console.log(`Total Time Today: ${updatedEntry.timeInvested} minutes`);
            console.log(`Total Points Today: ${updatedEntry.points}`);
          } else {
            console.log("\nFailed to append time. Please try again.");
          }
          
          rl.question("\nPress Enter to return to the main menu...", () => {
            displayMenu();
          });
        });
      } else if (modChoice === "3") {
        console.log("\nPlease enter the date in DD/MM/YYYY format (e.g., 09/11/2024)");
        rl.question("Which date's record shall be erased? ", (date) => {
          if (!isValidDateFormat(date)) {
            console.log("\nInvalid date format! Please use DD/MM/YYYY format.");
            rl.question("\nPress Enter to return to the main menu...", () => {
              displayMenu();
            });
            return;
          }

          rl.question("\nAre you sure you want to delete this record? (y/n): ", (confirm) => {
            if (confirm.toLowerCase() === 'y') {
              const success = logger.deleteGameData(date);
              if (success) {
                console.log("\n=== Record Erased from History ===");
                const data = logger.readGameData();
                const total = logger.calculateTotal(data);
                console.log(`Updated Title: ${total.title}`);
                console.log(`Current Streak: ${total.streak} days`);
                console.log(`Remaining Records: ${data.length}`);
              } else {
                console.log("\nFailed to delete the record. The date might not exist in the chronicles.");
              }
            } else {
              console.log("\nDeletion cancelled.");
            }
            
            rl.question("\nPress Enter to return to the main menu...", () => {
              displayMenu();
            });
          });
        });
      } else {
        handleInvalidChoice();
      }
    });
  }

  if (choice === "4") {
    console.log("\nSummoning the wisdom of the ages...");
    console.log(ASCII_ART.wall);
    const success = logger.recalculateAllData();
    if (success) {
      const data = logger.readGameData();
      const total = logger.calculateTotal(data);
      console.log("\n=== Recalculation Complete ===");
      console.log(`Total Entries: ${data.length}`);
      console.log(`Total Points: ${total.totalPoints}`);
      console.log(`Current Title: ${total.title}`);
      console.log(`Current Streak: ${total.streak} days`);
      console.log(`Total Time: ${total.totalTimeInvested} minutes`);
      
      const rawData = JSON.parse(fs.readFileSync(logger.filePath, "utf8"));
      if (rawData.entriesFixed > 0) {
        console.log(`\nEntries Fixed: ${rawData.entriesFixed}`);
        console.log("Check the console output above for details of fixed entries");
      }
    } else {
      console.log("Failed to recalculate data");
    }
    
    rl.question("\nPress Enter to return to the main menu...", () => {
      displayMenu();
    });
  }
}

// Start the application
try {
  console.log("Playing Game of Thrones Theme Music...");
  if (state.isPlayingMusic) {
    audioManager.playBackgroundMusic();
  }
  displayMenu();
} catch (error) {
  console.log("\nFailed to start application:", error.message);
  audioManager.stopMusic();
  rl.close();
  process.exit(1);
}

function getRandomQuote() {
  const quotes = [
    "The Maesters record your progress in their ancient tomes...",
    "Your dedication would make the Old Gods proud.",
    "From the frozen North to the shores of Dorne, your legend grows.",
    "The ravens carry whispers of your achievements across the Seven Kingdoms.",
    "Even the shadows of Asshai speak of your persistence.",
    "Your journey continues, as steady as the walls of Winterfell.",
    "Like Valyrian steel, your resolve only grows stronger.",
    "The realm remembers those who persist.",
    "Winter is Coming.",
    "The North Remembers.",
    "Valar Morghulis.",
    "Fire and Blood."
  ];
  return quotes[Math.floor(Math.random() * quotes.length)];
}

function getMilestoneMessage(title) {
  const messages = {
    "Peasant of Flea Bottom": "Your journey begins in the humble streets...",
    "Night's Watch Recruit": "The Wall beckons, and you answer the call!",
    "Ranger of the Watch": "Beyond the Wall lies your destiny...",
    "Master of Whispers": "Your network of little birds grows ever larger...",
    "Hand of the King": "The realm prospers under your guidance...",
    "Dragon Rider": "You soar above the clouds, master of sky and flame...",
    "The Prince/Princess That Was Promised": "The prophecy was true - you were the one!"
  };
  return messages[title] || "Your legend continues to grow...";
}

function getStreakMessage(streak) {
  if (streak === 1) return "Your watch begins...";
  if (streak === 7) return "As faithful as the Kingsguard!";
  if (streak === 30) return "Steadfast as the Wall itself!";
  if (streak > 100) return "Your dedication would impress the First Men!";
  return "Your persistence shapes the realm...";
}

function displayAchievement(title, points) {
  console.log(`
=== NEW ACHIEVEMENT UNLOCKED ===
${getTitleArt(title)}
Congratulations! You've reached: ${title}
Total Glory: ${points} points
=============================
`);
}

// Update GameLogger's modifyGameData method to use the new date validation
function modifyGameData(date, newTimeInMinutes) {
  try {
    if (!isValidDateFormat(date)) {
      console.log("Invalid date format. Please use DD/MM/YYYY");
      return false;
    }

    let existingData = this.readGameData() || [];
    const index = existingData.findIndex(entry => entry.date === date);
    
    if (index === -1) {
      console.log("No entry found for the specified date");
      return false;
    }

    // ... rest of modifyGameData implementation ...
  } catch (error) {
    console.log("error modifying data:", error);
    return false;
  }
}

function displayDifficultyMenu() {
  console.clear();
  console.log(`
╔═══════════════════════════════════════════════╗
║           Choose Your Path                     ║
╚═══════════════════════════════════════════════╝
${ASCII_ART.sword}
`);
  
  Object.entries(DIFFICULTY_SETTINGS).forEach(([key, setting], index) => {
    console.log(`${index + 1}. ${setting.name}`);
    console.log(`   ${setting.description}`);
    console.log();
  });

  rl.question("\nChoose your difficulty (1-3): ", (choice) => {
    const difficulties = Object.keys(DIFFICULTY_SETTINGS);
    const selected = difficulties[parseInt(choice) - 1];
    
    if (selected) {
      state.currentDifficulty = selected;
      config.updateConfig('difficulty', selected);
      console.log(`\nDifficulty set to: ${DIFFICULTY_SETTINGS[selected].name}`);
      rl.question("\nPress Enter to return to the main menu...", () => {
        displayMenu();
      });
    } else {
      console.log("\nInvalid choice. Using default difficulty.");
      rl.question("\nPress Enter to return to the main menu...", () => {
        displayMenu();
      });
    }
  });
}
