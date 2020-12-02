import { createSelector } from 'reselect';

const baseSelector = state => state.provisioningStage;

export const notifyProvisioningStageChangesSelector = createSelector(baseSelector, state => state.notifyChanges);
export const provisioningStageStatusSelector = createSelector(baseSelector, state => state.status);
export const provisioningStageVersionSelector = createSelector(baseSelector, state => state.version);
export const provisioningStageUptimePercentSelector = createSelector(baseSelector, state => state.uptimePercent);
export const provisioningStageVersionDeploymentDateSelector = createSelector(baseSelector, state => state.versionDeploymentDate);