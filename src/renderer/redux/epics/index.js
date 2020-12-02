import { combineEpics } from 'redux-observable';

// PLOP IMPORT EPICS PLACEHOLDER
import provisioningStageEpic from './provisioningStage.epic';
import aclV2StageEpic from './aclV2Stage.epic';
import issuesStageEpic from './issuesStage.epic';
import ech2StageEpic from './ech2Stage.epic';
import aclStageEpic from './aclStage.epic';
import routerProdEpic from './routerProd.epic';
import ech2ProdEpic from './ech2Prod.epic';
import searchProdEpic from './searchProd.epic';
import provisioningProdEpic from './provisioningProd.epic';
import echProdEpic from './echProd.epic';
import billingProdEpic from './billingProd.epic';
import apiStageEpic from './apiStage.epic';
import issuesProdEpic from './issuesProd.epic';
import mpProdEpic from './mpProd.epic';
import apiGatewayProd from './apiGatewayProd.epic';
import aclProd from './aclProd.epic';
import apiProd from './apiProd.epic';
import ui from './ui.epic';

export default combineEpics(
  // PLOP COMBINE_EPICS PLACEHOLDER
  ...provisioningStageEpic,
  ...aclV2StageEpic,
  ...issuesStageEpic,
  ...ech2StageEpic,
  ...aclStageEpic,
  ...routerProdEpic,
  ...ech2ProdEpic,
  ...searchProdEpic,
  ...provisioningProdEpic,
  ...echProdEpic,
  ...billingProdEpic,
  ...apiStageEpic,
  ...issuesProdEpic,
  ...mpProdEpic,
  ...apiGatewayProd,
  ...aclProd,
  ...apiProd,
  ...ui,
);
