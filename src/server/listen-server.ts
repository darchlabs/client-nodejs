import { Webhook } from "../webhooks/types";

const DEFAULT_CALLBACK = (webhook: Webhook<any>) => {
	console.log("========================")
	console.log(`Webhook at ${Date.now()}`);
	console.log(webhook);
}

export const ListenServer = async <T>(port: number = 3000, path: string = "/api/v1/webbook", callback: (webhook: Webhook<T>) => void = DEFAULT_CALLBACK) => {
	// load dependencies
	const express = await import("express");
	const bodyParser = await import("body-parser")

	const app = express.default()
	app.use(bodyParser.json())
	const router = express.Router();

	// define router
	router.post(path, (req, res) => {
		callback(req.body)
		res.status(200).send();
	});
	app.use(router);

	// run server
	app.listen(port, () => {
		console.log(`Listening on port ${port}`);
	});
}