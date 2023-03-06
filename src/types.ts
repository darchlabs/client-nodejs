export type _synchronizer = {
  network: Network;
  address: string;
  raw?: string;
};

export type SynchronizerFormData = _synchronizer & {
  abi: string;
  event: string;
};

export type SynchronizerBase = {
  latestBlockNumber: number;
  abi: Abi;
};

export type Synchronizer = SynchronizerBase & {
  createdAt: string;
  updatedAt: string;
};

export type AbiInput = {
  indexed: boolean;
  internalType: string;
  name: string;
  type: string;
};

export type Abi = {
  anonymous: boolean;
  inputs: AbiInput[];
  name: string;
  type: string;
};

export type Network =
  | "ethereum"
  | "rinkeby"
  | "polygon"
  | "mumbai"
  | "avalanche"
  | "goerli"
  | "none";

export type CronjobStatus =
  | "idle"
  | "running"
  | "stopping"
  | "stopped"
  | "error"
  | "sync";

export type Cronjob = {
  status: CronjobStatus;
  seconds: number;
};
