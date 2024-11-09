const readline = require("readline");
const GameLogger = require("./GameLogger");
const { calculateStreak, calculatePoints } = require("./utils");
const fs = require("fs");
const path = require("path");
const player = require("play-sound")({});

/**
 * Initialize readline interface
 */
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

/**
 * Plays background music in loop
 */
function playBackgroundMusic() {
  const audioPath = "./Official Opening Credits_ Game of Thrones (HBO).mp3";

  // Check if audio file exists
  if (!fs.existsSync(audioPath)) {
    console.log("Warning: Theme music file not found at:", audioPath);
    return;
  }

  const audio = player.play(audioPath, (err) => {
    if (err) {
      console.log("Error playing audio:", err);
    }
    // Replay when finished
    playBackgroundMusic();
  });

  // Handle program exit
  process.on("SIGINT", () => {
    if (audio) {
      audio.kill();
    }
    process.exit();
  });
}

// Start playing background music
console.log("Playing Game of Thrones Theme Music...");
playBackgroundMusic();

// Display menu with ASCII art
console.log(`
╔═══════════════════════════════════════╗
║   The Game of Thrones Chronicles      ║
╚═══════════════════════════════════════╝
`);
console.log('"When you play the game of thrones, you win or you die."');
console.log("\nChoose your action, my Lord/Lady:");
console.log("1. Record Your Conquest");
console.log("2. View Your Saga");
console.log("3. Rewrite History");
console.log("4. Summon the Three-Eyed Raven (Recalculate)");
console.log("=====================================\n");

rl.question("What is your command? (1-4): ", (choice) => {
  const logger = new GameLogger("got_data.json");

  if (choice === "1") {
    rl.question(
      "How many minutes did you spend in the realm? ",
      (timeInMinutes) => {
        const today = new Date();
        const formattedDate = `${String(today.getDate()).padStart(
          2,
          "0"
        )}/${String(today.getMonth() + 1).padStart(
          2,
          "0"
        )}/${today.getFullYear()}`;
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

        console.log("\n=== The Maester's Records ===");
        console.log(`"${getRandomQuote()}"`);
        console.log(`\nYou've earned ${points} points!`);
        console.log(`Your current title: ${total.title}`);
        console.log(`Your streak: ${streak} days`);
        console.log(`"Keep going, winter is coming..."\n`);

        rl.close();
      }
    );
  }

  if (choice === "2") {
    const data = logger.readGameData();
    console.log("\n=== Chronicles of Your Journey ===");
    console.log('"A mind needs books as a sword needs a whetstone."\n');

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
      console.log(
        `Time Invested in the Realm: ${total.totalTimeInvested} minutes`
      );
    } else {
      console.log("Your story has yet to begin, my Lord/Lady...");
    }
    rl.close();
  }

  if (choice === "3") {
    rl.question("Which day's tale needs correction? (DD/MM/YYYY): ", (date) => {
      rl.question("What is the true time spent in the realm? ", (newTime) => {
        const success = logger.modifyGameData(date, newTime);
        if (success) {
          console.log("\n=== The History Has Been Rewritten ===");
          const data = logger.readGameData();
          const total = logger.calculateTotal(data);
          console.log(`Current Title: ${total.title}`);
          console.log(`Current Streak: ${total.streak} days`);
        }
        rl.close();
      });
    });
  }

  if (choice === "4") {
    console.log('"I can see things that happened in the past..."');
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
        console.log(
          "Check the console output above for details of fixed entries"
        );
      }
    } else {
      console.log("Failed to recalculate data");
    }
    rl.close();
  }
});

function getRandomQuote() {
  const quotes = [
    "The man who passes the sentence should swing the sword.",
    "Chaos isn't a pit. Chaos is a ladder.",
    "The night is dark and full of terrors.",
    "What do we say to the God of Death? Not today.",
    "A Lannister always pays his debts.",
    "The things I do for love.",
    "You know nothing, Jon Snow.",
    "Dracarys!",
    "Valar Morghulis.",
    "Winter is Coming.",
  ];
  return quotes[Math.floor(Math.random() * quotes.length)];
}
