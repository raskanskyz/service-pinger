import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import {
    listenStageStartAction,
    listenProdStartAction,
    listenStageStopAction,
    listenProdStopAction
} from "../../redux/actions";

export default () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(listenStageStartAction());
        dispatch(listenProdStartAction());

        return () => {
            dispatch(listenStageStopAction());
            dispatch(listenProdStopAction());
        };
    }, []);

    return <div>electron connected</div>;
};
