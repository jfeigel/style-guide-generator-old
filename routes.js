"use strict";

const config = require("./config.json");
const env = config.env[process.env.NODE_ENV];
const fs = require("fs");

const app = require("./index.js").app;
const Router = require("koa-router");

const routes = new Router();

const styleguide = require("./controllers/styleguide.js");
const customer = require("./controllers/customer.js");

function renderFile(src) {
	return new Promise(function renderPromise(resolve, reject) {
		fs.readFile(src, {"encoding": "utf8"}, function readFileOutput(err, data) {
			if (err) return reject(err);
			resolve(data);
		});
	});
}

// ROOT
routes.get("/", function* get() {
	this.body = yield renderFile(`${__dirname}/${env.views_dir}/index.html`);
});

// STYLE GUIDES
routes.get("/styleguide/:id", styleguide.get);
routes.post("/styleguide", styleguide.create);
routes.put("/styleguide/:id", styleguide.update);

// CUSTOMERS
routes.get("/customer/:id", customer.get);
routes.get("/customer", customer.getAll);
routes.get("/customer/styleguide/:customer_id", customer.getStyleguides);
routes.post("/customer", customer.create);
routes.put("/customer/:id", customer.update);

app.use(routes.middleware());
