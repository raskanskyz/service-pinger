import { createSelector } from 'reselect';

const baseSelector = state => state.routerProd;

export const notifyRouterProdChangesSelector = createSelector(baseSelector, state => state.notifyChanges);
export const routerProdStatusSelector = createSelector(baseSelector, state => state.status);
export const routerProdVersionSelector = createSelector(baseSelector, state => state.version);
export const routerProdUptimePercentSelector = createSelector(baseSelector, state => state.uptimePercent);
export const routerProdVersionDeploymentDateSelector = createSelector(baseSelector, state => state.versionDeploymentDate);