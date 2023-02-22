export interface EventsResponse {
  data: Event[];
  meta: {
    cronjob: {
      status: string;
      seconds: number;
    };
  };
}
