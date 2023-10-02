type Id = {
  id?: string;
};

export type Input = Id & {
  name: string;
  type: string;
  internalType?: string;
  indexed?: boolean;
  components?: Input[];
};

export type Output = Id & {
  name: string;
  type: string;
  internalType?: string;
  components?: Output[];
};

export type FunctionAbi = Id & {
  type: "function";
  name: string;
  inputs?: Input[];
  outputs?: Output[];
  stateMutability: "pure" | "view" | "nonpayable" | "payable";
  payable?: boolean;
  constant?: boolean;
  internalType?: string;
  signature?: string;
};

export type EventAbi = Id & {
  type: "event";
  name: string;
  inputs: Input[];
  anonymous?: boolean;
};

export type ConstructorAbi = Id & {
  type: "constructor";
  inputs: Input[];
  stateMutability: "nonpayable" | "payable";
  payable?: boolean;
};

export type FallbackAbi = Id & {
  type: "fallback";
  stateMutability: "nonpayable" | "payable";
  payable?: boolean;
};

export type ReceiveAbi = Id & {
  type: "receive";
  stateMutability: "nonpayable" | "payable";
  payable?: boolean;
};

export type Abi = FunctionAbi | EventAbi | ConstructorAbi | FallbackAbi | ReceiveAbi;
