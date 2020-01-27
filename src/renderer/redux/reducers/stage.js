import { START_MP_PROD_LISTEN, START_OD_PROD_LISTEN } from '../actionTypes';

const initialStruct = {
  status: null,
  version: null,
  isListening: false,
  failedAttempts: 0,
};

const initialState = {
  mp: { ...initialStruct },
  od: { ...initialStruct },
};

export default (state = initialState, action) => {
  switch (action.type) {
    // case START_MP_PROD_LISTEN: {
    //     return {
    //         ...state,
    //         mp: {
    //             ...state.mp,
    //             isListening: action.payload
    //         }
    //     };
    // }
    // case SET_OD_PROD_LISTEN: {
    //     return {
    //         ...state,
    //         od: {
    //             ...state.od,
    //             isListening: action.payload
    //         }
    //     };
    // }
    default:
      return state;
  }
};
