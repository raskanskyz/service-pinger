import { createSelector } from 'reselect';

const baseSelector = state => state.issuesProd;

export const notifyIssuesProdChangesSelector = createSelector(baseSelector, state => state.notifyChanges);
export const issuesProdStatusSelector = createSelector(baseSelector, state => state.status);
export const issuesProdVersionSelector = createSelector(baseSelector, state => state.version);
export const issuesProdUptimePercentSelector = createSelector(baseSelector, state => state.uptimePercent);
export const issuesProdVersionDeploymentDateSelector = createSelector(baseSelector, state => state.versionDeploymentDate);
