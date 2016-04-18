import React from "react";
import ReactDOM from "react-dom";

import _ from "lodash";

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