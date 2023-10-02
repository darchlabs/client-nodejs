import { AxiosInstance } from "axios";
import { ContractClient } from "./contracts/contracts";
import { EventClient } from "./events/events";

export class Syncronizer {
  private _contracts: ContractClient;
  private _events: EventClient;

  constructor(client: AxiosInstance) {
    this._contracts = new ContractClient(client);
    this._events = new EventClient(client);
  }

  get contracts(): ContractClient {
    return this._contracts;
  }

  get events(): EventClient {
    return this._events;
  }

  public setClient(client: AxiosInstance) {
    this._contracts.setClient(client);
    this._events.setClient(client);
  }
}