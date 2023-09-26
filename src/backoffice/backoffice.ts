import axios from "axios";
import { CreateApiKeyResponse, LoginResponse, SignupResponse } from "./responses";

export class Backoffice {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  public async login(email: string, password: string): Promise<LoginResponse> {
    const url = `${this.baseUrl}/api/v1/users/login`;
    const { data: { token }, status } = await axios.post(url, { email, password });
    if (status != 201) {
      throw new Error("Invalid email or password")
    }

    return { token };
  }

  public async signup(email: string, name: string, password: string): Promise<SignupResponse> {
    const url = `${this.baseUrl}/api/v1/users/signup`;
    const { status } = await axios.post(url, { email, name, password });
    if (status != 201) {
      throw new Error("Invalid email, name or password")
    }

    return {}
  }

  public async createApiKey(days: number, token: string): Promise<CreateApiKeyResponse> {
    const url = `${this.baseUrl}/api/v1/users/api-key`
    const { data: {api_key}, status } = await axios.post(url, {days_interval: days}, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
    if (status != 201) {
      throw new Error("Invalid day interval")
    }

    return {apiKey: api_key}
  }
}
