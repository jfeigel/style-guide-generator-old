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

// LIB IMPORTS
import polyfill from "es6-promise";
import "isomorphic-fetch";
import _ from "lodash";

// COMPONENT IMPORTS
import Nav from "../NavComponent";
import ColorPicker from "../ColorPickerComponent";

class AppComponent extends React.Component {
	constructor(props) {
		super(props);

		// Initial State
		this.state = {
			isDrawerOpen: true,
			rules: {
				colors: {
					primary: "",
					secondary: "",
					tertiary: ""
				}
			}
		};

		// Bind functions to this
		this._signOut = this._signOut.bind(this);
		this._toggleDrawer = this._toggleDrawer.bind(this);
		this._onDrawerRequestChange = this._onDrawerRequestChange.bind(this);
		this._updateColor = this._updateColor.bind(this);
	}

	// LIFECYCLE METHODS
	componentWillMount() {
		if (!/^\/app(?:\/)?$/.test(this.props.location.pathname)) {
			this.setState({
				isDrawerOpen: false
			});
		}
	}

	componentDidMount() {}

	componentWillReceiveProps(nextProps) {
		if (!/^\/app(?:\/)?$/.test(nextProps.location)) {
			this.setState({
				isDrawerOpen: false
			});
		}
	}

	getChildContext() {
		return { muiTheme: getMuiTheme(baseTheme) };
	}

	// HELPER FUNCTIONS
	_signOut() {
		window.location.href = "/logout";
	}

	_toggleDrawer() {
		this.setState({
			isDrawerOpen: !this.state.isDrawerOpen
		});
	}

	_onDrawerRequestChange(openRequest) {
		if (!/^\/app(?:\/)?$/.test(this.props.location.pathname)) {
			this.setState({ isDrawerOpen: openRequest });
		} else {
			this.setState({ isDrawerOpen: true });
		}
	}

	_updateColor(type, color) {
		const rules = this.state.rules;
		rules.colors[type] = color;
		this.setState({
			rules: rules
		});
	}

	render() {
		return (
			<div>
				<Drawer
					docked={ false }
					open={ this.state.isDrawerOpen }
					onRequestChange={ this._onDrawerRequestChange }>
					<Nav />
				</Drawer>
				<AppBar
					className="app-bar"
					title="Style Guide Generator"
					onLeftIconButtonTouchTap={ this._toggleDrawer.bind(this) }
					iconElementRight={
						<IconMenu
							iconButtonElement={
								<IconButton><MoreVertIcon /></IconButton>
							}
							targetOrigin={{ horizontal: "right", vertical: "top" }}
							anchorOrigin={{ horizontal: "right", vertical: "top" }}
						>
							<MenuItem
								primaryText="Sign out"
								onTouchTap={ this._signOut }
								leftIcon={ <ActionHighlightOff /> }
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
										<ColorPicker
											type="primary"
											color={ this.state.rules.colors.primary }
											onChange={ this._updateColor }
										/>
										<ColorPicker
											type="secondary"
											color={ this.state.rules.colors.secondary }
											onChange={ this._updateColor }
										/>
										<ColorPicker
											type="tertiary"
											color={ this.state.rules.colors.tertiary }
											onChange={ this._updateColor }
										/>
									</div>
								</CardText>
								<CardActions>
									<FlatButton label="Save" secondary={ true } />
								</CardActions>
							</Card>
						</div>
						<div className="col-xs-6">
							<Card className="main-content-card">
								<CardHeader title="Output"></CardHeader>
								<CardText>
									{ this.props.children }
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
