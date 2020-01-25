import { ofType } from "redux-observable";
import io from "socket.io-client";
import { withLatestFrom } from "rxjs/operators";

import { TOGGLE_MP_PROD_LISTEN, TOGGLE_OD_PROD_LISTEN, SET_MP_PROD_LISTEN, SET_OD_PROD_LISTEN } from "../actionTypes";
import { setMPProdListenAction, toggleMPProdListenAction } from "../actions";

const socket = io("http://localhost:3000");

const toggleMPProdListen = (action$, store) =>
    action$.pipe(
        ofType(TOGGLE_MP_PROD_LISTEN),
        withLatestFrom(store.getState()),
        map(prevIsListening => setMPProdListenAction(!prevIsListening))
    );

const toggleODProdListen = action$ =>
    action$.pipe(
        ofType(TOGGLE_OD_PROD_LISTEN),
        withLatestFrom(/**current value in store */),
        map(prevIsListening => toggleMPProdListenAction(!prevIsListening))
    );

const setMPProdListen = action$ =>
    action$.pipe(
        ofType(SET_MP_PROD_LISTEN),
        withLatestFrom(/**current value in store */),
        tap(() => {
            socket.on("[prod] mp-client", msg => {
                console.log("TCL: msg", msg);
            });
        }),
        mapTo({ type: "PONG" })
    );

const setODProdListen = action$ =>
    action$.pipe(
        ofType(SET_OD_PROD_LISTEN),
        withLatestFrom(/**current value in store */),
        tap(() => {
            socket.on("[prod] mp-client", msg => {
                console.log("TCL: msg", msg);
            });
        }),
        mapTo({ type: "PONG" })
    );

export default [setMPProdListen, setODProdListen, listenProdStartEpic, toggleODProdListen];
