import { createSelector } from 'reselect';

const baseSelector = state => state.ech2Stage;

export const notifyEch2StageChangesSelector = createSelector(baseSelector, state => state.notifyChanges);
export const ech2StageStatusSelector = createSelector(baseSelector, state => state.status);
export const ech2StageVersionSelector = createSelector(baseSelector, state => state.version);
export const ech2StageUptimePercentSelector = createSelector(baseSelector, state => state.uptimePercent);
export const ech2StageVersionDeploymentDateSelector = createSelector(baseSelector, state => state.versionDeploymentDate);