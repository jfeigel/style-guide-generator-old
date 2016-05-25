import React from "react";
import { render } from "react-dom";
import { Router, Route, hashHistory } from "react-router";

import App from "./components/AppComponent";
import Styleguide from "./components/StyleguideComponent";

import "../assets/styles/custom.css";

const rootInstance = render((
	<Router history={hashHistory}>
		<Route path="/" component={App}>
			<Route path="styleguide/:styleguide_id" component={Styleguide} />
		</Route>
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
