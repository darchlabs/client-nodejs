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
      console.log(this._client)
      // make request and check if response is valid
      const response = await requestPromise;
      console.log("response", response)
      if (!response) {
        console.log("JEJEJEJE por acá")
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

      return data?.data;
    } catch (err) {
      console.log(111)
      if (isAxiosError(err) && err?.response?.data?.error) {
        console.log(222)
        console.log(222)
        console.log(222)
        console.log(222)
        throw new Error(err.response.data.error);
      }

      console.log(333)
      console.log(333)
      console.log(333)
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