import React from "react";
import ReactDOM from "react-dom";

// MATERIAL-UI
// theme
import { baseTheme } from "../../../themes/baseTheme.js";
import { getMuiTheme, MuiThemeProvider } from "material-ui/styles";
// components
import { TextField } from "material-ui";

class HeadingComponent extends React.Component {
	constructor(props) {
		super(props);

		// Initial State
		this.state = {};

		// Bind functions to this
		this._headingChange = this._headingChange.bind(this);
	}

	componentDidMount() {
	}

	getChildContext() {
		return { muiTheme: getMuiTheme(baseTheme) };
	}

	_headingChange(e) {
		this.props.onChange(this.props.number, e.target.value);
	}

	render() {
		return (
			<div className={ `col-xs-12 col-lg-${this.props.colWidth || 4} main-content-card-text-field` }>
				<TextField
					floatingLabelText={ this.props.number }
					fullWidth={ true }
					onChange={ this._headingChange }
					value={ this.props.value }
				/>
			</div>
		);
	}
}

HeadingComponent.childContextTypes = {
	muiTheme: React.PropTypes.object.isRequired
};

export default HeadingComponent;
