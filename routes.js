"use strict";

const config = require("./config.json");
const env = config.env[process.env.NODE_ENV];
const fs = require("fs");

const app = require("./index.js").app;
const Router = require("koa-router");

const passport = require("koa-passport");
const app_routes = new Router();
const public_routes = new Router();

const styleguide = require("./controllers/styleguide.js");
const customer = require("./controllers/customer.js");

/**
 * PUBLIC ROUTES
 */

// INDEX
public_routes.get("/", function* get() {
	yield this.render("main");
});

// LOGOUT
public_routes.get("/logout", function* get(next) {
	this.logout();
	this.session = null;
	this.redirect("/");
});

// SLACK
public_routes.get("/auth/slack",
	passport.authenticate("slack")
);

public_routes.get("/auth/slack/callback",
	passport.authenticate("slack", {
		successRedirect: "/#/app",
		failureRedirect: "/"
	})
);

// GITHUB
public_routes.get("/auth/github",
	passport.authenticate("github")
);

public_routes.get("/auth/github/callback",
	passport.authenticate("github", {
		successRedirect: "/#/app",
		failureRedirect: "/"
	})
);

// FACEBOOK
public_routes.get("/auth/facebook",
	passport.authenticate("facebook")
);

public_routes.get("/auth/facebook/callback",
	passport.authenticate("facebook", {
		successRedirect: "/#/app",
		failureRedirect: "/"
	})
);

// TWITTER
public_routes.get("/auth/twitter",
	passport.authenticate("twitter")
);

public_routes.get("/auth/twitter/callback",
	passport.authenticate("twitter", {
		successRedirect: "/#/app",
		failureRedirect: "/"
	})
);

app.use(public_routes.middleware());

/**
 * APP ROUTES
 */

app.use(function* auth(next) {
	if (this.isAuthenticated()) {
		yield next;
	} else {
		this.redirect("/");
	}
});

// ROOT
app_routes.get("/app", function* get() {
	yield this.render("main");
});

// STYLE GUIDES
app_routes.get("/app/styleguide/:id", styleguide.get);
app_routes.post("/app/styleguide", styleguide.create);
app_routes.put("/app/styleguide/:id", styleguide.update);

// CUSTOMERS
app_routes.get("/app/customer/:id", customer.get);
app_routes.get("/app/customer", customer.getAll);
app_routes.get("/app/customer/styleguide/:customer_id", customer.getStyleguides);
app_routes.post("/app/customer", customer.create);
app_routes.put("/app/customer/:id", customer.update);

app.use(app_routes.middleware());
