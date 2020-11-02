import { createSelector } from 'reselect';

const baseSelector = state => state.issuesStage;

export const notifyIssuesStageChangesSelector = createSelector(baseSelector, state => state.notifyChanges);
export const issuesStageStatusSelector = createSelector(baseSelector, state => state.status);
export const issuesStageVersionSelector = createSelector(baseSelector, state => state.version);
export const issuesStageUptimePercentSelector = createSelector(baseSelector, state => state.uptimePercent);
export const issuesStageVersionDeploymentDateSelector = createSelector(baseSelector, state => state.versionDeploymentDate);
