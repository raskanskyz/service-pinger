import { createSelector } from 'reselect';

const baseSelector = state => state.billingProd;

export const notifyBillingProdChangesSelector = createSelector(baseSelector, state => state.notifyChanges);
export const billingProdStatusSelector = createSelector(baseSelector, state => state.status);
export const billingProdVersionSelector = createSelector(baseSelector, state => state.version);
export const billingProdUptimePercentSelector = createSelector(baseSelector, state => state.uptimePercent);