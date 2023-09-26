import axios from "axios";
import { NodesConfig, type Node, type NodesNetworkEnvironment, NodeInput } from "./types";
import { DeleteNodeResponse, InsertNodeResponse, ListNodesResponse } from "./responses";

export class Nodes {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  public async insertNode<NE extends NodesNetworkEnvironment>(
    input: NodeInput<NodesNetworkEnvironment>
  ): Promise<InsertNodeResponse<NE>> {
    const url = `${this.baseUrl}/api/v2/nodes`;
    const { data } = await axios.post<Node<NE>>(url, input);
    return { data };
  }

  public async listNodes(): Promise<ListNodesResponse> {
    const url = `${this.baseUrl}/api/v2/nodes`;
    const {
      data: { nodes },
    } = await axios.get<{ nodes: Node<NodesNetworkEnvironment>[] }>(url);
    return { data: nodes } as ListNodesResponse;
  }

  public async deleteNodeById(id: string): Promise<DeleteNodeResponse> {
    const url = `${this.baseUrl}/api/v2/nodes`;
    await axios.delete(url, { data: { id } });
    return {};
  }
}
