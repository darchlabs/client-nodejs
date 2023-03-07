/* eslint-disable no-useless-catch */
import type { ListEventsResponse } from "./requests";
import parseAbi from "./utils";
import { Event, EventDataResponse, EventsResponse } from "./event-interfaces";
import axios from "axios";
import { ethers } from "ethers";
import { abiEvent } from "./types";

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
    network: string,
    contract: ethers.BaseContract,
    name: string
  ): Promise<ListEventsResponse> {
    try {
      // Validate there is a runner
      const runner = contract.runner;
      if (!runner) {
        throw new Error("contract runner is needed");
      }

      // Get address
      const address = await contract.getAddress();
      // With the runner, validate contract exists
      const code = await runner.provider.getCode(address);

      // Get and parse to an object the abi
      const contractInterface = contract.interface.formatJson();
      const abi = JSON.parse(contractInterface) as any;

      // Get events from the abi
      const events = abi.filter(
        (i: { type: string }) => i.type === "event"
      ) as abiEvent[];
      // Get the abi event that is matching the given name
      const abiEvent = events.filter((event, _) => {
        if (event.name === name) {
          return event as abiEvent;
        }
      });
      // Validate an event exist with the input name
      if (!abiEvent[0]) {
        throw new Error("there is no event matching the given name");
      }

      // Parse abi to the synchronizers API format
      const parsedAbi = parseAbi(JSON.stringify(abiEvent[0]));

      // Get endpoint based on the given address
      const url = `${this.URL}/api/v1/events/${address}`;

      // Define event for body
      const event = {
        network,
        address,
        name,
        abi: parsedAbi,
      };

      // Make POST to the api
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
