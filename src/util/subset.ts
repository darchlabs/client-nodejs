export type Subset<T, U> = T extends U ? T : never;

// export type NodesNetwork = Subset<Network, "celo" | "ethereum" | "chainlink">;
