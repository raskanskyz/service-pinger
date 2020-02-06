import { combineReducers } from 'redux';

// PLOP IMPORT REDUCERS PLACEHOLDER
import billingProd from './billingProd.reducer';
import apiStage from './apiStage.reducer';
import issuesProd from './issuesProd.reducer';
import mpProd from './mpProd.reducer';
import apiGatewayProd from './apiGatewayProd.reducer';
import aclProd from './aclProd.reducer';
import apiProd from './apiProd.reducer';

export default combineReducers({
  // PLOP COMBINE_REDUCERS PLACEHOLDER
  billingProd,
  apiStage,
  issuesProd,
  mpProd,
  apiGatewayProd,
  aclProd,
  apiProd,
});
