import { ofType } from "redux-observable";
import io from "socket.io-client";
import { iif } from "rxjs";
import { withLatestFrom } from "rxjs/operators";

import { TOGGLE_MP_PROD_LISTEN, TOGGLE_OD_PROD_LISTEN } from "../actionTypes";

const socket = io("http://localhost:3000");

const toggleMPProdListen = action$ =>
    action$.pipe(
        ofType(TOGGLE_MP_PROD_LISTEN),
        withLatestFrom(/**current value in store */),
        tap(() => {
            socket.on("[prod] mp-client", msg => {
                console.log("TCL: msg", msg);
            });
        }),
        mapTo({ type: "PONG" })
    );

const toggleODProdListen = action$ =>
    action$.pipe(
        ofType(TOGGLE_OD_PROD_LISTEN),
        tap(() => {
            socket.on("[prod] org", msg => {
                console.log("TCL: msg", msg);
            });
        }),
        mapTo({ type: "PONG" })
    );

export default [listenProdStartEpic, toggleODProdListen];
