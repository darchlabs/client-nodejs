import { AxiosInstance, AxiosResponse, isAxiosError } from "axios";
import { Options, Pagination } from "../../utils/pagination";
import { Event, EventData } from "./types";
import {
  EventsResponse,
  EventDatasResponse,
} from "./responses";

export class EventClient {
  private _client: AxiosInstance;

  constructor(client: AxiosInstance) {
    this._client = client;
  }

  public setClient(client: AxiosInstance) {
    this._client = client;
  }

  private async handleRequest<T>(
    requestPromise: Promise<AxiosResponse<{ data?: T, meta?: any, error?: string }>>
  ): Promise<{ data: T; meta: any }> {
    try {
      // make request and check if response is valid
      const response = await requestPromise;
      if (!response) {
        throw new Error("Error: Server did not respond, please try again later.");
      }

      // get data and status code from response
      const { status, data } = response;
      if (status !== 200 && status !== 201) {
        if (data?.error) {
          throw new Error(data.error);
        }
        throw new Error(`Error: Received status code ${status}`);
      }

      return { data: data?.data, meta: data?.meta };
    } catch (err) {
      if (isAxiosError(err) && err?.response?.data?.error) {
        throw new Error(err.response.data.error);
      }

      throw err;
    }
  }

  public async listEventsByAddress(address: string, options?: Options): Promise<EventsResponse> {
    const params: any = {};
    if (options?.limit) params.limit = options.limit;
    if (options?.page) params.page = options.page;
    if (options?.sort) params.sort = options.sort;

    const url = `/api/v1/events/${address}`;
    const response = await this.handleRequest(
      this._client.get<{ data: Event[], meta: { pagination: Pagination }, error?: string }>(url, { params })
    );

    return { events: response.data, pagination: response.meta?.pagination };
  }

  public async listEventData<T>(
    address: string,
    eventName: string,
    options?: Options
  ): Promise<EventDatasResponse<T>> {
    const params: any = {};
    if (options?.limit) params.limit = options.limit;
    if (options?.page) params.page = options.page;
    if (options?.sort) params.sort = options.sort;

    const url = `/api/v1/events/${address}/${eventName}/data`;
    const response = await this.handleRequest(
      this._client.get<{ data: EventData<T>[], meta: { pagination: Pagination, event: Event }, error?: string }>(url, { params })
    );

    return { datas: response.data, pagination: response.meta?.pagination, event: response.meta?.event };
  }
}