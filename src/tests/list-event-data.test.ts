import { ListEventsResponse } from "../responses";
import { Synchronizers, ListEventDataResponse } from "../index";
import { EventInput, Options, Pagination } from "../types";
import { baseAddress, baseEventDataExample, baseEventInput, baseEventStatuses, Sleep } from "./base";

describe("Synchronizers", () => {
  const baseUrl = "http://localhost:5555";
  const eventInput: EventInput = baseEventInput;
  const addressInput = baseAddress;
  let synchronizers: Synchronizers;

  beforeAll(async () => {
    synchronizers = new Synchronizers(baseUrl);
    await synchronizers.insertEvent(addressInput, eventInput);
    await Sleep(10000);
  });

  afterAll(async () => {
    await synchronizers.deleteEvent(addressInput, eventInput.abi.name);
  });

  describe("listEvents", () => {
    test("should get a list of events data without options", async () => {
      const response: ListEventDataResponse<baseEventDataExample> =
        await synchronizers.listEventData<baseEventDataExample>(addressInput, eventInput.abi.name);

      expect(response).toBeDefined();
      expect(response.data).toBeInstanceOf(Array);
      expect(response.meta).toBeDefined();
      const { cronjob, pagination, event } = response.meta;

      const [eventData] = response.data;
      expect(eventData).toBeDefined();
      expect(eventData.id).toBeDefined();
      expect(eventData.eventId).toBe(response.meta.event.id);
      expect(eventData.blockNumber).toBeGreaterThanOrEqual(0);
      expect(eventData.createdAt).toBeDefined();

      const { data } = eventData;
      expect(data.num).toBeDefined();
      expect(data.lala).toBeDefined();
      expect(data.lala2).toBeDefined();
      expect(data.amount).toBeDefined();
      expect(data.amount1).toBeDefined();
      expect(data.userAddr).toBeDefined();

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
    });

    test("should get a list of events data with options", async () => {
      const opts: Options = {
        limit: 10,
        page: 1,
        sort: "desc",
      };

      const response: ListEventDataResponse<baseEventDataExample> =
        await synchronizers.listEventData<baseEventDataExample>(addressInput, eventInput.abi.name, opts);

      expect(response).toBeDefined();
      expect(response.data).toBeInstanceOf(Array);
      expect(response.meta).toBeDefined();
      const { cronjob, pagination, event } = response.meta;

      const [eventData] = response.data;
      expect(eventData).toBeDefined();
      expect(eventData.id).toBeDefined();
      expect(eventData.eventId).toBe(response.meta.event.id);
      expect(eventData.blockNumber).toBeGreaterThanOrEqual(0);
      expect(eventData.createdAt).toBeDefined();

      const { data } = eventData;
      expect(data.num).toBeDefined();
      expect(data.lala).toBeDefined();
      expect(data.lala2).toBeDefined();
      expect(data.amount).toBeDefined();
      expect(data.amount1).toBeDefined();
      expect(data.userAddr).toBeDefined();

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
    });
  });
});
