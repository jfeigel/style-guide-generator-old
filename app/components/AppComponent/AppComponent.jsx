// REACT IMPORTS
import React from "react";
import ReactDOM from "react-dom";

// MATERIAL-UI
// theme
import { baseTheme } from "../../../themes/baseTheme.js";
import { getMuiTheme, MuiThemeProvider } from "material-ui/styles";
// components
import {
	AppBar,
	Card, CardActions, CardHeader, CardText,
	Drawer,
	FlatButton, IconButton,
	IconMenu, MenuItem,
	List, ListItem,
	TextField
} from "material-ui";
// icons
import ActionHighlightOff from "material-ui/svg-icons/action/highlight-off";
import MoreVertIcon from "material-ui/svg-icons/navigation/more-vert";
import MenuIcon from "material-ui/svg-icons/navigation/menu";

// REACT COMPONENTS
import { ChromePicker } from "react-color";

// LIB IMPORTS
import polyfill from "es6-promise";
import "isomorphic-fetch";
import _ from "lodash";

// COMPONENT IMPORTS
import Nav from "../NavComponent";

class AppComponent extends React.Component {
	constructor(props) {
		super(props);

		// Initial State
		this.state = {
			isDrawerOpen: false,
			doShowColorPicker: {
				primary: false,
				secondary: false,
				tertiary: false
			}
		};

		// Bind functions to this
		this._signOut = this._signOut.bind(this);
		this._toggleDrawer = this._toggleDrawer.bind(this);
		this._doShowColorPicker = this._doShowColorPicker.bind(this);
	}

	componentDidMount() {
	}

	getChildContext() {
		return { muiTheme: getMuiTheme(baseTheme) };
	}

	_signOut() {
		window.location.href = "/logout";
	}

	_toggleDrawer() {
		this.setState({
			isDrawerOpen: !this.state.isDrawerOpen
		});
	}

	_doShowColorPicker(colorType, doShowColorPicker) {
		const currentColorPickerState = this.state.doShowColorPicker;
		currentColorPickerState[colorType] = doShowColorPicker;

		this.setState({
			doShowColorPicker: currentColorPickerState
		});
	}

	render() {
		return (
			<div>
				<Drawer
					docked={false}
					open={this.state.isDrawerOpen}
					onRequestChange={(isDrawerOpen) => this.setState({isDrawerOpen})}>
					<Nav />
				</Drawer>
				<AppBar
					className="app-bar"
					title="Style Guide Generator"
					onLeftIconButtonTouchTap={this._toggleDrawer.bind(this)}
					iconElementRight={
						<IconMenu
							iconButtonElement={
								<IconButton><MoreVertIcon /></IconButton>
							}
							targetOrigin={{horizontal: "right", vertical: "top"}}
							anchorOrigin={{horizontal: "right", vertical: "top"}}
						>
							<MenuItem
								primaryText="Sign out"
								onTouchTap={this._signOut}
								leftIcon={<ActionHighlightOff />}
							/>
						</IconMenu>
					}
				/>
				<div className="container-fluid main-content-container">
					<div className="row">
						<div className="col-xs-6">
							<Card className="main-content-card">
								<CardHeader title="Code" className="main-content-card-header"></CardHeader>
								<CardText className="main-content-card-text">
									<div className="row">
										<h5 className="col-xs-12">Colors</h5>
									</div>
									<div className="row">
										<div className="col-xs-4 main-content-card-text-field">
											<TextField
												floatingLabelText="Primary Color"
												onFocus={this._doShowColorPicker.bind(this, "primary", true)}
												onBlur={this._doShowColorPicker.bind(this, "primary", false)}
											></TextField>
											{ this.state.doShowColorPicker["primary"] ? <ChromePicker className="main-content-card-colorpicker"></ChromePicker> : null }
										</div>
										<div className="col-xs-4 main-content-card-text-field">
											<TextField
												floatingLabelText="Secondary Color"
												onFocus={this._doShowColorPicker.bind(this, "secondary", true)}
												onBlur={this._doShowColorPicker.bind(this, "secondary", false)}
											></TextField>
											{ this.state.doShowColorPicker["secondary"] ? <ChromePicker className="main-content-card-colorpicker"></ChromePicker> : null }
										</div>
										<div className="col-xs-4 main-content-card-text-field">
											<TextField
												floatingLabelText="Tertiary Color"
												onFocus={this._doShowColorPicker.bind(this, "tertiary", true)}
												onBlur={this._doShowColorPicker.bind(this, "tertiary", false)}
											></TextField>
											{ this.state.doShowColorPicker["tertiary"] ? <ChromePicker className="main-content-card-colorpicker"></ChromePicker> : null }
										</div>
									</div>
								</CardText>
								<CardActions>
									<FlatButton label="Save" secondary={true} />
								</CardActions>
							</Card>
						</div>
						<div className="col-xs-6">
							<Card className="main-content-card">
								<CardHeader title="Output"></CardHeader>
								<CardText>
									{this.props.children}
								</CardText>
							</Card>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

AppComponent.childContextTypes = {
	muiTheme: React.PropTypes.object.isRequired
};

export default AppComponent;
