import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import {
  Tabs, List, Switch, Badge,
} from 'antd';

import { establishConnectionAction, closeConnectionAction, notifyMPProdChangesAction } from '../../redux/actions';
import { mpProdStatusSelector, mpProdVersionSelector, notifyMPProdChangesSelector } from '../../redux/selectors/mpProd.selectors';

const { TabPane } = Tabs;

export default () => {
  const dispatch = useDispatch();

  const mpProdStatus = useSelector(mpProdStatusSelector);
  const mpProdVersion = useSelector(mpProdVersionSelector);
  const notifyMPProdChanges = useSelector(notifyMPProdChangesSelector);

  useEffect(() => {
    dispatch(establishConnectionAction());

    return () => {
      dispatch(closeConnectionAction());
    };
  }, []);

  const callback = (key) => {
    console.log('RapidLogs: callback -> key', key);
  };

  const data = [
    {
      key: 'mp-client',
      title: 'Marketplace',
      version: mpProdVersion,
      status: mpProdStatus,
      notifyChanges: notifyMPProdChanges,
    },
  ];

  const onChange = (checked, item) => {
    const actionMapper = {
      'mp-client': () => notifyMPProdChangesAction(checked),
    };

    return dispatch(actionMapper[item.key]());
  };

  const badgeRenderer = (status) => {
    const statusMapper = {
      true: { status: 'success' },
      false: { status: 'error' },
      null: { status: 'processing', color: '#faad14' },
    };

    return <Badge {...statusMapper[status]} />;
  };

  return (
    <div>
      <Tabs defaultActiveKey="1" onChange={callback}>
        <TabPane tab="Prod" key="1">
          <List
            itemLayout="horizontal"
            dataSource={data}
            renderItem={item => (
              <List.Item style={{ paddingLeft: '16px', paddingRight: '16px' }}>
                <List.Item.Meta
                  title={(
                    <span>
                      {badgeRenderer(item.status)}
                      {item.title}
                    </span>
                  )}
                  description={item.version}
                />
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Switch checked={item.notifyChanges} size="small" onChange={e => onChange(e, item)} />
                </div>
              </List.Item>
            )}
          />
        </TabPane>
        <TabPane tab="Stage" key="2">
          Content of Tab Pane 2
        </TabPane>
      </Tabs>
    </div>
  );
};
