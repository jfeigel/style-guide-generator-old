"use strict";

const config = require("../config.json");

const r = require("rethinkdbdash")(config.site.db);
const _ = require("lodash");

// EXPORTS //
module.exports = {
	get: function* _get(id) {
		return yield getCustomer();
	},
	getAll: function* _getAll() {
		return yield getAllCustomers();
	},
	getStyleguides: function* _getStyleguides(customer_id) {
		return yield getStyleguides(customer_id);
	},
	create: function* _create(customer) {
		return yield createCustomer(customer);
	},
	update: function* _update(id, body) {
		return yield updateCustomer(id, body);
	}
};

// HELPER FUNCTIONS //
function* getCustomer(id) {
	const result = yield r.table("customer").get(id).run();
	if (result === null) {
		throw new Error(`Customer not found (id: ${id}) | in customer.getCustomer`);
	}
	return result;
}

function* getAllCustomers() {
	const result = yield r.table("customer").run();
	if (result === null) {
		throw new Error(`Error retrieving Customers | customer.getAllCustomers`);
	}
	return result;
}

function* getStyleguides(customer_id) {
	let result = yield r.table("styleguide")
		.orderBy({index: "timestamp"})
		.filter({"customer_id": customer_id})
		.eqJoin(
		  "customer_id",
		  r.table("customer"),
		  {index: "id"}
		)
		.run();
	if (result === null) {
		throw new Error(`No Style Guides found for Customer (id: ${customer_id}) | in customer.getStyleguides`);
	} else {
		result = result.map((styleguide) => {
			let currentResult;
			currentResult = styleguide.left;
			currentResult.customer = styleguide.right;
			return currentResult;
		});
	}
	return result;
}

function* createCustomer(customer) {
	const result = yield r.table("customer").insert(customer, {returnChanges: true}).run();
	return result.changes[0].new_val;
}

function* updateCustomer(id, customer) {
	const result = yield r.table("customer").get(id).update(customer).run();
	if (result === null) {
		throw new Error(`Error updating Style Guide (id: ${id}) | customer.updateCustomer`);
	}
	return result;
}
// END HELPER FUNCTIONS //
