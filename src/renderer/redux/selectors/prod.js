import { createSelector } from "reselect";

const baseSelector = state => state.prod;
const baseMPSelector = createSelector(baseSelector, prod => prod.mp);
const baseODSelector = createSelector(baseSelector, prod => prod.od);

export const isMPListeningSelector = createSelector(baseMPSelector, mp => mp.isListening);
export const isODListeningSelector = createSelector(baseODSelector, od => od.isListening);

export const mpProdStatusSelector = createSelector(baseMPSelector, mp => mp.status);
export const odProdStatusSelector = createSelector(baseODSelector, od => od.status);

export const mpProdVersionSelector = createSelector(baseMPSelector, mp => mp.version);
export const odProdVersionSelector = createSelector(baseODSelector, od => od.version);
