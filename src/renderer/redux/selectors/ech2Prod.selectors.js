import { createSelector } from 'reselect';

const baseSelector = state => state.ech2Prod;

export const notifyEch2ProdChangesSelector = createSelector(baseSelector, state => state.notifyChanges);
export const ech2ProdStatusSelector = createSelector(baseSelector, state => state.status);
export const ech2ProdVersionSelector = createSelector(baseSelector, state => state.version);
export const ech2ProdUptimePercentSelector = createSelector(baseSelector, state => state.uptimePercent);
export const ech2ProdVersionDeploymentDateSelector = createSelector(baseSelector, state => state.versionDeploymentDate);