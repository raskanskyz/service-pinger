import { combineEpics } from "redux-observable";
import stageEpic from "./stage";
import prodEpic from "./prod";

export default combineEpics(...stageEpic, ...prodEpic);
