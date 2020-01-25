import {
    SET_MP_PROD_LISTEN,
    SET_OD_PROD_LISTEN,
    ESTABLISH_CONNECTION,
    SET_OD_PROD_RESPONSE,
    SET_MP_PROD_RESPONSE
} from "./actionTypes";

export const establishConnectionAction = () => {
    return {
        type: ESTABLISH_CONNECTION
    };
};

export const closeConnectionAction = () => {
    return {
        type: CLOSE_CONNECTION
    };
};

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

export const setODProdResponseAction = payload => {
    return {
        type: SET_OD_PROD_RESPONSE,
        payload
    };
};

export const setMPProdResponseAction = payload => {
    return {
        type: SET_MP_PROD_RESPONSE,
        payload
    };
};
