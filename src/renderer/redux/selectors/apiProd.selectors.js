import { createSelector } from 'reselect';

const baseSelector = state => state.apiProd;

export const notifyApiProdChangesSelector = createSelector(baseSelector, state => state.notifyChanges);
export const apiProdStatusSelector = createSelector(baseSelector, state => state.status);
export const apiProdVersionSelector = createSelector(baseSelector, state => state.version);
export const apiProdUptimePercentSelector = createSelector(baseSelector, state => state.uptimePercent);
