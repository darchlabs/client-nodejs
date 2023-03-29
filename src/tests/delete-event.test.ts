import { EventInput, Synchronizers } from "../index";
import { DeleteEventResponse } from "../responses";
import { baseAddress, baseEventInput } from "./base";

describe("Synchronizers", () => {
  const baseUrl = "http://localhost:5555";
  const eventInput: EventInput = baseEventInput;
  const addressInput = baseAddress;
  let synchronizers: Synchronizers;

  beforeAll(async () => {
    synchronizers = new Synchronizers(baseUrl);
    await synchronizers.insertEvent(addressInput, eventInput);
  });

  test("deletes event successfully", async () => {
    // Delete the event
    const deleteResponse: DeleteEventResponse = await synchronizers.deleteEvent(addressInput, eventInput.abi.name);
    expect(deleteResponse).toBeDefined();
  });

  test("throws 500 error when trying to delete non-existent event", async () => {
    try {
      await synchronizers.deleteEvent(addressInput, eventInput.abi.name);
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.response.status).toBe(409);
      expect(error.response.data.error).toBe(
        `event does not exist with address=${addressInput} event_name=${eventInput.abi.name}`
      );
    }
  });
});
