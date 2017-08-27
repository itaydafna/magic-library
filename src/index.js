import React from "react";
import ReactDOM from "react-dom";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { Provider } from "react-redux";
import {
	Router,
	Route,
	Redirect,
	hashHistory
} from "react-router";


import App from "./components/App";
import BookForm from "./components/BookForm";
import ConfirmDelete from "./components/ConfirmDelete";

import store from "./store";
import "./index.css";

import injectTapEventPlugin from "react-tap-event-plugin";
try {
	injectTapEventPlugin();
} catch (e) {
	// Do nothing, just preventing error
}

ReactDOM.render(
	<Provider store={store}>
		<MuiThemeProvider>
			<Router history={hashHistory}>
				<Route path="/magic-library" component={App}>
					<Route path='new' component={BookForm}/>
					<Route path='edit/:book' component={BookForm}/>
					<Route path='delete/:book' component={ConfirmDelete}/>
				</Route>
				<Redirect from="/" to="magic-library"/>
			</Router>
		</MuiThemeProvider>
	</Provider>,
	document.querySelector("#root")
);
