import { SET_STATUS_STAGE } from "../actionTypes";

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
        case SET_STATUS_STAGE: {
            return { ...state, ...action.payload };
        }
        default:
            return state;
    }
};
