import { ChainIds, Network } from "./network";

export const GetNetworkId = (name: Network): number => {
  return ChainIds[name];
};

export const GetNetworkName = (id: number): Network => {
  for (const network in ChainIds) {
    if (ChainIds[network as Network] === id) {
      return network as Network;
    }
  }

  return undefined;
};
