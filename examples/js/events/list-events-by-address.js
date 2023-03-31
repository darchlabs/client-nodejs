const { Synchronizers, Options } = require("darchlabs");

// Define base URL for API requests
const baseUrl = "http://localhost:5555";

// Create instance of client
const synchronizers = new Synchronizers(baseUrl);

// Test function for listing event with default options
async function testListEventsByAddressDefaultOptions() {
  console.log("Testing listEventsByAddress with default options...");

  const address = "0xc13530546feA5fC787A2d126bB39bDeC20C4cc9e";

  try {
    const response = await synchronizers.listEventsByAddress(address);
    console.log("Response:", response);
  } catch (error) {
    console.error("Error:", error);
  }
}

// Test function for listing event with custom options
async function testListEventsByAddressCustomOptions() {
  console.log("Testing listEventsByAddress with custom options...");

  const address = "0xc13530546feA5fC787A2d126bB39bDeC20C4cc9e";

  const opts = {
    limit: 10,
    page: 1,
    sort: "desc",
  };

  try {
    const response = await synchronizers.listEventsByAddress(address, opts);
    console.log("Response:", response);
  } catch (error) {
    console.error("Error:", error);
  }
}

// Run test functions
testListEventsByAddressDefaultOptions();
testListEventsByAddressCustomOptions();
