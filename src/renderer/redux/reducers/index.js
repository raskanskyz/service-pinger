import { combineReducers } from 'redux';

// PLOP IMPORT REDUCERS PLACEHOLDER
import provisioningStage from './provisioningStage.reducer';
import aclV2Stage from './aclV2Stage.reducer';
import issuesStage from './issuesStage.reducer';
import ech2Stage from './ech2Stage.reducer';
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
import apiProd from './apiProd.reducer';

export default combineReducers({
  // PLOP COMBINE_REDUCERS PLACEHOLDER
  provisioningStage,
  aclV2Stage,
  issuesStage,
  ech2Stage,
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
  apiProd,
});
