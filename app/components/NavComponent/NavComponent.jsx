import React from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router";

import polyfill from "es6-promise";
import "isomorphic-fetch";
import _ from "lodash";

class NavComponent extends React.Component {
	constructor(props) {
		super(props);

		// Initial State
		this.state = {
			customers: [],
			styleguides: [],
			active_list: null
		};

		// Bind functions to this
		this._getCustomers = this._getCustomers.bind(this);
		this._getStyleguides = this._getStyleguides.bind(this);
		this._backToCustomers = this._backToCustomers.bind(this);
	}

	componentDidMount() {
		this._getCustomers();
	}

	_getCustomers() {
		const self = this;

		fetch("/customer")
			.then((response) => {
				if (response.status >= 400) {
					throw new Error("Bad response from server");
				}
				return response.json();
			})
			.then((customers) => {
				self.setState({
					customers: customers,
					active_list: "customers"
				});
			});
	}

	_getStyleguides(customer_id) {
		const self = this;

		fetch(`/customer/styleguide/${customer_id}`)
			.then((response) => {
				if (response.status >= 400) {
					throw new Error("Bad response from server");
				}
				return response.json();
			})
			.then((styleguides) => {
				self.setState({
					styleguides: styleguides,
					active_list: "styleguides"
				});
			});
	}

	_backToCustomers() {
		this.setState({
			styleguides: [],
			active_list: "customers"
		});
	}

	render() {
		return (
			<div role="nav" className="list-group">
				{(() => {
					if (this.state.active_list === "customers") {
						return this.state.customers.map((customer, index) => {
							return (
								<a
									key={index}
									onClick={this._getStyleguides.bind(this, customer.id)}
									className="list-group-item">
										{customer.name}<i className="pull-right fa fa-angle-right"></i>
								</a>
							);
						});
					} else if (this.state.active_list === "styleguides") {
						return [
							<a
								key={0}
								onClick={this._backToCustomers.bind(this)}
								className="list-group-item back-to-customers">
									<i className="fa fa-angle-left"></i><span className="pull-right">Back to Customer List</span>
							</a>
						].concat(this.state.styleguides.map((styleguide, index) => {
							return (
								<Link
									key={index + 1}
									to={`/styleguide/${styleguide.id}`}
									className="list-group-item">
										{styleguide.name}<i className="pull-right fa fa-angle-right"></i>
								</Link>
							);
						}));
					}
				})()}
			</div>
		);
	}
}

export default NavComponent;
