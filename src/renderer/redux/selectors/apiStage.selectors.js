import { createSelector } from 'reselect';

const baseSelector = state => state.apiStage;

export const notifyApiStageChangesSelector = createSelector(baseSelector, state => state.notifyChanges);
export const apiStageStatusSelector = createSelector(baseSelector, state => state.status);
export const apiStageVersionSelector = createSelector(baseSelector, state => state.version);
export const apiStageUptimePercentSelector = createSelector(baseSelector, state => state.uptimePercent);
export const apiStageVersionDeploymentDateSelector = createSelector(baseSelector, state => state.versionDeploymentDate);
