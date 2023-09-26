import { Network, type Subset } from "../util";

export type JobNetwork = Subset<Network, "ethereum" | "polygon" | "mumbai">;
export const JobNetwoks: JobNetwork[] = ["ethereum", "polygon", "mumbai"];