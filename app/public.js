import React from "react";
import { render } from "react-dom";
import { Router, Route, hashHistory } from "react-router";
import injectTapEventPlugin from "react-tap-event-plugin";

import Public from "./components/PublicComponent";

import "../assets/styles/custom.css";

injectTapEventPlugin();

const rootInstance = render((
	<Router history={hashHistory}>
		<Route path="/" component={Public}></Route>
	</Router>
), document.getElementById("react-wrapper"));

if (module.hot) {
	require("react-hot-loader/Injection").RootInstanceProvider.injectProvider({
		getRootInstances: () => {
			// Help React Hot Loader figure out the root component instances on the page:
			return [rootInstance];
		}
	});
}
