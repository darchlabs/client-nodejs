export const Networks = [
  "ethereum",
  "rinkeby",
  "goerli",
  "sepolia",
  "polygon",
  "mumbai",
  "celo",
  "alfajores",
  "chainlink",
  "chainlink_sepolia",
] as const;
export type Network = (typeof Networks)[number];

export const NetworkType = ["evm", "solana"] as const;
export type NetworkType = (typeof NetworkType)[number];

export const ChainIds: { [key in Network]: number } = {
  ethereum: 1,
  rinkeby: 4,
  goerli: 5,
  sepolia: 11155111,
  polygon: 137,
  mumbai: 80001,
  celo: 42220,
  alfajores: 44787,
  chainlink: 1,
  chainlink_sepolia: 11155111,
};

export const Tokens = ["ETH", "MATIC", "CELO", "LINK"] as const;
export type Token = (typeof Tokens)[number];

export type Info = {
  name: string;
  mainnet: boolean;
  baseNetwork: Network;
  type: NetworkType;
  token: Token;
};

export const NetworkInfo: {
  [key in Network]: Info;
} = {
  ethereum: {
    name: "Ethereum",
    mainnet: true,
    baseNetwork: "ethereum",
    type: "evm",
    token: "ETH",
  },
  rinkeby: {
    name: "Ethereum Rinkeby",
    mainnet: false,
    baseNetwork: "ethereum",
    type: "evm",
    token: "ETH",
  },
  goerli: {
    name: "Goerli",
    mainnet: false,
    baseNetwork: "ethereum",
    type: "evm",
    token: "ETH",
  },
  sepolia: {
    name: "Ethereum Sepolia",
    mainnet: false,
    baseNetwork: "ethereum",
    type: "evm",
    token: "ETH",
  },
  polygon: {
    name: "Polygon",
    mainnet: true,
    baseNetwork: "polygon",
    type: "evm",
    token: "MATIC",
  },
  mumbai: {
    name: "Polygon Mumbai",
    mainnet: false,
    baseNetwork: "polygon",
    type: "evm",
    token: "MATIC",
  },
  celo: {
    name: "Celo",
    mainnet: true,
    baseNetwork: "celo",
    type: "evm",
    token: "CELO",
  },
  alfajores: {
    name: "Celo Alfajores",
    mainnet: false,
    baseNetwork: "celo",
    type: "evm",
    token: "CELO",
  },
  chainlink: {
    name: "Chainlink",
    mainnet: true,
    baseNetwork: "chainlink",
    type: "evm",
    token: "LINK",
  },
  chainlink_sepolia: {
    name: "Chainlink Sepolia",
    mainnet: false,
    baseNetwork: "chainlink",
    type: "evm",
    token: "LINK",
  },
};
