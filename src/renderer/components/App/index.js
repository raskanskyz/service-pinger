import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Tabs } from "antd";
const { TabPane } = Tabs;

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

    const callback = key => {
        console.log(key);
    };

    return (
        <div>
            <Tabs defaultActiveKey="1" onChange={callback}>
                <TabPane tab="Prod" key="1">
                    <div>
                        mp prod version: {mpProdVersion}, status: {`${mpProdStatus}`}
                    </div>
                    <div>
                        od prod version: {odProdVersion}, status: {`${odProdStatus}`}
                    </div>
                </TabPane>
                <TabPane tab="Stage" key="2">
                    Content of Tab Pane 2
                </TabPane>
            </Tabs>
            ,
        </div>
    );
};
