import axios from "axios";
import { Options } from "../util";
import {
  DeleteSmartContractResponse,
  InsertSmartContractResponse,
  ListSmartContractsResponse,
  RestartSmartContractResponse,
} from "./responses";

import type { SmartContractInput } from "./types";

export class SmartContracts {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  public async insertSmartContract(smartcontract: SmartContractInput): Promise<InsertSmartContractResponse> {
    const url = `${this.baseUrl}/api/v1/smartcontracts`;
    const response = await axios.post<InsertSmartContractResponse>(url, { smartcontract });

    return response.data;
  }

  public async listSmartContracts(options?: Options): Promise<ListSmartContractsResponse> {
    const params: any = {};
    if (options?.limit) params.limit = options.limit;
    if (options?.page) params.page = options.page;
    if (options?.sort) params.sort = options.sort;

    const url = `${this.baseUrl}/api/v1/smartcontracts`;
    const response = await axios.get<ListSmartContractsResponse>(url, { params });

    return response.data;
  }

  public async deleteSmartContractByAddress(address: string): Promise<DeleteSmartContractResponse> {
    const url = `${this.baseUrl}/api/v1/smartcontracts/${address}`;
    const response = await axios.delete<DeleteSmartContractResponse>(url);

    return response.data;
  }

  public async restartSmartContractByAddress(address: string): Promise<RestartSmartContractResponse> {
    const url = `${this.baseUrl}/api/v1/smartcontracts/${address}/restart`;
    const response = await axios.post<RestartSmartContractResponse>(url);

    return response.data;
  }
}
