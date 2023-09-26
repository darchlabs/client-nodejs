export type WebhookPayload<T> = {
	id: string;
	name: string;
	block_number: number;
	tx: string;
	data: T;
}

export type Webhook<T> = {
	id: string;
	type: string;
	endpoint: string;
	payload: WebhookPayload<T>;
	created_at: string;
}
