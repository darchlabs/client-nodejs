import axios, { AxiosInstance } from "axios";
import { Options } from "../util";
import {
  DeleteSmartContractResponse,
  UpdateSmartContractResponse,
  InsertSmartContractResponse,
  ListSmartContractsResponse,
  RestartSmartContractResponse,
} from "./responses";

import { type SmartContractInput } from "./types";

export class SmartContracts {
  private client: AxiosInstance;

  constructor(client: AxiosInstance) {
    this.client = client;
  }

  public async insertSmartContract(smartcontract: SmartContractInput): Promise<InsertSmartContractResponse> {
    const url = `/api/v1/smartcontracts`;
    const response = await this.client.post<InsertSmartContractResponse>(url, { smartcontract });

    return response.data;
  }

  public async listSmartContracts(options?: Options): Promise<ListSmartContractsResponse> {
    const params: any = {};
    if (options?.limit) params.limit = options.limit;
    if (options?.page) params.page = options.page;
    if (options?.sort) params.sort = options.sort;

    const url = `/api/v1/smartcontracts`;
    const response = await this.client.get<ListSmartContractsResponse>(url, { params });

    return response.data;
  }

  public async deleteSmartContractByAddress(address: string): Promise<DeleteSmartContractResponse> {
    const url = `/api/v1/smartcontracts/${address}`;
    const response = await this.client.delete<DeleteSmartContractResponse>(url);

    return response.data;
  }

  public async restartSmartContractByAddress(address: string): Promise<RestartSmartContractResponse> {
    const url = `/api/v1/smartcontracts/${address}/restart`;
    const response = await this.client.post<RestartSmartContractResponse>(url);

    return response.data;
  }

  public async updateSmartContract(
    address: string,
    data: { name: string; nodeURL: string; webhook: string }
  ): Promise<UpdateSmartContractResponse> {
    const url = `/api/v1/smartcontracts/${address}`;
    const response = await this.client.patch<UpdateSmartContractResponse>(url, {
      smartcontract: data,
    });

    return response.data;
  }
}
