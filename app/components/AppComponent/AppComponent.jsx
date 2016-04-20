// REACT IMPORTS
import React from "react";
import ReactDOM from "react-dom";

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
		};

		// Bind functions to this
    // this._bootstrap = this._bootstrap.bind(this);
  }

	componentDidMount() {
	}

	render() {
		return (
		  <div className="container-fluid">
		  	<div className="row">
		  		<div className="col-xs-2 sidebar">
		  			<p>Style Guide Generator</p>
		  			<Nav children={this.props.children} />
		  			{this.props.children}
	  			</div>
	  			<div className="col-xs-10 main-content">
	  				<div className="row">
	  					<div className="col-xs-6 main-content-code">
	  						<p>Code:</p>
	  					</div>
	  					<div className="col-xs-6 main-content-output">
	  						<p>Output:</p>
	  					</div>
	  				</div>
	  			</div>
		  	</div>
			</div>
		);
	}
}

export default AppComponent;