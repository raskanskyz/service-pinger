import { createSelector } from 'reselect';

const baseSelector = state => state.provisioningProd;

export const notifyProvisioningProdChangesSelector = createSelector(baseSelector, state => state.notifyChanges);
export const provisioningProdStatusSelector = createSelector(baseSelector, state => state.status);
export const provisioningProdVersionSelector = createSelector(baseSelector, state => state.version);
export const provisioningProdUptimePercentSelector = createSelector(baseSelector, state => state.uptimePercent);
export const provisioningProdVersionDeploymentDateSelector = createSelector(baseSelector, state => state.versionDeploymentDate);
