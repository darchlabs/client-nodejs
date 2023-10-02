import { AxiosInstance } from "axios";
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

  public async listEventsByAddress(address: string, options?: Options): Promise<EventsResponse> {
    const params: any = {};
    if (options?.limit) params.limit = options.limit;
    if (options?.page) params.page = options.page;
    if (options?.sort) params.sort = options.sort;

    const url = `/api/v1/events/${address}`;
    const { data } = await this._client.get<{ data: Event[], meta: { pagination: Pagination } }>(url, { params });
    // TODO(ca): check status code

    return { events: data?.data, pagination: data?.meta?.pagination };
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
    const { data } = await this._client.get<{ data: EventData<T>[], meta: { pagination: Pagination, event: Event } }>(url, { params });
    // TODO(ca): check status code

    return { datas: data?.data, pagination: data?.meta?.pagination, event: data?.meta?.event };
  }
}
