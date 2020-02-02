import { combineReducers } from 'redux';

import mpProd from './mpProd.reducer';
import apiGatewayProd from './apiGatewayProd.reducer';
import aclProd from './aclProd.reducer';
import apiProd from './apiProd.reducer';
import orgDashboardProd from './orgDashboardProd.reducer';

export default combineReducers({
  mpProd, apiGatewayProd, aclProd, orgDashboardProd, apiProd,
});
