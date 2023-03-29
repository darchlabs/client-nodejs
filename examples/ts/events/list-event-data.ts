import { Synchronizers, Options } from "darchlabs";

// Define base URL for API requests
const baseUrl = "http://localhost:5555";

// Create instance of client
const synchronizers = new Synchronizers(baseUrl);

// Test function for listing event with default options
async function testListEventDataDefaultOptions() {
  console.log("Testing listEventData with default options...");

  const address = "0xc13530546feA5fC787A2d126bB39bDeC20C4cc9e";
  const eventName = "Example";

  try {
    const response = await synchronizers.listEventData(address, eventName);
    console.log("Response:", response);
  } catch (error) {
    console.error("Error:", error);
  }
}

// Test function for listing event with custom options
async function testListEventDataCustomOptions() {
  console.log("Testing listEventData with custom options...");

  const address = "0xc13530546feA5fC787A2d126bB39bDeC20C4cc9e";
  const eventName = "Example";

  const opts: Options = {
    limit: 10,
    page: 1,
    sort: "desc",
  };

  try {
    const response = await synchronizers.listEventData(address, eventName, opts);
    console.log("Response:", response);
  } catch (error) {
    console.error("Error:", error);
  }
}

// Run test functions
testListEventDataDefaultOptions();
testListEventDataCustomOptions();
