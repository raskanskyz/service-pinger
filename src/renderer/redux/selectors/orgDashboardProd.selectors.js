import { createSelector } from 'reselect';

const baseSelector = state => state.orgDashboardProd;

export const notifyOrgDashboardProdChangesSelector = createSelector(baseSelector, state => state.notifyChanges);
export const orgDashboardProdStatusSelector = createSelector(baseSelector, state => state.status);
export const orgDashboardProdVersionSelector = createSelector(baseSelector, state => state.version);
export const orgDashboardProdPingHistorySelector = createSelector(baseSelector, state => state.pingHistory);
