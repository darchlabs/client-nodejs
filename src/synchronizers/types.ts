import { Subset } from "../utils";
import { Network } from "../utils/network";

export type SynchronizersNetwork = Subset<Network, "ethereum" | "polygon" | "mumbai">;
export const SynchronizersNetwoks: SynchronizersNetwork[] = ["ethereum", "polygon", "mumbai"];