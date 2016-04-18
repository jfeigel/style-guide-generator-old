"use strict";

const config = require("./config.json");
const env = config.env[process.env.NODE_ENV];
const fs = require("fs");

const app = require("./index.js").app;
const Router = require("koa-router");

const routes = new Router();

const styleguide = require("./controllers/styleguide.js");

function renderFile(src) {
	return new Promise(function renderPromise(resolve, reject) {
		fs.readFile(src, {"encoding": "utf8"}, function readFileOutput(err, data) {
			if (err) return reject(err);
			resolve(data);
		});
	});
}

// routes
routes.get("/", function* get() {
	this.body = yield renderFile(`${__dirname}/${env.views_dir}/index.html`);
});

routes.get("/styleguide/:customer", styleguide.get);
routes.post("/styleguide/:customer", styleguide.create);
routes.put("/styleguide/:customer", styleguide.update);

app.use(routes.middleware());
