import { Pagination } from "../../utils/pagination";
import { Contract } from "./types";

export type ContractsResponse = {
  contracts: Contract[];
  pagination: Pagination;
};

