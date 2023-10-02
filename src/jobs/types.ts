import { type Subset } from "../utils";
import { Network } from "../utils/network";

export type JobNetwork = Subset<Network, "ethereum" | "polygon" | "mumbai">;
export const JobNetwoks: JobNetwork[] = ["ethereum", "polygon", "mumbai"];