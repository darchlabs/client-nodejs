import { Synchronizers, Options } from "darchlabs";

// define base url for api request
const baseUrl = process.env.BASE_URL;
if (baseUrl === undefined) {
  console.log("BASE_URL env value not defined");
  process.exit(1);
}

// create instance of client
const synchronizers = new Synchronizers(baseUrl);

// test function for listing event with default options
async function testListEventDataDefaultOptions() {
  console.log("testing listEventData with default options...");

  const address = "0xE15A66b7B8e385CAa6F69FD0d55984B96D7263CF";
  const eventName = "Transfer";

  try {
    const response = await synchronizers.listEventData(address, eventName);
    console.log("Response:", response);
  } catch (error) {
    console.error("Error:", error);
  }
}

// test function for listing event with custom options
async function testListEventDataCustomOptions() {
  console.log("testing listEventData with custom options...");

  const address = "0xE15A66b7B8e385CAa6F69FD0d55984B96D7263CF";
  const eventName = "Transfer";

  const opts: Options = {
    limit: 100,
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

// run test functions
testListEventDataDefaultOptions();
testListEventDataCustomOptions();
