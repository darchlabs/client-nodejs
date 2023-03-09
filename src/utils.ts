import type { Abi, AbiInput } from "./types";

export default function parseAbi(inputString: string): Abi {
  const abiObject = JSON.parse(inputString) as any;

  if (
    !Array.isArray(abiObject.inputs) ||
    typeof abiObject.anonymous !== "boolean" ||
    typeof abiObject.name !== "string" ||
    typeof abiObject.type !== "string"
  ) {
    throw new Error("Invalid ABI object");
  }
  const abiInputs = abiObject.inputs.map((inputObject: any) => {
    if (
      typeof inputObject.indexed !== "boolean" ||
      typeof inputObject.name !== "string" ||
      typeof inputObject.type !== "string"
    ) {
      throw new Error("Invalid input object");
    }
    return inputObject as AbiInput;
  });
  return { ...abiObject, inputs: abiInputs } as Abi;
}

export const ChainIds = {
  ethereum: 1,
  goerli: 5,
  polygon: 137,
  mumbai: 80001,
  binance: 56,
  avalanche: 43114,
  fuji: 43113,
  sepolia: 11155111,
};

export function getChainId(name: string) {
  const chains = Object.entries(ChainIds);

  let networkId: number = 0;
  for (let [networkName, id] of chains) {
    if (networkName === name) {
      networkId = id;
    }
  }

  if (networkId !== 0) {
    return networkId;
  }

  throw new Error(`Network id couldn't be found by the name ${name}`);
}
