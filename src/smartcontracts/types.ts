import { Event } from "../synchronizers/types";
import { Abi, Network, type Subset } from "../util";

export type SmartContractStatus = "idle" | "running" | "stopping" | "synching" | "stopped" | "error" | "quota_exceeded";

export type SmartContractNetwork = Subset<Network, "ethereum" | "polygon" | "mumbai">;
export const SmartContractNetwoks: SmartContractNetwork[] = ["ethereum", "polygon", "mumbai"];

export type SmartContractInput = {
  name: string;
  network: Network;
  nodeURL: string;
  address: string;
  webhook?: string;
  abi: Abi[];
};

export type SmartContract = {
  id: string;
  name: string;
  network: Network;
  status: SmartContractStatus;
  lastTxBlockSynced: number;
  error?: string;
  nodeURL: string;
  address: string;
  webhook?: string;
  events: Event[];
  createdAt: string;
  updatedAt: string;
};
