import React from "react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom";

import "./style.css";
import store from "./redux/store";
import App from "./components/App";

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root")
);
