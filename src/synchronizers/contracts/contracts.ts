import { AxiosInstance, AxiosResponse, isAxiosError } from "axios";
import { Options, Pagination } from "../../utils/pagination";
import { ContractsResponse } from "./responses";
import { Contract, ContractInput } from "./types";

export class ContractClient {
  private _client: AxiosInstance;

  constructor(client: AxiosInstance) {
    this._client = client;
  }

  public setClient(client: AxiosInstance) {
    this._client = client;
  }

  private async handleRequest<T>(
    requestPromise: Promise<AxiosResponse<{ data?: T, meta?: any, error?: string }>>
  ): Promise<{ data: T; meta: any }> {
    try {
      // make request and check if response is valid
      const response = await requestPromise;
      if (!response) {
        throw new Error("Error: Server did not respond, please try again later.");
      }

      // get data and status code from response
      const { status, data } = response;
      if (status !== 200 && status !== 201) {
        if (data?.error) {
          throw new Error(data.error);
        }
        throw new Error(`Error: Received status code ${status}`);
      }

      return { data: data?.data, meta: data?.meta };
    } catch (err) {
      if (isAxiosError(err) && err?.response?.data?.error) {
        throw new Error(err.response.data.error);
      }

      throw err;
    }
  }

  public async createContract(contract: ContractInput): Promise<Contract> {
    const url = `/api/v1/smartcontracts`;
    const response = await this.handleRequest(this._client.post<{ data: Contract, error?: string }>(url, { smartcontract: contract }));
    return response.data;
  }

  public async listContracts(options?: Options): Promise<ContractsResponse> {
    const params: any = {};
    if (options?.limit) params.limit = options.limit;
    if (options?.page) params.page = options.page;
    if (options?.sort) params.sort = options.sort;

    const url = `/api/v1/smartcontracts`;
    const response = await this.handleRequest(
      this._client.get<{ data: Contract[], meta: { pagination: Pagination }, error?: string }>(url, { params })
    );

    return { contracts: response.data, pagination: response.meta?.pagination };
  }

  public async deleteContractByAddress(address: string): Promise<void> {
    const url = `/api/v1/smartcontracts/${address}`;
    await this.handleRequest(this._client.delete<{ error?: string }>(url));
  }

  public async restartContractByAddress(address: string): Promise<void> {
    const url = `/api/v1/smartcontracts/${address}/restart`;
    await this.handleRequest(this._client.post<{ error?: string }>(url));
  }

  public async updateContract(
    address: string,
    input: { name: string; nodeURL: string; webhook: string }
  ): Promise<void> {
    const url = `/api/v1/smartcontracts/${address}`;
    await this.handleRequest(this._client.patch<{ error?: string }>(url, { smartcontract: input }));
  }
}
