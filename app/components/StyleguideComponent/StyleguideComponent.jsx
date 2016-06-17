import React from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router";

import polyfill from "es6-promise";
import "isomorphic-fetch";

import _ from "lodash";

class StyleguideComponent extends React.Component {
	constructor(props) {
		super(props);

		// Initial State
		this.state = {
			styleguide: []
		};

		// Bind functions to this
		this._getStyleguide = this._getStyleguide.bind(this);
	}

	componentDidMount() {
		this._getStyleguide();
	}

	componentDidUpdate(prevProps, prevState) {
		this._getStyleguide();
	}

	_getStyleguide() {
		const self = this;

		fetch(`/app/styleguide/${self.props.params.styleguide_id}`, { credentials: "include" })
			.then((response) => {
				if (response.status >= 400) {
					throw new Error("Bad response from server");
				}
				return response.json();
			})
			.then((styleguide) => {
				self.setState({
					styleguide: styleguide
				});
			});
	}

	render() {
		return (
			<div>
				Styleguide
			</div>
		);
	}
}

export default StyleguideComponent;
