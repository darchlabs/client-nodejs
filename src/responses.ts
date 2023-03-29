import type { Cronjob, EventData, Pagination, Event } from "./types";

type _eventResponse = {
  data: Event;
};

export type InsertEventResponse = _eventResponse & {};
export type GetEventResponse = _eventResponse & {};

type _eventsResponse = {
  data: Event[];
  meta: {
    cronjob: Cronjob;
    pagination: Pagination;
  };
};

export type ListEventsResponse = _eventsResponse & {};
export type ListEventsByAdressResponse = _eventsResponse & {};

export type ListEventDataResponse<T> = {
  data: EventData<T>[];
  meta: {
    event: Event;
    cronjob: Cronjob;
    pagination: Pagination;
  };
};

type _emptyResponse = {};

export type StopEventResponse = _emptyResponse & {};
export type StartEventResponse = _emptyResponse & {};
export type DeleteEventResponse = _emptyResponse & {};

export type StartCronjobResponse = _emptyResponse & {};
export type StopCronjobResponse = _emptyResponse & {};
export type RestartCronjobResponse = _emptyResponse & {};

export type StatusCronjobResponse = {
  data: Cronjob;
};
