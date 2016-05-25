"use strict";

const config = require("../config.json");
const _ = require("lodash");
const model = require("../models/customer.js");

// EXPORTS //
module.exports = {
	get: function* _get() {
		const result = yield model.get(this.request, this.params);
		if (result.error === true) {
			return this.body = result;
		}
		return this.body = result;
	},

	getAll: function* _getAll() {
		const result = yield model.getAll(this.request, this.params);
		if (result.error === true) {
			return this.body = result;
		}
		return this.body = result;
	},

	getStyleguides: function* _getStyleguides() {
		const result = yield model.getStyleguides(this.request, this.params);
		if (result.error === true) {
			return this.body = result;
		}
		return this.body = result;
	},

	create: function* _create() {
		const result = yield model.create(this.request, this.params);
		if (result.error === true) {
			return this.body = result;
		}
		return this.body = result;
	},

	update: function* _update() {
		const result = yield model.update(this.request, this.params);
		if (result.error === true) {
			return this.body = result;
		}
		return this.body = result;
	}
};
