const { Synchronizers } = require("darchlabs");

// define base url for api request
const baseUrl = process.env.BASE_URL;
if (baseUrl === undefined) {
  console.log("BASE_URL env value not defined");
  process.exit(1);
}

// create instance of client
const synchronizers = new Synchronizers(baseUrl);

// test function for stopping event
async function testStopEvent() {
  console.log("testing StopEvent...");

  const address = "0xc13530546feA5fC787A2d126bB39bDeC20C4cc9e";
  const eventName = "Example";

  try {
    const response = await synchronizers.stopEvent(address, eventName);
    console.log("Response:", response);
  } catch (error) {
    console.error("Error:", error);
  }
}

// run test function
testStopEvent();
