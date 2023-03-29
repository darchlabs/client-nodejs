import { Synchronizers, Options } from "darchlabs";

// Define base URL for API requests
const baseUrl = "http://localhost:5555";

// Create instance of client
const synchronizers = new Synchronizers(baseUrl);

// Test function for listing events with default options
async function testListEventsDefaultOptions() {
  console.log("Testing listEvents with default options...");
  try {
    const response = await synchronizers.listEvents();
    console.log("Response:", response);
  } catch (error) {
    console.error("Error:", error);
  }
}

// Test function for listing events with custom options
async function testListEventsCustomOptions() {
  console.log("Testing listEvents with custom options...");

  const opts: Options = {
    limit: 1,
    page: 1,
    sort: "desc",
  };

  try {
    const response = await synchronizers.listEvents(opts);
    console.log("Response:", response);
  } catch (error) {
    console.error("Error:", error);
  }
}

// Run test functions
testListEventsDefaultOptions();
testListEventsCustomOptions();
