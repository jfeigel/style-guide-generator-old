// REACT IMPORTS
import React from "react";
import ReactDOM from "react-dom";

// MATERIAL-UI
// theme
import { baseTheme } from "../../../themes/baseTheme.js";
import { getMuiTheme, MuiThemeProvider } from "material-ui/styles";
import { grey50 } from "material-ui/styles/colors";
// components
import {
	AppBar,
	Card, CardActions, CardText, CardTitle,
	CircularProgress,
	Divider,
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
import Heading from "../HeadingComponent";

class AppComponent extends React.Component {
	constructor(props) {
		super(props);

		// Initial State
		this.state = {
			isDrawerOpen: true,
			isSaving: false,
			rules: {
				colors: {
					primary: "",
					secondary: "",
					tertiary: ""
				},
				font: "",
				headings: {
					h1: "",
					h2: "",
					h3: "",
					h4: "",
					h5: "",
					h6: ""
				}
			}
		};

		// Bind functions to this
		this._signOut = this._signOut.bind(this);
		this._toggleDrawer = this._toggleDrawer.bind(this);
		this._onDrawerRequestChange = this._onDrawerRequestChange.bind(this);
		this._updateColor = this._updateColor.bind(this);
		this._updateHeading = this._updateHeading.bind(this);
		this._save = this._save.bind(this);
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
		this.setState({ rules: rules });
	}

	_updateHeading(number, value) {
		const rules = this.state.rules;
		rules.headings[number] = value;
		this.setState({ rules: rules });
	}

	_save() {
		this.setState({
			isSaving: true
		});
	}

	render() {
		const nestedListStyle = {
			paddingLeft: "16px",
			paddingRight: "16px"
		};
		return (
			<div style={{ backgroundColor: grey50 }}>
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
						<div className="col-xs-12 col-md-6">
							<form>
								<Card className="main-content-card">
									<CardTitle title="Code" className="main-content-card-title"></CardTitle>
									<CardText className="main-content-card-text">
										<List>
											<ListItem
												primaryText="Fonts"
												primaryTogglesNestedList={ true }
												nestedListStyle={ nestedListStyle }
												nestedItems={[
													<div key="fonts" className="row">
														<div className="col-xs-12">
															<TextField
																floatingLabelText="Font Stack"
																hintText={ "\"Helvetica Neue\", Helvetica, Arial, sans-serif" }
																fullWidth={ true }
															/>
														</div>
													</div>
												]}
											/>
											<ListItem
												primaryText="Colors"
												primaryTogglesNestedList={ true }
												nestedListStyle={ nestedListStyle }
												nestedItems={[
													<div key="colors" className="row">
														{
															_.map(this.state.rules.colors, (value, type) => {
																return (
																	<ColorPicker
																		key={ type }
																		type={ type }
																		color={ value }
																		colWidth={ 4 }
																		onChange={ this._updateColor }
																	/>
																);
															})
														}
													</div>
												]}
											/>
											<ListItem
												primaryText="Headings"
												primaryTogglesNestedList={ true }
												nestedListStyle={ nestedListStyle }
												nestedItems={[
													<div key="headings" className="row">
														{
															_.map(this.state.rules.headings, (value, number) => {
																return (
																	<Heading
																		key={ number }
																		number={ number }
																		value={ value }
																		colWidth={ 4 }
																		onChange={ this._updateHeading }
																	/>
																);
															})
														}
													</div>
												]}
											/>
										</List>
									</CardText>
									<CardActions>
										<FlatButton
											label="Save"
											secondary={ true }
											onTouchTap={ this._save }
										/>
									{ this.state.isSaving ? <CircularProgress size={ 0.4 } style={{ top: "20px" }} /> : null }
									</CardActions>
								</Card>
							</form>
						</div>
						<div className="col-xs-12 col-md-6">
							<Card className="main-content-card">
								<Card title="Output"></Card>
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
