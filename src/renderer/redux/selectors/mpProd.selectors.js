import { createSelector } from 'reselect';

const baseSelector = state => state.mpProd;

export const notifyMPProdChangesSelector = createSelector(baseSelector, state => state.notifyChanges);
export const mpProdStatusSelector = createSelector(baseSelector, state => state.status);
export const mpProdVersionSelector = createSelector(baseSelector, state => state.version);
export const mpProdPingHistorySelector = createSelector(baseSelector, state => state.pingHistory);
