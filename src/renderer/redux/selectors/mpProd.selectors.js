import { createSelector } from 'reselect';

const baseSelector = state => state.mpProd;

export const notifyMPProdChangesSelector = createSelector(baseSelector, state => state.notifyChanges);
export const mpProdStatusSelector = createSelector(baseSelector, state => state.status);
export const mpProdVersionSelector = createSelector(baseSelector, state => state.version);
export const mpProdUptimePercentSelector = createSelector(baseSelector, state => state.uptimePercent);
export const mpProdVersionDeploymentDateSelector = createSelector(baseSelector, state => state.versionDeploymentDate);
