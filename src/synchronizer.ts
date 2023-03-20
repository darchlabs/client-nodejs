/* eslint-disable no-useless-catch */
import type { ListEventsResponse } from "./requests";
import parseAbi, { getChainId } from "./utils";
import {
  Event,
  EventDataResponse,
  EventResponse,
  EventsResponse,
} from "./event-interfaces";
import axios from "axios";
import { ethers, toBigInt } from "ethers";
import { abiEvent } from "./types";

export default class Synchronizer {
  private URL: string;

  constructor(URL: string) {
    this.URL = `${URL}/sync`;
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

      const data = res.data;
      return data;
    } catch (err: any) {
      return err.response.data;
    }
  }

  public async InsertEvent(
    network: string,
    contract: ethers.BaseContract,
    name: string,
    nodeURL: string
  ): Promise<ListEventsResponse> {
    try {
      // Validate the client got from the node url is valid
      const client = new ethers.JsonRpcProvider(nodeURL);
      if (!client) {
        throw new Error("invalid client");
      }

      // Validate network
      const clientChainId = (await client.getNetwork()).chainId;
      const chainId = getChainId(network);
      if (clientChainId !== toBigInt(chainId)) {
        throw new Error("invalid client network");
      }

      // Get address
      const address = await contract.getAddress();
      // With the runner, validate contract exists
      const code = await client.provider.getCode(address);

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
        nodeURL,
        abi: parsedAbi,
      } as Event;

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
      return err.response.data;
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
    } catch (err: any) {
      return err.response.data;
    }
  }

  async GetEvent(address: string, eventName: string): Promise<EventResponse> {
    try {
      const url = `${this.URL}/api/v1/events/${address}/${eventName}`;
      const res = await axios.get<EventResponse>(url, {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      });

      const data = res.data as EventResponse;
      return data;
    } catch (err: any) {
      return err.response.data;
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

      if (res.status !== 200) {
      }

      const data = res.data as EventDataResponse;
      return data;
    } catch (err: any) {
      return err.response.data;
    }
  }

  public async RestartEvent(
    address: string,
    eventName: string
  ): Promise<boolean> {
    try {
      const url = `${this.URL}/api/v1/events/${address}/${eventName}/restart`;
      const res = await axios.get<EventsResponse>(url, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
      });

      return true;
    } catch (err: any) {
      return err.response.data;
    }
  }

  public async DeleteEvent(
    address: string,
    eventName: string
  ): Promise<boolean> {
    try {
      const url = `${this.URL}/api/v1/events/${address}/${eventName}`;
      const res = await axios.get<EventsResponse>(url, {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
        },
      });

      return true;
    } catch (err: any) {
      return err.response.data;
    }
  }
}
