import { Syncronizer } from "./synchronizers/synchronizers";
import Axios from "axios";

type Services = "synchronizers" | "jobs" | "nodes";

type ApiEndpointUrls = {
	[key in Services]: string
}

const DEFAULT_URLS: ApiEndpointUrls = {
	"synchronizers": "https://synchronizers.darchlabs.com/",
	"jobs": "https://jobs.darchlabs.com/",
	"nodes": "https://nodes.darchlabs.com/"
}

export class Darchlabs {
	private apiKey: string;
	private _apiEndpoints: ApiEndpointUrls;
	private _synchronizers: Syncronizer;

	constructor(apiKey: string = "", ApiEndpointUrls: ApiEndpointUrls = DEFAULT_URLS) {
		this.apiKey = apiKey;
		this._apiEndpoints = ApiEndpointUrls;

		const clientBase = {
			headers: {
				'Content-Type': 'application/json',
			}
		};

		if (!apiKey || apiKey !== "") {
			clientBase.headers["Authorization"] = `Bearer ${this.apiKey}`
		}

		this._synchronizers = new Syncronizer(Axios.create({ ...clientBase, baseURL: this._apiEndpoints.synchronizers }))
	}

	public updateApiKey(apiKey: string) {
		this.apiKey = apiKey;

		// define new client
		const clientBase = {
			headers: {
				'Content-Type': 'application/json',
			}
		};

		if (!apiKey || apiKey !== "") {
			clientBase.headers["Authorization"] = `Bearer ${this.apiKey}`
		}

		this._synchronizers.setClient(Axios.create({ ...clientBase, baseURL: this._apiEndpoints.synchronizers }))
	}

	get synchronizers() {
		return this._synchronizers;
	}
}