import { createSelector } from 'reselect';

const baseSelector = state => state.echProd;

export const notifyEchProdChangesSelector = createSelector(baseSelector, state => state.notifyChanges);
export const echProdStatusSelector = createSelector(baseSelector, state => state.status);
export const echProdVersionSelector = createSelector(baseSelector, state => state.version);
export const echProdUptimePercentSelector = createSelector(baseSelector, state => state.uptimePercent);
export const echProdVersionDeploymentDateSelector = createSelector(baseSelector, state => state.versionDeploymentDate);
