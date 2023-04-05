import { Synchronizers, EventInput } from "darchlabs";

// define base url for api request
const baseUrl = process.env.BASE_URL;
if (baseUrl === undefined) {
  console.log("BASE_URL env value not defined");
  process.exit(1);
}

// create instance of client
const synchronizers = new Synchronizers(baseUrl);

// test function for inserting event
async function testInsertEventAdditionalData() {
  console.log("testing insertEvent...");

  const address = "0xc13530546feA5fC787A2d126bB39bDeC20C4cc9e";

  const event: EventInput = {
    network: "polygon",
    nodeURL: "https://polygon-mumbai.g.alchemy.com/v2/_fQt29PoLS69dpof_XX_P6ziiJY7-U4I",
    abi: {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
        {
          indexed: true,
          internalType: "address",
          name: "userAddr",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "amount1",
          type: "uint256",
        },
        {
          indexed: true,
          internalType: "uint256",
          name: "num",
          type: "uint256",
        },
        {
          indexed: true,
          internalType: "string",
          name: "lala",
          type: "string",
        },
        {
          indexed: false,
          internalType: "string",
          name: "lala2",
          type: "string",
        },
      ],
      name: "Example",
      type: "event",
    },
  };

  try {
    const response = await synchronizers.insertEvent(address, event);
    console.log("Response:", response);
  } catch (error) {
    console.error("Error:", error);
  }
}

// run test functions
testInsertEventAdditionalData();
