"use strict";

const config = require("./config.json");
const env = config.env[process.env.NODE_ENV];

const serve = require("koa-static-folder");
const bodyParser = require("koa-bodyparser");
const hbs = require("koa-hbs");

const session = require("koa-generic-session");
const RethinkSession = require("koa-generic-session-rethinkdb");
const r = require("rethinkdbdash")(config.site.db);
const passport = require("koa-passport");

const co = require("co");
const Koa = require("koa");

co(function* coWrapper() {
	require("./auth");

	const sessionStore = new RethinkSession({connection: r});
	yield sessionStore.setup();

	const app = new Koa();

	exports.app = app;

	app.proxy = true;

	app.use(bodyParser());

	app.keys = config.site.keys;

	app.use(session({
		store: sessionStore
	}));

	app.use(passport.initialize());
	app.use(passport.session());

	// statically serve assets
	app.use(serve("./assets"));

	app.use(hbs.middleware({
		viewPath: `${__dirname}/views`,
		layoutsPath: `${__dirname}/views/layouts`,
		partialsPath: `${__dirname}/views/partials`,
		defaultLayout: "main"
	}));

	app.use(function* appUse(next) {
		try {
			yield next;
		} catch (err) {
			if (this.state.api === true) {
				// if this was an API request, send the error back in a plain response
				this.app.emit("error", err, this);
				this.body = {error: true, message: String(err)};
			} else {
				// this wasn"t an API request, show the error page
				this.app.emit("error", err, this);
				yield this.render("error", {
					dump: err
				});
			}
		}
	});

	require("./routes");

	console.log(`${config.site.name} is now listening on port ${config.site.port}`);
	app.listen(config.site.port);

	if (process.env.NODE_ENV === "local") {
		// react stuff
		const webpack = require("webpack");
		const webpackConfig = require("./webpack.config.js");
		const WebpackDevServer = require("webpack-dev-server");

		// WEBPACK DEV SERVER
		new WebpackDevServer(webpack(webpackConfig), {
			"hot": true,
			"historyApiFallback": true,
			proxy: {
				"*": `http://localhost:${config.site.port}`
			},
			stats: "errors-only"
		}).listen(config.site.port + 1, "localhost", function webpackDevServer(err, result) {
			if (err) {
				console.error(err);
			}
			console.log(`Webpack Dev Server (Hot-Reload) listening on port ${config.site.port + 1}`);
		});
	}

	process.on("SIGINT", function end() {
		process.exit();
	});
});
