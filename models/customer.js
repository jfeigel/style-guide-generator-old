"use strict";

const config = require("../config.json");

const r = require("rethinkdb");
const _ = require("lodash");

let connection;

// EXPORTS //
module.exports = {
	get: _get,
	getAll: _getAll,
	getStyleguides: _getStyleguides,
	create: _create,
	update: _update
};

// EXPORT FUNCTIONS //
function* _get(req, params) {
	return yield getCustomer(params.id);
}

function* _getAll(req, params) {
	return yield getAllCustomers();
}

function* _getStyleguides(req, params) {
	return yield getStyleguides(params.customer_id);
}

function* _create(req, params) {
	return yield createCustomer(req.body);
}

function* _update(req, params) {
	return yield updateCustomer(params.id, req.body);
}
// END EXPORTS //

// HELPER FUNCTIONS //
function* createConnection() {
	try {
		connection = yield r.connect(config.site.db);
	} catch (err) {
		console.error(err);
	}
}

function* getCustomer(id) {
	yield createConnection();
	const result = yield r.table("customer").get(id).run(connection);
	if (result === null) {
		throw new Error(`Customer not found (id: ${id}) | in customer.getCustomer`);
	}
	connection.close();
	return result;
}

function* getAllCustomers() {
	yield createConnection();
	const cursor = yield r.table("customer").run(connection);
	const result = yield cursor.toArray();
	if (result === null) {
		throw new Error(`Error retrieving Customers | customer.getAllCustomers`);
	}
	connection.close();
	return result;
}

function* getStyleguides(customer_id) {
	yield createConnection();
	const cursor = yield r.table("styleguide")
		.orderBy({index: "timestamp"})
		.filter({"customer_id": customer_id})
		.eqJoin(
		  "customer_id",
		  r.table("customer"),
		  {index: "id"}
		)
		.run(connection);
	let cursorArray = yield cursor.toArray();
	if (cursorArray === null) {
		throw new Error(`No Style Guides found for Customer (id: ${customer_id}) | in customer.getStyleguides`);
	} else {
		cursorArray = cursorArray.map((styleguide) => {
			let result;
			result = styleguide.left;
			result.customer = styleguide.right;
			return result;
		});
	}
	connection.close();
	return cursorArray;
}

function* createCustomer(customer) {
	yield createConnection();
	const result = yield r.table("customer").insert(customer, {returnChanges: true}).run(connection);
	connection.close();
	return result.changes[0].new_val;
}

function* updateCustomer(id, customer) {
	yield createConnection();
	const result = yield r.table("customer").get(id).update(customer).run(connection);
	if (result === null) {
		throw new Error(`Error updating Style Guide (id: ${id}) | customer.updateCustomer`);
	}
	connection.close();
	return result;
}
// END HELPER FUNCTIONS //