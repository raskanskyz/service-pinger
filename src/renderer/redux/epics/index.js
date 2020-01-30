import { combineEpics } from 'redux-observable';
import prodEpic from './mpProd.epic';

export default combineEpics(...prodEpic);
