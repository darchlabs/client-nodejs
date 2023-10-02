import { Pagination } from "../../utils/pagination";
import type { EventData, Event } from "./types";

export type EventsResponse = {
  events: Event[];
  pagination: Pagination;
};

export type EventDatasResponse<T> = {
  datas: EventData<T>[];
  event: Event;
  pagination: Pagination;
};
