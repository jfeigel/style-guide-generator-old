import React from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router";

import polyfill from "es6-promise";
import "isomorphic-fetch";

import _ from "lodash";

class AppComponent extends React.Component {
	constructor(props) {
    super(props);

    // Initial State
    this.state = {
    	styleguides: []
		};

		// Bind functions to this
    this._getStyleguides = this._getStyleguides.bind(this);
  }

	componentDidMount() {
		this._getStyleguides();
	}

	componentDidUpdate(prevProps, prevState) {
		this._getStyleguides();
	}

	_getStyleguides() {
		let _this = this;

		fetch("/customer/styleguide/" + _this.props.params.customer_id)
	    .then(function(response) {
	        if (response.status >= 400) {
	            throw new Error("Bad response from server");
	        }
	        return response.json();
	    })
	    .then(function(styleguides) {
	        _this.setState({
	        	styleguides: styleguides
	        });
	    });
	}

	render() {
		return (
		  <div role="nav" className="list-group">
        {
					this.state.styleguides.map((styleguides, index) => {
						return (
						  <Link
						  	key={index}
						  	to={"/styleguides/" + styleguides.id}
						  	className="list-group-item">
						  		{styleguides.name}<i className="pull-right fa fa-angle-right"></i>
						  </Link>
						);
					})
				}
      </div>
		);
	}
}

export default AppComponent;