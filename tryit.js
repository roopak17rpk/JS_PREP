const fs = require('fs');

interface TimeLoggerProps {
  filePath: string;
  timeData: string;
}

const TimeLogger = (props: TimeLoggerProps) => {
  const { filePath, timeData } = props;

  // Write time to file
  const writeTimeToFile = () => {
    try {
      fs.writeFileSync(filePath, timeData);
      console.log("filePath", filePath);
      console.log("timeData", timeData);
      console.log("Time data written successfully");
    } catch (error) {
      console.log("error", error);
    }
  };

  // Read time from file 
  const readTimeFromFile = () => {
    try {
      const data = fs.readFileSync(filePath, 'utf8');
      console.log("filePath", filePath);
      console.log("data", data);
      return data;
    } catch (error) {
      console.log("error", error);
      return null;
    }
  };

  return {
    writeTimeToFile,
    readTimeFromFile
  };
};

// Example usage:
const logger = TimeLogger({
  filePath: 'time.txt',
  timeData: new Date().toISOString()
});

// Write current time
logger.writeTimeToFile();

// Read time
const savedTime = logger.readTimeFromFile();
console.log("savedTime", savedTime);
