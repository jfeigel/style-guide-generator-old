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
    	customers: []
		};

		// Bind functions to this
    this._getCustomers = this._getCustomers.bind(this);
  }

	componentDidMount() {
		this._getCustomers();
	}

	_getCustomers() {
		let _this = this;

		fetch("/customer")
	    .then(function(response) {
	        if (response.status >= 400) {
	            throw new Error("Bad response from server");
	        }
	        return response.json();
	    })
	    .then(function(customers) {
	        _this.setState({
	        	customers: customers
	        });
	    });
	}

	render() {
		return (
		  <div role="nav" className="list-group">
        {
					this.state.customers.map((customer, index) => {
						return (
						  <Link
						  	key={index}
						  	to={"/customer/" + customer.id}
						  	className="list-group-item">
						  		{customer.name}<i className="pull-right fa fa-angle-right"></i>
						  </Link>
						);
					})
				}
      </div>
		);
	}
}

export default NavComponent;