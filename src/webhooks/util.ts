import express from "express";
import bodyParser from "body-parser"

import { Webhook } from "./types";

const DEFAULT_CALLBACK = (webhook: Webhook<any>) => {
	console.log("========================")
	console.log(`Webhook at ${Date.now()}`);
	console.log(webhook);
}

export const ListenServer = <T>(port: number = 3000, path: string = "/api/v1/webbook", callback: (webhook: Webhook<T>) => void = DEFAULT_CALLBACK) => {
	// load express
	const app = express();
	const router = express.Router();
	app.use(bodyParser.json())

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