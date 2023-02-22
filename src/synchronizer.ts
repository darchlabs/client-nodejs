import { EventDataResponse } from "./interfaces/event-data-response";
import { EventsResponse } from "./interfaces/events-reponse";

export default class Synchronizer {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  async getEvents(): Promise<Event[]> {
    const response = await fetch(`${this.baseURL}/api/v1/events`);
    const data: EventsResponse = await response.json();
    return data.data;
  }

  async getEventsByAddress(address: string): Promise<Event[]> {
    const response = await fetch(`${this.baseURL}/api/v1/events/${address}`);
    const data: EventsResponse = await response.json();
    return data.data;
  }

  async getEvent(address: string, eventName: string): Promise<Event> {
    const response = await fetch(
      `${this.baseURL}/api/v1/events/${address}/${eventName}`
    );
    const data: { data: Event } = await response.json();
    return data.data;
  }

  async getEventData(
    address: string,
    eventName: string
  ): Promise<EventDataResponse> {
    const response = await fetch(
      `${this.baseURL}/api/v1/events/${address}/${eventName}/data`
    );
    const data: EventDataResponse = await response.json();
    return data;
  }
}
