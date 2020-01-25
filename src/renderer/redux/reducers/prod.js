import { SET_STATUS_PROD } from "../actionTypes";

const initialStruct = {
    status: null,
    version: null
};

const initialState = {
    marketplace: { ...initialStruct },
    organization: { ...initialStruct }
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_STATUS_PROD: {
            return { ...state, ...action.payload };
        }
        default:
            return state;
    }
};
