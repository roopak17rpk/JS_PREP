const readline = require("readline");
const GameLogger = require('./GameLogger');
const { calculateStreak, calculatePoints } = require('./utils');
const fs = require('fs');

/**
 * Initialize readline interface
 */
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Display menu
console.log("\n=== Game of Thrones Tracker ===");
console.log("1. Write Data");
console.log("2. Read Data");
console.log("3. Modify Data");
console.log("4. Recalculate All Data");
console.log("===========================\n");

rl.question("Enter your choice (1-4): ", (choice) => {
  const logger = new GameLogger("got_data.json");

  if (choice === "1") {
    rl.question("Enter time spent watching (in minutes): ", (timeInMinutes) => {
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

      const points = calculatePoints(Number(timeInMinutes), streak);

      const data = {
        date: formattedDate,
        streak,
        points,
        timeInvested: Number(timeInMinutes),
      };

      logger.writeGameData(data);
      const total = logger.calculateTotal([...existingData, data]);
      
      console.log("\n=== Entry Summary ===");
      console.log(`Points Earned: ${points}`);
      console.log(`Current Title: ${total.title}`);
      console.log(`Streak: ${streak} days`);
      console.log("==================\n");
      
      rl.close();
    });
  }

  if (choice === "2") {
    const data = logger.readGameData();
    console.log("\n=== Watching History ===");
    
    if (Array.isArray(data) && data.length > 0) {
      data.forEach((entry) => {
        console.log(
          `Date: ${entry.date} | Streak: ${entry.streak} | Points: ${entry.points} | Time: ${entry.timeInvested} minutes`
        );
      });
      
      const total = logger.calculateTotal(data);
      console.log("\n=== Total Statistics ===");
      console.log(`Total Points: ${total.totalPoints}`);
      console.log(`Current Title: ${total.title}`);
      console.log(`Current Streak: ${total.streak} days`);
      console.log(`Total Time: ${total.totalTimeInvested} minutes`);
    } else {
      console.log("No watching history found");
    }
    rl.close();
  }

  if (choice === "3") {
    rl.question("Enter date to modify (MM/DD/YYYY): ", (date) => {
      rl.question("Enter new time in minutes: ", (newTime) => {
        const success = logger.modifyGameData(date, newTime);
        if (success) {
          const data = logger.readGameData();
          const total = logger.calculateTotal(data);
          console.log("\n=== Updated Statistics ===");
          console.log(`Current Title: ${total.title}`);
          console.log(`Current Streak: ${total.streak} days`);
        }
        rl.close();
      });
    });
  }

  if (choice === "4") {
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
      
      // Read the file directly to get the entriesFixed count
      const rawData = JSON.parse(fs.readFileSync(logger.filePath, "utf8"));
      if (rawData.entriesFixed > 0) {
        console.log(`\nEntries Fixed: ${rawData.entriesFixed}`);
        console.log("Check the console output above for details of fixed entries");
      }
    } else {
      console.log("Failed to recalculate data");
    }
    rl.close();
  }
}); 