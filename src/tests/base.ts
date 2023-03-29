import { EventInput } from "../types";

export const baseAddress = "0xc13530546feA5fC787A2d126bB39bDeC20C4cc9e";

export const baseEventInput: EventInput = {
  network: "polygon",
  nodeURL: "https://polygon-mumbai.g.alchemy.com/v2/_fQt29PoLS69dpof_XX_P6ziiJY7-U4I",
  abi: {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "userAddr",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount1",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "num",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "string",
        name: "lala",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "lala2",
        type: "string",
      },
    ],
    name: "Example",
    type: "event",
  },
};

export type baseEventDataExample = {
  num: number;
  lala: string;
  lala2: string;
  amount: number;
  amount1: number;
  userAddr: string;
};

export const baseEventStatuses = ["synching", "running", "stopped", "error"];

export const Sleep = (ms: number): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
};
