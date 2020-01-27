import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Tabs, List, Switch, Badge,
} from 'antd';

import {
  establishConnectionAction,
  closeConnectionAction,
  notifyMPProdChangesAction,
  notifyODProdChangesAction,
} from '../../redux/actions';
import {
  mpProdStatusSelector,
  odProdStatusSelector,
  mpProdVersionSelector,
  odProdVersionSelector,
  notifyMPProdChangesSelector,
  notifyODProdChangesSelector,
} from '../../redux/selectors/prod';

const { TabPane } = Tabs;

export default () => {
  const dispatch = useDispatch();

  const mpProdStatus = useSelector(mpProdStatusSelector);
  const odProdStatus = useSelector(odProdStatusSelector);
  const mpProdVersion = useSelector(mpProdVersionSelector);
  const odProdVersion = useSelector(odProdVersionSelector);
  const notifyMPProdChanges = useSelector(notifyMPProdChangesSelector);
  const notifyODProdChanges = useSelector(notifyODProdChangesSelector);

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
    {
      key: 'org',
      title: 'Organization Dashboard',
      version: odProdVersion,
      status: odProdStatus,
      notifyChanges: notifyODProdChanges,
    },
  ];

  const onChange = (checked, item) => {
    const actionMapper = {
      'mp-client': () => notifyMPProdChangesAction(checked),
      org: () => notifyODProdChangesAction(checked),
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
