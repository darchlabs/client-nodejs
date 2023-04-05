import { Synchronizers, Options, ListEventsResponse, EventInput } from "../../index";
import { baseAddress, baseEventInput, baseEventStatuses } from "../base";

describe("Synchronizers", () => {
  const baseUrl = process.env.BASE_URL!;
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

  describe("listEvents", () => {
    test("should get a list of events without options", async () => {
      const response: ListEventsResponse = await synchronizers.listEvents();
      expect(response).toBeDefined();
      expect(response.data).toBeInstanceOf(Array);
      expect(response.meta).toBeDefined();
      const { cronjob, pagination } = response.meta;

      const event = response.data.find((e) => e.address === addressInput)!;
      expect(event).toBeDefined();
      expect(event.address).toBe(addressInput);
      expect(event.network).toBe(eventInput.network);
      expect(event.latestBlockNumber).toBeGreaterThanOrEqual(0);
      expect(event.nodeURL).toBe(eventInput.nodeURL);
      expect(baseEventStatuses).toContain(event.status);
      expect(event.createdAt).toBeDefined();
      expect(event.updatedAt).toBeDefined();

      // TODO(ca): test inside abi object and abi inputs array
      expect(event.abi.name).toBe(eventInput.abi.name);

      expect(cronjob).toBeDefined();
      expect(cronjob.error).toBeDefined();
      expect(cronjob.seconds).toBeDefined();
      expect(cronjob.status).toBeDefined();

      expect(pagination).toBeDefined();
      expect(pagination.limit).toBeDefined();
      expect(pagination.page).toBeDefined();
      expect(pagination.sort).toBeDefined();
      expect(pagination.totalElements).toBeDefined();
      expect(pagination.totalPages).toBeDefined();
    });

    test("should get a list of events with options", async () => {
      const opts: Options = {
        limit: 10,
        page: 1,
        sort: "asc",
      };
      const response: ListEventsResponse = await synchronizers.listEvents(opts);
      expect(response).toBeDefined();
      expect(response.data).toBeInstanceOf(Array);
      expect(response.meta).toBeDefined();
      const { cronjob, pagination } = response.meta;

      const event = response.data.find((e) => e.address === addressInput)!;
      expect(event).toBeDefined();
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

      expect(cronjob).toBeDefined();
      expect(cronjob.error).toBeDefined();
      expect(cronjob.seconds).toBeDefined();
      expect(cronjob.status).toBeDefined();

      expect(pagination.limit).toBeDefined();
      expect(pagination.page).toBeDefined();
      expect(pagination.sort).toBeDefined();
      expect(pagination.totalElements).toBeDefined();
      expect(pagination.totalPages).toBeDefined();
    });
  });
});
