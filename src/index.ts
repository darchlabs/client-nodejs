import { SynchronizersAPI } from "./synchronizers-api";

export default function getClient(apiUrl: string): SynchronizersAPI {
  const client = new SynchronizersAPI("https://example.com");
  return client;
}
