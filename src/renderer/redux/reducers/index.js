import { combineReducers } from 'redux';

import mpProd from './mpProd.reducer';
import apiGatewayProd from './apiGatewayProd.reducer';

export default combineReducers({ mpProd, apiGatewayProd });
