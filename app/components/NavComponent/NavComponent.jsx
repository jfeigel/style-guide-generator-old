import React from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router";

import polyfill from "es6-promise";
import "isomorphic-fetch";
import _ from "lodash";

// MATERIAL-UI
// components
import { List, ListItem } from "material-ui";
// icons
import ChevronLeftIcon from "material-ui/svg-icons/navigation/chevron-left";
import ChevronRightIcon from "material-ui/svg-icons/navigation/chevron-right";

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

		fetch("/app/customer", { credentials: "include" })
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

		fetch(`/app/customer/styleguide/${customer_id}`, { credentials: "include" })
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
			<List>
				{(() => {
					if (this.state.active_list === "customers") {
						return this.state.customers.map((customer, index) => {
							return (
								<ListItem
									key={index}
									primaryText={customer.name}
									onTouchTap={this._getStyleguides.bind(this, customer.id)}
									rightIcon={<ChevronRightIcon />}
								/>
							);
						});
					} else if (this.state.active_list === "styleguides") {
						return [
							<ListItem
								key={0}
								primaryText="Back to Customer List"
								onTouchTap={this._backToCustomers.bind(this)}
								leftIcon={<ChevronLeftIcon />}
							/>
						].concat(this.state.styleguides.map((styleguide, index) => {
							return (
								<Link
									key={index + 1}
									to={`/styleguide/${styleguide.id}`}
								>
									<ListItem
										primaryText={styleguide.name}
										rightIcon={<ChevronRightIcon />}
									/>
								</Link>
							);
						}));
					}
				})()}
			</List>
		);
	}
}

export default NavComponent;
