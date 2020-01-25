import {
    LISTEN_STAGE_START,
    LISTEN_STAGE_STOP,
    LISTEN_PROD_START,
    LISTEN_PROD_STOP,
    SET_STATUS_STAGE,
    SET_STATUS_PROD
} from "./actionTypes";

export const listenStageStartAction = () => {
    return {
        type: LISTEN_STAGE_START
    };
};

export const listenStageStopAction = () => {
    return {
        type: LISTEN_STAGE_STOP
    };
};

export const listenProdStartAction = () => {
    return {
        type: LISTEN_PROD_START
    };
};

export const listenProdStopAction = () => {
    return {
        type: LISTEN_PROD_STOP
    };
};

export const setStatusStageAction = payload => {
    return {
        type: SET_STATUS_STAGE,
        payload
    };
};

export const setStatusProdAction = payload => {
    return {
        type: SET_STATUS_PROD,
        payload
    };
};

export const toggleProdListen = payload => {
    return {
        type: SET_MP_PROD_LISTEN,
        payload
    };
};

export const toggleODProdListen = payload => {
    return {
        type: SET_OD_PROD_LISTEN,
        payload
    };
};
