import { Node, NodesNetworkEnvironment } from "./types";

export type InsertNodeResponse<NE extends NodesNetworkEnvironment> = {
  data: Node<NE>;
};

export type ListNodesResponse = {
  data: Node<NodesNetworkEnvironment>[];
};

export type DeleteNodeResponse = {};
