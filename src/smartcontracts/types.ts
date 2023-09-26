import { Event } from "../synchronizers/types";
import { Abi, Network, type Subset } from "../util";

export type SmartContractStatus = "idle" | "running" | "stopping" | "synching" | "stopped" | "error" | "quota_exceeded";

export type SmartContactNetwork = Subset<Network, "ethereum" | "polygon">;
export const SmartContractNetwoks: SmartContactNetwork[] = ["ethereum", "polygon"];

export type SmartContractInput = {
  name: string;
  network: Network;
  nodeURL: string;
  address: string;
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
  events: Event[];
  createdAt: string;
  updatedAt: string;
};
