// REACT IMPORTS
import React from "react";
import ReactDOM from "react-dom";

// MATERIAL-UI
// theme
import darkBaseTheme from "material-ui/styles/baseThemes/darkBaseTheme";
import { getMuiTheme, MuiThemeProvider } from "material-ui/styles";
// components
import { AppBar, Card, CardHeader, CardText, Drawer, IconButton, IconMenu, MenuItem } from "material-ui";
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

const muiTheme = getMuiTheme({});

class AppComponent extends React.Component {
	constructor(props) {
		super(props);

		// Initial State
		this.state = {
			isDrawerOpen: false
		};

		// Bind functions to this
		this._signOut = this._signOut.bind(this);
		this._toggleDrawer = this._toggleDrawer.bind(this);
	}

	componentDidMount() {
	}

	getChildContext() {
		return { muiTheme: getMuiTheme(muiTheme) };
	}

	_signOut() {
		window.location.href = "/logout";
	}

	_toggleDrawer() {
		this.setState({
			isDrawerOpen: !this.state.isDrawerOpen
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
								<CardHeader title="Code"></CardHeader>
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
