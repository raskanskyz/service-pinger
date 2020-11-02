import { createSelector } from 'reselect';

const baseSelector = state => state.aclV2Stage;

export const notifyAclV2StageChangesSelector = createSelector(baseSelector, state => state.notifyChanges);
export const aclV2StageStatusSelector = createSelector(baseSelector, state => state.status);
export const aclV2StageVersionSelector = createSelector(baseSelector, state => state.version);
export const aclV2StageUptimePercentSelector = createSelector(baseSelector, state => state.uptimePercent);
export const aclV2StageVersionDeploymentDateSelector = createSelector(baseSelector, state => state.versionDeploymentDate);