import { combineReducers } from "redux";

import stage from "./stage";
import prod from "./prod";

export default combineReducers({ stage, prod });
