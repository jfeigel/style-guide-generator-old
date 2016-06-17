"use strict";

const config = require("../config.json");

const model = require("../models/styleguide.js");

// EXPORTS //
module.exports = {
	get: function* _get() {
		const result = yield model.get(this.params.id);
		if (result.error === true) {
			return this.body = result;
		}
		return this.body = result;
	},

	create: function* _create() {
		const result = yield model.create(this.params.id, this.request.body);
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
