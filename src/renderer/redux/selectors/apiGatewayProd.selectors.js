import { createSelector } from 'reselect';

const baseSelector = state => state.apiGatewayProd;

export const notifyApiGatewayProdChangesSelector = createSelector(baseSelector, state => state.notifyChanges);
export const apiGatewayProdStatusSelector = createSelector(baseSelector, state => state.status);
export const apiGatewayProdVersionSelector = createSelector(baseSelector, state => state.version);
export const apiGatewayProdPingHistorySelector = createSelector(baseSelector, state => state.pingHistory);
