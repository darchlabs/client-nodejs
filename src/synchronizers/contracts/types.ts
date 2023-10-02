import { Event } from "../events/types";
import { Abi } from "../../utils/abi";
import { Network } from "../../utils/network";

export type ContractStatus = "idle" | "running" | "stopping" | "synching" | "stopped" | "error" | "quota_exceeded";

export type ContractInput = {
  name: string;
  network: Network;
  nodeURL?: string;
  address: string;
  webhook?: string;
  abi: Abi[];
};

export type Contract = {
  id: string;
  name: string;
  network: Network;
  status: ContractStatus;
  lastTxBlockSynced: number;
  error?: string;
  nodeURL: string;
  address: string;
  webhook?: string;
  events: Event[];
  createdAt: string;
  updatedAt: string;
};
