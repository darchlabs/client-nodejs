import { EventInput, Synchronizers } from "../index";
import { GetEventResponse } from "../responses";
import { baseAddress, baseEventInput, baseEventStatuses } from "./base";

describe("Synchronizers", () => {
  const baseUrl = "http://localhost:5555";
  const eventInput: EventInput = baseEventInput;
  const addressInput = baseAddress;
  let synchronizers: Synchronizers;

  beforeAll(async () => {
    synchronizers = new Synchronizers(baseUrl);
    await synchronizers.insertEvent(addressInput, eventInput);
  });

  afterAll(async () => {
    await synchronizers.deleteEvent(addressInput, eventInput.abi.name);
  });

  describe("getEvent", () => {
    test("should return the event with the given address and name", async () => {
      const response: GetEventResponse = await synchronizers.getEvent(addressInput, eventInput.abi.name);
      expect(response).toBeDefined();
      expect(response.data.address).toBe(addressInput);
      expect(response.data.network).toBe(eventInput.network);
      expect(response.data.latestBlockNumber).toBeGreaterThanOrEqual(0);
      expect(response.data.nodeURL).toBe(eventInput.nodeURL);
      expect(baseEventStatuses).toContain(response.data.status);
      expect(response.data.createdAt).toBeDefined();
      expect(response.data.updatedAt).toBeDefined();
    });

    test("should return an error when the requested event does not exist", async () => {
      const address = "0x1234567890abcdef1234567890abcdef12345678";
      const eventName = "NonexistentEvent";

      try {
        await synchronizers.getEvent(address, eventName);
      } catch (error) {
        expect(error.response.status).toBe(409);
        expect(error.response.data.error).toBe("sql: no rows in result set");
      }
    });
  });
});
