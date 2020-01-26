import { ofType } from "redux-observable";
import io from "socket.io-client";
import { fromEvent } from "rxjs";
import { withLatestFrom, map, ignoreElements, mergeMap, tap, switchMap } from "rxjs/operators";

import {
    TOGGLE_MP_PROD_LISTEN,
    TOGGLE_OD_PROD_LISTEN,
    SET_MP_PROD_LISTEN,
    SET_OD_PROD_LISTEN,
    ESTABLISH_CONNECTION,
    CLOSE_CONNECTION
} from "../actionTypes";
import {
    setMPProdListenAction,
    setODProdListenAction,
    setMPProdResponseAction,
    setODProdResponseAction
} from "../actions";
import { isMPListeningSelector, isODListeningSelector } from "../selectors/prod";

let socket;
const establishConnection = action$ => {
    return action$.pipe(
        ofType(ESTABLISH_CONNECTION),
        tap(() => console.log("before connect")),
        switchMap(() => {
            socket = io("http://localhost:3000");

            return fromEvent(socket, "connect");
        }),
        tap(() => console.log("after connect")),
        mergeMap(() => [setMPProdListenAction(true), setODProdListenAction(true)])
    );
};

const closeConnection = action$ => {
    return action$.pipe(
        ofType(CLOSE_CONNECTION),
        tap(() => console.log("CLOSE CONNECTION")),
        switchMap(() => fromEvent(connection, "disconnect")),
        ignoreElements()
    );
};

const toggleMPProdListen = (action$, state$) => {
    return action$.pipe(
        ofType(TOGGLE_MP_PROD_LISTEN),
        withLatestFrom(state$),
        map(([, state]) => isMPListeningSelector(state)),
        map(prevIsListening => setMPProdListenAction(!prevIsListening))
    );
};

const toggleODProdListen = (action$, state$) =>
    action$.pipe(
        ofType(TOGGLE_OD_PROD_LISTEN),
        withLatestFrom(state$),
        map(([, state]) => isODListeningSelector(state)),
        map(prevIsListening => setODProdListenAction(!prevIsListening))
    );

const setMPProdListen = action$ =>
    action$.pipe(
        ofType(SET_MP_PROD_LISTEN),
        switchMap(() => fromEvent(socket, "[prod] mp-client")),
        map(setMPProdResponseAction)
    );

const setODProdListen = action$ =>
    action$.pipe(
        ofType(SET_OD_PROD_LISTEN),
        switchMap(() => fromEvent(socket, "[prod] org")),
        tap(console.log),
        map(setODProdResponseAction)
    );

export default [
    establishConnection,
    closeConnection,
    toggleMPProdListen,
    setMPProdListen,
    setODProdListen,
    toggleODProdListen
];
