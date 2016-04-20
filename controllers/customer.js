"use strict";

const config = require("../config.json");
const _ = require("lodash");
const model = require("../models/customer.js");

// EXPORTS //
module.exports = {
	get: _get,
	getAll: _getAll,
	getStyleguides: _getStyleguides,
	create: _create,
	update: _update
};

// EXPORT FUNCTIONS //
function* _get() {
	const result = yield model.get(this.request, this.params);
	if (result.error === true) {
		return this.body = result;
	}
	return this.body = result;
}

function* _getAll() {
	const result = yield model.getAll(this.request, this.params);
	if (result.error === true) {
		return this.body = result;
	}
	return this.body = result;
}

function* _getStyleguides() {
	const result = yield model.getStyleguides(this.request, this.params);
	if (result.error === true) {
		return this.body = result;
	}
	return this.body = result;
}

function* _create() {
	const result = yield model.create(this.request, this.params);
	if (result.error === true) {
		return this.body = result;
	}
	return this.body = result;
}

function* _update() {
	const result = yield model.update(this.request, this.params);
	if (result.error === true) {
		return this.body = result;
	}
	return this.body = result;
}
// END EXPORTS //
