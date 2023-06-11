import { Subset, type Network } from "../util";
import { NetworkEnvironment } from "./network";

// define node statuses
export type NodeStatus = "running" | "error";

// define [networks,environment] for blockchains
export type NodesEthereumNE = Subset<NetworkEnvironment, ["ethereum", "mainnet"]>;
export type NodesCeloNE = Subset<NetworkEnvironment, ["celo", "mainnet"] | ["celo", "alfajores"]>;
export type NodesChainlinkNE = Subset<NetworkEnvironment, ["chainlink", "mainnet"] | ["chainlink", "sepolia"]>;
export type NodesNetworkEnvironment = NodesEthereumNE | NodesCeloNE | NodesChainlinkNE;

// define celo blockchain implementation
export type NodesCeloConfig<NE extends NodesNetworkEnvironment> = {
  ENVIRONMENT: NE[1];
  PASSWORD: string;
};

// define celo blockchain environment implementation
export type NodesEthereumConfig<NE extends NodesNetworkEnvironment> = {
  ENVIRONMENT: NE[1];
  HOST: string;
  NETWORK_URL: string;
  BASE_CHAIN_DATA_PATH: string;
  RPC_PORT: string;
  FROM_BLOCK_NUMBER: string;
};

// define chainlink blockchain implemtation
export type NodesChainlinkConfig<NE extends NodesNetworkEnvironment> = {
  ENVIRONMENT: NE[1];
  ETH_URL: string;
  PASSWORD: string;
  NODE_EMAIL: string;
  NODE_EMAIL_PWD: string;
};

// define node config and input type
export type NodesConfig<NE extends NodesNetworkEnvironment> = NE extends NodesCeloNE
  ? NodesCeloConfig<NE>
  : NE extends NodesEthereumNE
  ? NodesEthereumConfig<NE>
  : NE extends NodesChainlinkNE
  ? NodesChainlinkConfig<NE>
  : never;

export type NodeInput<NE extends NodesNetworkEnvironment> = {
  network: NE[0];
  envVars: NodesConfig<NE>;
};

// define node type used in api responses
export type Node<NE extends NodesNetworkEnvironment> = {
  id: string;
  name: string;
  network: NE[0];
  environment: NE[1];
  port: number;
  status: NodeStatus;
  artifacts: {
    Deployments: string[];
    Pods: string[];
    Services: string[];
  };
  createdAt: string;
};
