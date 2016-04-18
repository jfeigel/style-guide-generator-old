"use strict";

const config = require("../config.json");

const model = require("../models/styleguide.js");

module.exports = {
	get: function* get() {
		const result = yield model.get(this.request);
		if (result.error === true) {
			return this.body = result;
		}
		return this.body = result;
	},

	create: function* create() {
		const result = yield model.create(this.request);
		if (result.error === true) {
			return this.body = result;
		}
		return this.body = result;
	},

	update: function* update() {
		const result = yield model.update(this.request);
		if (result.error === true) {
			return this.body = result;
		}
		return this.body = result;
	}
};
