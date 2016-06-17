"use strict";

const config = require("../config.json");

const r = require("rethinkdbdash")(config.site.db);
const moment = require("moment");

// EXPORTS //
module.exports = {
	get: function* _get(id) {
		return yield getStyleguide(id);
	},

	create: function* _create(styleguide) {
		return yield createStyleguide(styleguide);
	},

	update: function* _update(id, styleguide) {
		return yield updateStyleguide(id, styleguide);
	}
};

// HELPER FUNCTIONS //
function* getStyleguide(id) {
	const result = yield r.table("styleguide").get(id).run();
	if (result === null) {
		throw new Error(`Style Guide not found (id: ${id}) | in styleguide.getStyleguide`);
	}
	return result;
}

function* createStyleguide(styleguide) {
	styleguide.timestamp = moment().valueOf();
	const result = yield r.table("styleguide").insert(styleguide, {returnChanges: true}).run();
	return result.changes[0].new_val;
}

function* updateStyleguide(id, styleguide) {
	const result = yield r.table("styleguide").get(id).update(styleguide).run();
	if (result === null) {
		throw new Error(`Error updating Style Guide (id: ${id}) | styleguide.updateStyleguide`);
	}
	return result;
}
// END HELPER FUNCTIONS //
