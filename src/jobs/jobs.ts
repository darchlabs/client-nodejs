import { AxiosInstance, AxiosResponse, isAxiosError } from "axios";
import { JobInput, Job } from "./types";

export class Jobs {
  private _client: AxiosInstance;

  constructor(client: AxiosInstance) {
    this._client = client;
  }

  public setClient(client: AxiosInstance) {
    this._client = client;
  }

  private async handleRequest<T>(requestPromise: Promise<AxiosResponse<{ data?: T, error?: string }>>): Promise<T> {
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

      return data?.data!;
    } catch (err) {
      if (isAxiosError(err) && err?.response?.data?.error) {
        throw new Error(err.response.data.error);
      }
      throw err;
    }
  }

  public async createJob(job: JobInput): Promise<Job> {
    const url = `/api/v1/jobs`;
    return await this.handleRequest(this._client.post<{ data: Job, error?: string }>(url, { job }));
  }

  public async listJobs(): Promise<Job[]> {
    const url = `/api/v1/jobs`;
    return await this.handleRequest(this._client.get<{ data: Job[], error?: string }>(url));
  }

  public async startJob(id: string): Promise<void> {
    const url = `/api/v1/jobs/${id}/start`;
    await this.handleRequest(this._client.post<{ error?: string }>(url));
  }

  public async stopJob(id: string): Promise<void> {
    const url = `/api/v1/jobs/${id}/stop`;
    await this.handleRequest(this._client.post<{ error?: string }>(url));
  }

  public async deleteJob(id: string): Promise<void> {
    const url = `/api/v1/jobs/${id}`;
    await this.handleRequest(this._client.delete<{ error?: string }>(url));
  }
}