"use strict";

const config = require("../config.json");

const r = require("rethinkdb");
const moment = require("moment");

// let connection;

// EXPORTS //
module.exports = {
	get: function* _get(req, params) {
		return yield getStyleguide(params.id);
	},

	create: function* _create(req, params) {
		return yield createStyleguide(req.body);
	},

	update: function* _update(req, params) {
		return yield updateStyleguide(params.id, req.body);
	}
};

// HELPER FUNCTIONS //
function* createConnection() {
	try {
		return yield r.connect(config.site.db);
	} catch (err) {
		console.error(err);
	}
}

function* getStyleguide(id) {
	const connection = yield createConnection();
	const result = yield r.table("styleguide").get(id).run(connection);
	if (result === null) {
		throw new Error(`Style Guide not found (id: ${id}) | in styleguide.getStyleguide`);
	}
	connection.close();
	return result;
}

function* createStyleguide(styleguide) {
	const connection = yield createConnection();
	styleguide.timestamp = moment().valueOf();
	const result = yield r.table("styleguide").insert(styleguide, {returnChanges: true}).run(connection);
	connection.close();
	return result.changes[0].new_val;
}

function* updateStyleguide(id, styleguide) {
	const connection = yield createConnection();
	const result = yield r.table("styleguide").get(id).update(styleguide).run(connection);
	if (result === null) {
		throw new Error(`Error updating Style Guide (id: ${id}) | styleguide.updateStyleguide`);
	}
	connection.close();
	return result;
}
// END HELPER FUNCTIONS //
