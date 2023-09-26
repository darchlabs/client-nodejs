import { Network } from "../util";
import { Abi, EventAbi } from "../util/abi";

export type CronjobStatus = "idle" | "running" | "stopping" | "stopped" | "error";
export type EventStatus = "synching" | "running" | "stopped" | "error";

export type Event = {
  id: string;
  network: Network;
  address: string;
  latestBlockNumber: number;
  nodeURL: string;
  status: EventStatus;
  error: string;
  abi: EventAbi;
  createdAt: string;
  updatedAt: string;
};

export type EventInput = {
  network: Network;
  nodeURL: string;
  abi: Abi;
};

export type EventData<T> = {
  id: string;
  eventId: string;
  tx: string;
  blockNumber: string;
  data: T;
  createdAt: string;
};

export type Cronjob = {
  status: CronjobStatus;
  seconds: number;
  error: string;
};
