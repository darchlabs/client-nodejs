export interface Event {
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
}
