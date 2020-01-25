import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { establishConnectionAction } from "../../redux/actions";
import {
    mpProdStatusSelector,
    odProdStatusSelector,
    mpProdVersionSelector,
    odProdVersionSelector
} from "../../redux/selectors/prod";

export default () => {
    const dispatch = useDispatch();

    const mpProdStatus = useSelector(mpProdStatusSelector);
    const odProdStatus = useSelector(odProdStatusSelector);
    const mpProdVersion = useSelector(mpProdVersionSelector);
    const odProdVersion = useSelector(odProdVersionSelector);

    useEffect(() => {
        dispatch(establishConnectionAction());
        return () => {
            dispatch(establishConnectionAction());
        };
    }, []);

    return (
        <div>
            <div>
                mp prod version: {mpProdVersion}, status: {`${mpProdStatus}`}
            </div>
            <div>
                od prod version: {odProdVersion}, status: {`${odProdStatus}`}
            </div>
        </div>
    );
};
