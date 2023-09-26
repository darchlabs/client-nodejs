import { Pagination } from "../util";
import { SmartContract } from "./types";

export type InsertSmartContractResponse = {
  data: SmartContract;
};

export type ListSmartContractsResponse = {
  data: SmartContract[];
  meta: {
    pagination: Pagination;
  };
};

export type DeleteSmartContractResponse = {};
export type RestartSmartContractResponse = {};
export type UpdateSmartContractResponse = {};
