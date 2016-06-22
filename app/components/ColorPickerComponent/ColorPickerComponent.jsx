import React from "react";
import ReactDOM from "react-dom";

// MATERIAL-UI
// theme
import { baseTheme } from "../../../themes/baseTheme.js";
import { getMuiTheme, MuiThemeProvider } from "material-ui/styles";
// components
import { TextField } from "material-ui";

// REACT COMPONENTS
import { ChromePicker } from "react-color";

class ColorPickerComponent extends React.Component {
	constructor(props) {
		super(props);

		// Initial State
		this.state = {
			doShowColorPicker: false
		};

		// Bind functions to this
		this._doShowColorPicker = this._doShowColorPicker.bind(this);
		this._colorPickerChange = this._colorPickerChange.bind(this);
		this._updateColor = this._updateColor.bind(this);
		this._handleClose = this._handleClose.bind(this);
	}

	componentDidMount() {
	}

	componentWillReceiveProps(nextProps) {
		this.setState({ color: nextProps.color });
	}

	getChildContext() {
		return { muiTheme: getMuiTheme(baseTheme) };
	}

	_doShowColorPicker(doShowColorPicker) {
		this.setState({
			doShowColorPicker: doShowColorPicker
		});
	}

	_colorPickerChange(e) {
		this.props.onChange(this.props.type, e.target.value);
	}

	_updateColor(color) {
		this.props.onChange(this.props.type, color.hex);
	}

	_handleClose() {
		this.setState({ doShowColorPicker: false });
	};

	render() {
		const popover = {
			position: "absolute",
			zIndex: "2"
		};
		const cover = {
			position: "fixed",
			top: 0,
			right: 0,
			bottom: 0,
			left: 0
		};
		const colorPickerDisplay = {
			backgroundColor: this.props.color,
			height: "1.5rem",
			width: "1.5rem",
			display: "block",
			position: "absolute",
			right: "1.875rem",
			top: "2.125rem"
		};
		const floatingLabelStyle = {
			textTransform: "capitalize"
		};
		return (
			<div className={ `col-xs-12 col-lg-${this.props.colWidth || 4} main-content-card-text-field` }>
				<span className="color-picker-value" style={ colorPickerDisplay }></span>
				<TextField
					floatingLabelText={ `${this.props.type} Color` }
					floatingLabelStyle={ floatingLabelStyle }
					fullWidth={ true }
					onFocus={ this._doShowColorPicker.bind(this, true) }
					onChange={ this._colorPickerChange }
					value={ this.props.color }
				></TextField>
				{ this.state.doShowColorPicker ? <div style={ popover }>
					<div style={ cover } onClick={ this._handleClose }/>
						<ChromePicker
							color={ this.props.color }
							onChangeComplete={ this._updateColor }
						/>
					</div> : null }
			</div>
		);
	}
}

ColorPickerComponent.childContextTypes = {
	muiTheme: React.PropTypes.object.isRequired
};

export default ColorPickerComponent;
