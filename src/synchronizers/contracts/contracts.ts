import { AxiosInstance } from "axios";
import { Options, Pagination } from "../../utils/pagination";
import { ContractsResponse } from "./responses";

import { Contract, type ContractInput } from "./types";

export class ContractClient {
  private _client: AxiosInstance;

  constructor(client: AxiosInstance) {
    this._client = client;
  }

  public setClient(client: AxiosInstance) {
    this._client = client;
  }

  public async createContract(contract: ContractInput): Promise<Contract> {
    const url = `/api/v1/smartcontracts`;
    const { data } = await this._client.post<{ data: Contract, error: string }>(url, { smartcontract: contract });
    // TODO(ca): check status code

    if (data?.error && data?.error !== "") {
      throw new Error(data.error)
    }

    return data?.data;
  }

  public async listContracts(options?: Options): Promise<ContractsResponse> {
    const params: any = {};
    if (options?.limit) params.limit = options.limit;
    if (options?.page) params.page = options.page;
    if (options?.sort) params.sort = options.sort;

    const url = `/api/v1/smartcontracts`;
    const { data } = await this._client.get<{ data: Contract[], meta: { pagination: Pagination } }>(url, { params });
    // TODO(ca): check status code

    return { contracts: data?.data, pagination: data?.meta?.pagination };
  }

  public async deleteContractByAddress(address: string): Promise<void> {
    const url = `/api/v1/smartcontracts/${address}`;
    await this._client.delete<void>(url);
    // TODO(ca): check status code

    return
  }

  public async restartContractByAddress(address: string): Promise<void> {
    const url = `/api/v1/smartcontracts/${address}/restart`;
    await this._client.post<void>(url);
    // TODO(ca): check status code

    return
  }

  public async updateContract(
    address: string,
    data: { name: string; nodeURL: string; webhook: string }
  ): Promise<void> {
    const url = `/api/v1/smartcontracts/${address}`;
    await this._client.patch<void>(url, { smartcontract: data });
    // TODO(ca): check status code

    return
  }
}
