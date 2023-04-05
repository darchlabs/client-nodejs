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
async function testListEventsByAddressDefaultOptions() {
  console.log("testing listEventsByAddress with default options...");

  const address = "0xc13530546feA5fC787A2d126bB39bDeC20C4cc9e";

  try {
    const response = await synchronizers.listEventsByAddress(address);
    console.log("Response:", response);
  } catch (error) {
    console.error("Error:", error);
  }
}

// test function for listing event with custom options
async function testListEventsByAddressCustomOptions() {
  console.log("testing listEventsByAddress with custom options...");

  const address = "0xc13530546feA5fC787A2d126bB39bDeC20C4cc9e";

  const opts: Options = {
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

// run test functions
testListEventsByAddressDefaultOptions();
testListEventsByAddressCustomOptions();
