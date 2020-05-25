import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Auth0Provider } from "./react-auth0-spa";
import history from "./utils/history";
import "bootstrap/dist/css/bootstrap.css";
require("dotenv").config();

const onRedirectCallback = (appState) => {
  history.push(
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname
  );
};

ReactDOM.render(
  <Auth0Provider
    domain="old-frost-2111.eu.auth0.com"
    client_id="wZXxjDyQDVrqU0q6_ZhOYiFb6pZRsC6y"
    redirect_uri={window.location.origin}
    onRedirectCallback={onRedirectCallback}
  >
    <App />
  </Auth0Provider>,
  document.getElementById("root")
);
serviceWorker.unregister();
