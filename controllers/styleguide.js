"use strict";

const config = require("../config.json");

const model = require("../models/styleguide.js");

// EXPORTS //
module.exports = {
	get: _get,
	create: _create,
	update: _update
};

// EXPORT FUNCTIONS //
function* _get() {
	const result = yield model.get(this.request);
	if (result.error === true) {
		return this.body = result;
	}
	return this.body = result;
}

function* _create() {
	const result = yield model.create(this.request);
	if (result.error === true) {
		return this.body = result;
	}
	return this.body = result;
}

function* _update() {
	const result = yield model.update(this.request);
	if (result.error === true) {
		return this.body = result;
	}
	return this.body = result;
}
// END EXPORTS //
