import { createSelector } from 'reselect';

const baseSelector = state => state.searchProd;

export const notifySearchProdChangesSelector = createSelector(baseSelector, state => state.notifyChanges);
export const searchProdStatusSelector = createSelector(baseSelector, state => state.status);
export const searchProdVersionSelector = createSelector(baseSelector, state => state.version);
export const searchProdUptimePercentSelector = createSelector(baseSelector, state => state.uptimePercent);
export const searchProdVersionDeploymentDateSelector = createSelector(baseSelector, state => state.versionDeploymentDate);