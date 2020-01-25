import { SET_MP_PROD_LISTEN, SET_OD_PROD_LISTEN, SET_MP_PROD_RESPONSE, SET_OD_PROD_RESPONSE } from "../actionTypes";

const initialStruct = {
    status: null,
    version: null,
    isListening: false,
    failedAttempts: 0
};

const initialState = {
    mp: { ...initialStruct },
    od: { ...initialStruct }
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_MP_PROD_LISTEN: {
            return {
                ...state,
                mp: {
                    ...state.mp,
                    isListening: action.payload
                }
            };
        }
        case SET_OD_PROD_LISTEN: {
            return {
                ...state,
                od: {
                    ...state.od,
                    isListening: action.payload
                }
            };
        }
        case SET_MP_PROD_RESPONSE:
            return { ...state, mp: { ...state.mp, ...action.payload } };
        case SET_OD_PROD_RESPONSE:
            return { ...state, od: { ...state.od, ...action.payload } };
        default:
            return state;
    }
};
