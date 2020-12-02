import { createSelector } from 'reselect';

const baseSelector = state => state.aclServiceStage;

export const notifyAclServiceStageChangesSelector = createSelector(baseSelector, state => state.notifyChanges);
export const aclServiceStageStatusSelector = createSelector(baseSelector, state => state.status);
export const aclServiceStageVersionSelector = createSelector(baseSelector, state => state.version);
export const aclServiceStageUptimePercentSelector = createSelector(baseSelector, state => state.uptimePercent);
export const aclServiceStageVersionDeploymentDateSelector = createSelector(baseSelector, state => state.versionDeploymentDate);