import Synchronizer from "./synchronizer";

let synchronizer: Synchronizer;

declare global {
  var __synchronizer__: Synchronizer;
}

function getClient(apiUrl: string) {
  const client = new Synchronizer(apiUrl);
  return client;
}

export { synchronizer };
