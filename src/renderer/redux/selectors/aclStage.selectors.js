import { createSelector } from 'reselect';

const baseSelector = state => state.aclStage;

export const notifyAclStageChangesSelector = createSelector(baseSelector, state => state.notifyChanges);
export const aclStageStatusSelector = createSelector(baseSelector, state => state.status);
export const aclStageVersionSelector = createSelector(baseSelector, state => state.version);
export const aclStageUptimePercentSelector = createSelector(baseSelector, state => state.uptimePercent);
export const aclStageVersionDeploymentDateSelector = createSelector(baseSelector, state => state.versionDeploymentDate);