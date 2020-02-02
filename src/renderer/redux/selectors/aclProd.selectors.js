import { createSelector } from 'reselect';

const baseSelector = state => state.aclProd;

export const notifyAclProdChangesSelector = createSelector(baseSelector, state => state.notifyChanges);
export const aclProdStatusSelector = createSelector(baseSelector, state => state.status);
export const aclProdVersionSelector = createSelector(baseSelector, state => state.version);
export const aclProdPingHistorySelector = createSelector(baseSelector, state => state.pingHistory);
