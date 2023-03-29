import { Synchronizers } from "darchlabs";

// Define base URL for API requests
const baseUrl = "http://localhost:5555";

// Create instance of client
const synchronizers = new Synchronizers(baseUrl);

// Test function for stopping event
async function testStopEvent() {
  console.log("Testing StopEvent...");

  const address = "0xc13530546feA5fC787A2d126bB39bDeC20C4cc9e";
  const eventName = "Example";

  try {
    const response = await synchronizers.stopEvent(address, eventName);
    console.log("Response:", response);
  } catch (error) {
    console.error("Error:", error);
  }
}

// Run test function
testStopEvent();
