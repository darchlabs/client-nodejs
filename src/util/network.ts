export type Network = "ethereum" | "rinkeby" | "goerli" | "polygon" | "mumbai";
export type NetworkType = "evm" | "solana";

export const ChainIds: { [key in Network]: number } = {
  ethereum: 1,
  rinkeby: 4,
  goerli: 5,
  polygon: 137,
  mumbai: 80001,
};

export type Token = "ETH" | "MATIC";

export const Networks: Network[] = ["ethereum", "rinkeby", "goerli", "polygon", "mumbai"];
export const NetworkInfo: {
  [key in Network]: {
    mainnet: boolean;
    baseNetwork: Network;
    type: NetworkType;
    token: Token;
  };
} = {
  ethereum: {
    mainnet: true,
    baseNetwork: "ethereum",
    type: "evm",
    token: "ETH",
  },
  rinkeby: {
    mainnet: false,
    baseNetwork: "ethereum",
    type: "evm",
    token: "ETH",
  },
  polygon: {
    mainnet: true,
    baseNetwork: "polygon",
    type: "evm",
    token: "MATIC",
  },
  mumbai: {
    mainnet: false,
    baseNetwork: "polygon",
    type: "evm",
    token: "MATIC",
  },
  goerli: {
    mainnet: false,
    baseNetwork: "ethereum",
    type: "evm",
    token: "ETH",
  },
};
