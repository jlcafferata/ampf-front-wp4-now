import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { store } from "./modules/store";
import App from "./components/app/presentational/App.jsx";

import "bootstrap/dist/css/bootstrap.css";
import "./assets/scss/now-ui-dashboard.css?v=1.2.0";
import "./assets/css/demo.css";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
