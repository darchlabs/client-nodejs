const { Synchronizers } = require("darchlabs");

// define base url for api request
const baseUrl = process.env.BASE_URL;
if (baseUrl === undefined) {
  console.log("BASE_URL env value not defined");
  process.exit(1);
}

// create instance of client
const synchronizers = new Synchronizers(baseUrl);

// test function for listing events with default options
async function testListEventsDefaultOptions() {
  console.log("testing listEvents with default options...");
  try {
    const response = await synchronizers.listEvents();
    console.log("Response:", response);
  } catch (error) {
    console.error("Error:", error);
  }
}

// test function for listing events with custom options
async function testListEventsCustomOptions() {
  console.log("testing listEvents with custom options...");

  const opts = {
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

// run test functions
testListEventsDefaultOptions();
testListEventsCustomOptions();
