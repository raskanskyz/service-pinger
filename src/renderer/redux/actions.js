import { SET_MP_PROD_LISTEN, SET_OD_PROD_LISTEN } from "./actionTypes";

export const setMPProdListenAction = payload => {
    return {
        type: SET_MP_PROD_LISTEN,
        payload
    };
};

export const setODProdListenAction = payload => {
    return {
        type: SET_OD_PROD_LISTEN,
        payload
    };
};

export const toggleMPProdListenAction = payload => {
    return {
        type: TOGGLE_MP_PROD_LISTEN,
        payload
    };
};

export const toggleODProdListenAction = payload => {
    return {
        type: TOGGLE_OD_PROD_LISTEN,
        payload
    };
};
