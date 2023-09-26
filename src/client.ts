import { SmartContracts } from "./smartcontracts";
import Axios from "axios";

type Services = "smartcontracts"

type ApiEndpointUrls = {
	[key in Services]: string
}

const DEFAULT_URLS: ApiEndpointUrls = {
	"smartcontracts": "https://synchronizers.darchlabs.com/"
}

export class Darchlabs {
	private token: string;
	private apiEndpoints: ApiEndpointUrls;

	constructor(token: string, ApiEndpointUrls: ApiEndpointUrls = DEFAULT_URLS) {
		this.token = token;
		this.apiEndpoints = ApiEndpointUrls;
	}

	public updateToken(newToken: string) {
		this.token = newToken;
	}

	get contracts(): SmartContracts {
		const client = Axios.create({
			baseURL: this.apiEndpoints.smartcontracts,
			timeout: 1000,
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${this.token}`,
			}
		});

		return new SmartContracts(client);
	}
}