import { type Subset } from "../utils";
import { Network } from "../utils/network";

export type JobsNetwork = Subset<Network, "ethereum" | "polygon" | "mumbai">;
export const JobsNetwoks: JobsNetwork[] = ["ethereum", "polygon", "mumbai"];

export type JobStatus = "idle" | "running" | "stopped" | "autoStopped" | "error";

export type Job = {
  id: string;
  name: string;
  providerId: string;
  status: JobStatus;
  network: Network;
  address: string;
  abi: string;
  nodeUrl: string;
  privateKey: string;
  type: string;
  cronjob: string;
  checkMethod: string;
  actionMethod: string;
  createdAt: string;
  updatedAt: string;
  logs: string[];
};

export type Provider = {
  id: string;
  name: string;
  networks: Network[];
};

export type JobInput = {
  name: string;
  providerId: string;
  network: Network;
  address: string;
  nodeUrl: string;
  privateKey: string;
  abi: string;
  type: "cronjob";
  cronjob: string;
  checkMethod: string;
  actionMethod: string;
};
