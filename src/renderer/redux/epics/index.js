import { combineEpics } from 'redux-observable';
import mpProdEpic from './mpProd.epic';
import apiGatewayProd from './apiGatewayProd.epic';
import aclProd from './aclProd.epic';
import apiProd from './apiProd.epic';
import orgDashboardProd from './orgDashboardProd.epic';

export default combineEpics(...mpProdEpic, ...apiGatewayProd, ...aclProd, ...orgDashboardProd, ...apiProd);
