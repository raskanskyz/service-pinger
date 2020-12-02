import { createSelector } from 'reselect';

const baseSelector = state => state.aclServiceProd;

export const notifyAclServiceProdChangesSelector = createSelector(baseSelector, state => state.notifyChanges);
export const aclServiceProdStatusSelector = createSelector(baseSelector, state => state.status);
export const aclServiceProdVersionSelector = createSelector(baseSelector, state => state.version);
export const aclServiceProdUptimePercentSelector = createSelector(baseSelector, state => state.uptimePercent);
export const aclServiceProdVersionDeploymentDateSelector = createSelector(baseSelector, state => state.versionDeploymentDate);