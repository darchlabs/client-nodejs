/* eslint-disable no-useless-catch */
import type { ListEventsResponse } from "./requests";
import parseAbi from "./utils";
import { Event, EventDataResponse, EventsResponse } from "./event-interfaces";
import axios from "axios";

export default class Synchronizer {
  private URL: string;

  constructor(URL: string) {
    this.URL = URL;
  }

  public async GetEvents(): Promise<EventsResponse> {
    try {
      const url = `${this.URL}/api/v1/events`;
      const res = await axios.get<EventsResponse>(url, {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      });

      const data = res.data as EventsResponse;
      return data;
    } catch (err: any) {
      throw err;
    }
  }

  public async InsertEvent(
    address: string,
    network: string,
    abi: string
  ): Promise<ListEventsResponse> {
    try {
      const url = `${this.URL}/api/v1/events/${address}`;

      const parsedAbi = parseAbi(abi);

      const event = {
        abi: parsedAbi,
        network,
      };

      const res = await fetch(url, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          event,
        }),
      });

      const data = (await res.json()) as ListEventsResponse;
      return data;
    } catch (err: any) {
      throw err;
    }
  }

  public async GetEventsByAddress(address: string): Promise<EventsResponse> {
    try {
      const url = `${this.URL}/api/v1/events/${address}`;
      const res = await axios.get<EventsResponse>(url, {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      });

      const data = res.data as EventsResponse;
      return data;
    } catch (err: unknown) {
      throw err;
    }
  }

  async GetEvent(address: string, eventName: string): Promise<Event> {
    try {
      const url = `${this.URL}/api/v1/events/${address}/${eventName}`;
      const res = await axios.get<Event>(url, {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      });

      const data = res.data as Event;
      return data;
    } catch (err: any) {
      throw err;
    }
  }

  async GetEventData(
    address: string,
    eventName: string
  ): Promise<EventDataResponse> {
    try {
      const url = `${this.URL}/api/v1/events/${address}/${eventName}/data`;
      const res = await axios.get<EventDataResponse>(url, {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      });

      const data = res.data as EventDataResponse;
      return data;
    } catch (err: any) {
      throw err;
    }
  }
}
