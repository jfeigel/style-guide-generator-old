"use strict";

const config = require("../config.json");
const _ = require("lodash");
const model = require("../models/customer.js");

// EXPORTS //
module.exports = {
	get: function* _get() {
		const result = yield model.get(this.params.id);
		if (result.error === true) {
			return this.body = result;
		}
		return this.body = result;
	},

	getAll: function* _getAll() {
		const result = yield model.getAll();
		if (result.error === true) {
			return this.body = result;
		}
		return this.body = result;
	},

	getStyleguides: function* _getStyleguides() {
		const result = yield model.getStyleguides(this.params.customer_id);
		if (result.error === true) {
			return this.body = result;
		}
		return this.body = result;
	},

	create: function* _create() {
		const result = yield model.create(this.request.body);
		if (result.error === true) {
			return this.body = result;
		}
		return this.body = result;
	},

	update: function* _update() {
		const result = yield model.update(this.params.id, this.request.body);
		if (result.error === true) {
			return this.body = result;
		}
		return this.body = result;
	}
};
