export type Sort = "asc" | "ASC" | "desc" | "DESC";

export type Pagination = {
  page: number;
  limit: number;
  totalElements: number;
  totalPages: number;
  sort: Sort;
};

export type Options = {
  limit?: number;
  page?: number;
  sort?: Sort;
};