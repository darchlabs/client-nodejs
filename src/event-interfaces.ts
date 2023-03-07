export interface Event {
  id: string;
  network: string;
  address: string;
  name: string;
  latestBlockNumber: number;
  abi: {
    name: string;
    type: string;
    anonymous: boolean;
    inputs: {
      indexed: boolean;
      internalType: string;
      name: string;
      type: string;
    }[];
  };
  createdAt: string;
  updatedAt: string;
}

export interface EventsResponse {
  data: Event[];
  meta: {
    cronjob: {
      status: string;
      seconds: number;
    };
  };
}

export interface EventDataResponse {
  data: {
    tx: string;
    blockNumber: number;
    data: Record<string, any>;
  };
  meta: {
    id: string;
    network: string;
    address: string;
    latestBlockNumber: number;
    abi: {
      name: string;
      type: string;
      anonymous: boolean;
      inputs: {
        indexed: boolean;
        internalType: string;
        name: string;
        type: string;
      }[];
    };
    createdAt: string;
    updatedAt: string;
  };
}
