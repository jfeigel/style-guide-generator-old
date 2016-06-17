"use strict";

const config = require("../config.json");
const r = require("rethinkdbdash")(config.site.db);
const co = require("co");

co(function* coWrap() {
	try {
		yield r.dbCreate(config.site.db.db).run();
		console.log(`Database '${config.site.db.db}' created successfully.`);
	} catch (err) {
		console.error(`Warning! ${err}`);
	}

	try {
		yield r.db(config.site.db.db).tableCreate("styleguide").run();
		console.log("Table 'styleguide' created successfully.");
		// create the secondary indexes
		yield r.db(config.site.db.db).table("styleguide").indexCreate("project_name").run();
		console.log("Table 'styleguide' indexes created successfully.");

	} catch (err) {
		console.error(`Warning! ${err}`);
	}

	try {
		yield r.db(config.site.db.db).tableCreate("customer").run();
		console.log("Table 'customer' created successfully.");

	} catch (err) {
		console.error(`Warning! ${err}`);
	}

	try {
		yield r.db(config.site.db.db).tableCreate("user").run();
		console.log("Table 'user' created successfully.");

	} catch (err) {
		console.error(`Warning! ${err}`);
	}

	console.log("\nYou're all set!");
	console.log(`Open http://${config.site.db.host}:8080/#tables to view the database.`);
	process.exit();
}).catch(errorHandler);

function errorHandler(err) {
	console.error("Error occurred!", err);
	throw err;
	process.exit();
}
