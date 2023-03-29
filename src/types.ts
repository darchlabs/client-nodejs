export type Network = "ethereum" | "rinkeby" | "polygon" | "mumbai" | "avalanche" | "goerli" | "none";
export type CronjobStatus = "idle" | "running" | "stopping" | "stopped" | "error";
export type EventStatus = "synching" | "running" | "stopped" | "error";
export type Sort = "asc" | "ASC" | "desc" | "DESC";

export type Input = {
  id?: string;
  indexed: boolean;
  internalType: string;
  name: string;
  type: string;
};

export type Abi = {
  id?: string;
  name: string;
  type: string;
  anonymous: boolean;
  inputs: Input[];
};

export type Event = {
  id: string;
  network: Network;
  address: string;
  latestBlockNumber: number;
  nodeURL: string;
  status: EventStatus;
  error: string;
  abi: Abi;
  createdAt: string;
  updatedAt: string;
};

export type EventInput = {
  network: Network;
  nodeURL: string;
  abi: Abi;
};

export type Cronjob = {
  status: CronjobStatus;
  seconds: number;
  error: string;
};

export type Pagination = {
  page: number;
  limit: number;
  totalElements: number;
  totalPages: number;
  sort: Sort;
};

export type EventData<T> = {
  id: string;
  eventId: string;
  tx: string;
  blockNumber: string;
  data: T;
  createdAt: string;
};

export type Options = {
  limit?: number;
  page?: number;
  sort?: Sort;
};
