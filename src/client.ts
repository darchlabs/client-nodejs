import EventEmitter from "eventemitter3";
import { Syncronizers } from "./synchronizers/synchronizers";
import { Jobs } from "./jobs/jobs";
import Axios, { AxiosInstance } from "axios";

export type Service = "synchronizers" | "jobs" | "nodes";

export type ApiEndpointUrls = {
	[key in Service]: string
}

const DEFAULT_URLS: ApiEndpointUrls = {
	"synchronizers": "https://synchronizers.darchlabs.com/",
	"jobs": "https://jobs.darchlabs.com/",
	"nodes": "https://nodes.darchlabs.com/"
}

export class Darchlabs extends EventEmitter {
	private _apiKey: string;
	private _apiEndpoints: ApiEndpointUrls;
	private _synchronizers: Syncronizers;
	private _jobs: Jobs;

	constructor(apiKey: string = "", ApiEndpointUrls: ApiEndpointUrls = DEFAULT_URLS) {
		super();

		this._apiKey = apiKey;
		this._apiEndpoints = ApiEndpointUrls;

		this._synchronizers = new Syncronizers(this.generateClient(this._apiKey, "synchronizers"))
		this._jobs = new Jobs(this.generateClient(this._apiKey, "jobs"))
	}

	public updateApiKey(apiKey: string) {
		this._apiKey = apiKey;

		this._synchronizers = new Syncronizers(this.generateClient(this._apiKey, "synchronizers"))
		this._jobs = new Jobs(this.generateClient(this._apiKey, "jobs"))
	}

	get synchronizers() {
		return this._synchronizers;
	}

	get jobs() {
		return this._jobs;
	}

	private generateClient(token: string, service: Service): AxiosInstance {
		const clientBase = {
			headers: {
				'Content-Type': 'application/json',
			}
		};

		if (!token || token !== "") {
			clientBase.headers["Authorization"] = `Bearer ${token}`
		}

		return Axios.create({ ...clientBase, baseURL: this._apiEndpoints[service] })
	}
}