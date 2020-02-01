import { combineEpics } from 'redux-observable';
import mpProdEpic from './mpProd.epic';
import apiGatewayProd from './apiGatewayProd.epic';

export default combineEpics(...mpProdEpic, ...apiGatewayProd);
