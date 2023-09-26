import { Synchronizers, EventInput, InsertEventResponse } from "../../index";
import { baseAddress, baseEventInput, baseEventStatuses } from "../base";

describe("Synchronizers", () => {
  const baseUrl = process.env.BASE_URL!;
  const eventInput: EventInput = baseEventInput;
  const addressInput = baseAddress;
  let synchronizers: Synchronizers;

  beforeAll(async () => {
    synchronizers = new Synchronizers(baseUrl);
  });

  afterAll(async () => {
    await synchronizers.deleteEvent(addressInput, eventInput.abi.name);
  });

  describe("insertEvent tests", () => {
    it("should insert an event successfully", async () => {
      const response: InsertEventResponse = await synchronizers.insertEvent(addressInput, eventInput);
      expect(response).toBeDefined();

      const { data: event } = response;
      expect(event.id).toBeDefined();
      expect(event.address).toBe(addressInput);
      expect(event.network).toBe(eventInput.network);
      expect(event.latestBlockNumber).toBeGreaterThanOrEqual(0);
      expect(event.nodeURL).toBe(eventInput.nodeURL);
      expect(baseEventStatuses).toContain(event.status);
      expect(event.createdAt).toBeDefined();
      expect(event.updatedAt).toBeDefined();

      // TODO(ca): test inside abi object and abi inputs array
      expect(event.abi.name).toBe(eventInput.abi.name);
    });

    test("should throw an error if trying to insert an existing event", async () => {
      try {
        await synchronizers.insertEvent(addressInput, eventInput);
      } catch (error) {
        expect(error).toBeDefined();
        expect(error.response.status).toBe(500);
        expect(error.response.data.error).toBe(
          `event already exists with address=${addressInput} and eventName=${eventInput.abi.name}`
        );
      }
    });
  });
});
