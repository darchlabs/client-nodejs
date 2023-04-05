import { Abi, Event } from "../synchronizers/types";
import { Network } from "../util";

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
  nodeURL: string;
  address: string;
  events: Event[];
  createdAt: string;
  updatedAt: string;
};
