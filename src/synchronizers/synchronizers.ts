import axios, { AxiosResponse } from "axios";
import { Options } from "../util";
import {
  DeleteEventResponse,
  GetEventResponse,
  InsertEventResponse,
  ListEventDataResponse,
  ListEventsByAdressResponse,
  ListEventsResponse,
  RestartCronjobResponse,
  StartCronjobResponse,
  StartEventResponse,
  StatusCronjobResponse,
  StopCronjobResponse,
  StopEventResponse,
} from "./responses";
import { EventInput } from "./types";

export class Synchronizers {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  public async insertEvent(address: string, event: EventInput): Promise<InsertEventResponse> {
    const url = `${this.baseUrl}/api/v1/events/${address}`;
    const response = await axios.post<InsertEventResponse>(url, { event });

    return response.data;
  }

  public async getEvent(address: string, eventName: string): Promise<GetEventResponse> {
    const url = `${this.baseUrl}/api/v1/events/${address}/${eventName}`;
    const response = await axios.get<GetEventResponse>(url);

    return response.data;
  }

  public async listEvents(options?: Options): Promise<ListEventsResponse> {
    const params: any = {};
    if (options?.limit) params.limit = options.limit;
    if (options?.page) params.page = options.page;
    if (options?.sort) params.sort = options.sort;

    const url = `${this.baseUrl}/api/v1/events`;
    const response = await axios.get<ListEventsResponse>(url, { params });

    return response.data;
  }

  public async listEventsByAddress(address: string, options?: Options): Promise<ListEventsByAdressResponse> {
    const params: any = {};
    if (options?.limit) params.limit = options.limit;
    if (options?.page) params.page = options.page;
    if (options?.sort) params.sort = options.sort;

    const url = `${this.baseUrl}/api/v1/events/${address}`;
    const response = await axios.get<ListEventsByAdressResponse>(url, { params });

    return response.data;
  }

  public async listEventData<T>(
    address: string,
    eventName: string,
    options?: Options
  ): Promise<ListEventDataResponse<T>> {
    const params: any = {};
    if (options?.limit) params.limit = options.limit;
    if (options?.page) params.page = options.page;
    if (options?.sort) params.sort = options.sort;

    const url = `${this.baseUrl}/api/v1/events/${address}/${eventName}/data`;
    const response = await axios.get<ListEventDataResponse<T>>(url, { params });

    return response.data;
  }

  public async deleteEvent(address: string, eventName: string): Promise<DeleteEventResponse> {
    const url = `${this.baseUrl}/api/v1/events/${address}/${eventName}`;
    const response = await axios.delete<DeleteEventResponse>(url);

    return response.data;
  }

  public async startEvent(address: string, eventName: string): Promise<StartEventResponse> {
    const url = `${this.baseUrl}/api/v1/events/${address}/${eventName}/start`;
    const response = await axios.post<StartEventResponse>(url);

    return response.data;
  }

  public async stopEvent(address: string, eventName: string): Promise<StopEventResponse> {
    const url = `${this.baseUrl}/api/v1/events/${address}/${eventName}/stop`;
    const response = await axios.post<StopEventResponse>(url);

    return response.data;
  }

  public async startCronjob(): Promise<StartCronjobResponse> {
    const url = `${this.baseUrl}/api/v1/cronjobs/start`;
    const response = await axios.post<StartCronjobResponse>(url);

    return response.data;
  }

  public async stopCronjob(): Promise<StopCronjobResponse> {
    const url = `${this.baseUrl}/api/v1/cronjob/stop`;
    const response = await axios.post<StopCronjobResponse>(url);
    return response.data;
  }

  public async restartCronjob(): Promise<RestartCronjobResponse> {
    const url = `${this.baseUrl}/api/v1/cronjob/restart`;
    const response = await axios.post<RestartCronjobResponse>(url);
    return response.data;
  }

  public async statusCronjob(): Promise<StatusCronjobResponse> {
    const url = `${this.baseUrl}/api/v1/cronjob/status`;
    const response = await axios.get<StatusCronjobResponse>(url);
    return response.data;
  }
}
