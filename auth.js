"use strict";

const config = require("./config.json");

const co = require("co");

const passport = require("koa-passport");
const GithubStrategy = require("passport-github2").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const TwitterStrategy = require("passport-twitter").Strategy;

const userModel = require("./models/user");

passport.serializeUser((user, done) => {
	done(null, user);
});

passport.deserializeUser((obj, done) => {
	done(null, obj);
});

passport.use(new GithubStrategy({
	clientID: config.passport.github.client_id,
	clientSecret: config.passport.github.client_secret,
	callbackURL: `http://localhost:${(Number(process.env.PORT) + 1) || 3000}/auth/github/callback`
}, (token, tokenSecret, profile, done) => {
	co(function* coWrapper() {
		const formattedProfile = {
			id: profile.id,
			username: profile.username,
			name: profile.displayName
		};

		let user = yield userModel.get(formattedProfile.id);
		if (user === null) {
			user = yield userModel.create(formattedProfile);
		}
		done(null, user);
	}).catch(function onError(e) {
		console.error(`Error creating User (id: ${profile.id}) | auth.GithubStrategy`);
		console.error(e.stack);
		done(e, null);
	});
}));

passport.use(new FacebookStrategy({
	clientID: config.passport.facebook.client_id,
	clientSecret: config.passport.facebook.client_secret,
	callbackURL: `http://localhost:${(Number(process.env.PORT) + 1) || 3000}/auth/facebook/callback`
}, (token, tokenSecret, profile, done) => {
	// retrieve user ...
	done(null, user);
}));

passport.use(new TwitterStrategy({
	consumerKey: config.passport.twitter.consumer_key,
	consumerSecret: config.passport.twitter.consumer_secret,
	callbackURL: `http://localhost:${(Number(process.env.PORT) + 1) || 3000}/auth/twitter/callback`
}, (token, tokenSecret, profile, done) => {
	// retrieve user ...
	done(null, user);
}));
