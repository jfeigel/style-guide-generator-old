"use strict";

const config = require("../config.json");
const r = require("rethinkdb");
const co = require("co");

co(function* coWrap() {
	const connection = yield r.connect(config.site.db);

	try {
		yield r.dbCreate(config.site.db.db).run(connection);
		console.log(`Database '${config.site.db.db}' created successfully.`);
	} catch (err) {
		console.error(`Warning! ${err}`);
	}

	try {
		yield r.db(config.site.db.db).tableCreate("styleguide").run(connection);
		console.log("Table 'styleguide' created successfully.");
		// create the secondary indexes
		yield r.db(config.site.db.db).table("styleguide").indexCreate("project_name").run(connection);
		console.log("Table 'styleguide' indexes created successfully.");

	} catch (err) {
		console.error(`Warning! ${err}`);
	}

	yield connection.close();
	console.log("\nYou're all set!");
	console.log(`Open http://${config.site.db.host}:8080/#tables to view the database.`);
	process.exit();
}).catch(errorHandler);

function errorHandler(err) {
	console.error("Error occurred!", err);
	throw err;
	process.exit();
}
