"use strict";

const config = require("../config.json");

const r = require("rethinkdbdash")(config.site.db);
const moment = require("moment");

// EXPORTS //
module.exports = {
	get: function* _get(id) {
		return yield getUser(id);
	},

	create: function* _create(user) {
		return yield createUser(user);
	},

	update: function* _update(id, user) {
		return yield updateUser(id, user);
	}
};

// HELPER FUNCTIONS //
function* getUser(id) {
	const result = yield r.table("user").get(id).run();
	// if (result === null) {
	// 	throw new Error(`User not found (id: ${id}) | in user.getUser`);
	// }
	return result;
}

function* createUser(user) {
	user.createdAt = r.now();
	const result = yield r.table("user").insert(user, {returnChanges: true}).run();
	return result.changes[0].new_val;
}

function* updateUser(id, user) {
	const result = yield r.table("user").get(id).update(user).run();
	if (result === null) {
		throw new Error(`Error updating User (id: ${id}) | user.updateUser`);
	}
	return result;
}
// END HELPER FUNCTIONS //
