"use strict";

const config = require("../config.json");
const r = require("rethinkdb");

let connection;

// EXPORTS //
module.exports = {
	get: get,
	create: create,
	update: update
};

// EXPORT FUNCTIONS //
function get() {
	return this.body = { data: "get"};
}

function create() {
	return this.body = { data: "create"};
}

function update() {
	return this.body = { data: "update"};
}

// END EXPORTS //

// HELPER FUNCTIONS //
function* createConnection() {
	try {
		connection = yield r.connect(config.site.db);
	} catch (err) {
		console.error(err);
	}
}

function* createStyleguide(styleguide) {
	yield createConnection();
	const result = yield r.table("styleguide").insert(styleguide, {returnChanges: true}).run(connection);
	connection.close();
	return result.changes[0].new_val;
}

function* getStyleguide(id) {
	yield createConnection();
	const result = yield r.table("styleguide").get(id).run(connection);
	if (result === null) {
		throw new Error(`Style Guide not found (id: ${id}) | in styleguide.getStyleguide`);
	}
	connection.close();
	return result;
}