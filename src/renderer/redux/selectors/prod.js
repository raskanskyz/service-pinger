import { createSelector } from "reselect";

const baseSelector = state => state.prod;

export const selectShoppingCartItems = createSelector(getProducts, getCartItemIds, (products, itemIds) =>
    itemIds.map(id => products[id])
);
