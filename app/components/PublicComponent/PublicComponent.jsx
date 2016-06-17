// REACT IMPORTS
import React from "react";
import ReactDOM from "react-dom";

// MATERIAL-UI
// theme
import darkBaseTheme from "material-ui/styles/baseThemes/darkBaseTheme";
import { getMuiTheme, MuiThemeProvider } from "material-ui/styles";
// components
import { AppBar, FloatingActionButton, FontIcon, IconMenu, IconButton, MenuItem } from "material-ui";
// icons
import ActionAccountCircle from "material-ui/svg-icons/action/account-circle";
import MoreVertIcon from "material-ui/svg-icons/navigation/more-vert";
import MenuIcon from "material-ui/svg-icons/navigation/menu";

const muiTheme = getMuiTheme({});

class PublicComponent extends React.Component {
	constructor(props) {
		super(props);

		// Initial State
		this.state = {};

		// Bind functions to this
		this._login = this._login.bind(this);
	}

	componentDidMount() {
	}

	getChildContext() {
		return { muiTheme: getMuiTheme(muiTheme) };
	}

	_login(platform) {
		window.location.href = `/auth/${platform}`;
	}

	render() {
		return (
			<div>
				<AppBar
					title="Style Guide Generator"
					showMenuIconButton={false}
					iconElementRight={
						<IconMenu
							iconButtonElement={
								<IconButton><ActionAccountCircle /></IconButton>
							}
							targetOrigin={{horizontal: "right", vertical: "top"}}
							anchorOrigin={{horizontal: "right", vertical: "top"}}
						>
							<MenuItem
								primaryText="Github"
								onTouchTap={() => this._login("github")}
								rightIcon={
									<FontIcon
										className="fa fa-github"
									/>
								}
							/>
							<MenuItem
								primaryText="Facebook"
								onTouchTap={() => this._login("facebook")}
								rightIcon={
									<FontIcon
										className="fa fa-facebook"
									/>
								}
							/>
							<MenuItem
								primaryText="Twitter"
								onTouchTap={() => this._login("twitter")}
								rightIcon={
									<FontIcon
										className="fa fa-twitter"
									/>
								}
							/>
						</IconMenu>
					}
				/>
				<div className="container">
					<div className="row">
						<div className="col-xs-12">
							<h1>Welcome to the Style Guide Generator</h1>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

PublicComponent.childContextTypes = {
	muiTheme: React.PropTypes.object.isRequired
};

export default PublicComponent;