"use strict";

const config = require("../config.json");

const r = require("rethinkdb");
const moment = require("moment");

let connection;

// EXPORTS //
module.exports = {
	get: _get,
	create: _create,
	update: _update
};

// EXPORT FUNCTIONS //
function* _get(req) {
	return yield getStyleguide(req.params.id);
}

function* _create(req) {
	return yield createStyleguide(req.body);
}

function* _update(req) {
	return yield updateStyleguide(req.params.id, req.body);
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

function* getStyleguide(id) {
	yield createConnection();
	const result = yield r.table("styleguide").get(id).run(connection);
	if (result === null) {
		throw new Error(`Style Guide not found (id: ${id}) | in styleguide.getStyleguide`);
	}
	connection.close();
	return result;
}

function* createStyleguide(styleguide) {
	yield createConnection();
	styleguide.timestamp = moment().valueOf();
	const result = yield r.table("styleguide").insert(styleguide, {returnChanges: true}).run(connection);
	connection.close();
	return result.changes[0].new_val;
}

function* updateStyleguide(id, styleguide) {
	yield createConnection();
	const result = yield r.table("styleguide").get(id).update(styleguide).run(connection);
	if (result === null) {
		throw new Error(`Error updating Style Guide (id: ${id}) | styleguide.updateStyleguide`);
	}
	connection.close();
	return result;
}
// END HELPER FUNCTIONS //
