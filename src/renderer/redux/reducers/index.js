import { combineReducers } from 'redux';

// PLOP IMPORT REDUCERS PLACEHOLDER
import routerProd from './routerProd.reducer';
import ech2Prod from './ech2Prod.reducer';
import searchProd from './searchProd.reducer';
import provisioningProd from './provisioningProd.reducer';
import echProd from './echProd.reducer';
import billingProd from './billingProd.reducer';
import apiStage from './apiStage.reducer';
import issuesProd from './issuesProd.reducer';
import mpProd from './mpProd.reducer';
import apiGatewayProd from './apiGatewayProd.reducer';
import aclProd from './aclProd.reducer';
import apiProd from './apiProd.reducer';

export default combineReducers({
  // PLOP COMBINE_REDUCERS PLACEHOLDER
  routerProd,
  ech2Prod,
  searchProd,
  provisioningProd,
  echProd,
  billingProd,
  apiStage,
  issuesProd,
  mpProd,
  apiGatewayProd,
  aclProd,
  apiProd,
});
