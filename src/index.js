import React from "react";
import ReactDOM from "react-dom";
import { dom, library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "./proprietary/fortawesome-pro-solid-svg-icons";

import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

import "./index.css";

library.add(fas);
dom.watch();

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
