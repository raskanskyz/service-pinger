import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import {
//   XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar,
// } from 'recharts';
import {
  Tabs, List, Switch, Badge,
} from 'antd';

import { establishConnectionAction, closeConnectionAction, notifyChangesAction } from '../../redux/actions';
import {
  mpProdStatusSelector, mpProdVersionSelector, notifyMPProdChangesSelector, mpProdPingHistorySelector,
} from '../../redux/selectors/mpProd.selectors';
import {
  apiGatewayProdStatusSelector, apiGatewayProdVersionSelector, notifyApiGatewayProdChangesSelector, apiGatewayProdPingHistorySelector,
} from '../../redux/selectors/apiGatewayProd.selectors';
import { SERVICE_KEY } from '../../consts';

const { TabPane } = Tabs;

export default () => {
  const dispatch = useDispatch();

  const mpProdStatus = useSelector(mpProdStatusSelector);
  const mpProdVersion = useSelector(mpProdVersionSelector);
  const notifyMPProdChanges = useSelector(notifyMPProdChangesSelector);
  const mpProdPingHistory = useSelector(mpProdPingHistorySelector);

  const apiGatewayProdStatus = useSelector(apiGatewayProdStatusSelector);
  const apiGatewayProdVersion = useSelector(apiGatewayProdVersionSelector);
  const notifyApiGatewayProdChanges = useSelector(notifyApiGatewayProdChangesSelector);
  const apiGatewayProdPingHistory = useSelector(apiGatewayProdPingHistorySelector);

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
      key: SERVICE_KEY.MARKETPLACE,
      title: 'Marketplace',
      version: mpProdVersion,
      status: mpProdStatus,
      notifyChanges: notifyMPProdChanges,
      pingHistory: mpProdPingHistory.map(status => ({ status: status ? 1 : 0 })),
    },
    {
      key: SERVICE_KEY.API_GATEWAY,
      title: 'Api Gateway',
      version: apiGatewayProdVersion,
      status: apiGatewayProdStatus,
      notifyChanges: notifyApiGatewayProdChanges,
      pingHistory: apiGatewayProdPingHistory.map(status => ({ status: status ? 1 : 0 })),
    },
  ];

  const onChange = (checked, env, item) => dispatch(notifyChangesAction(env, item.key, checked));

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
                  <Switch checked={item.notifyChanges} size="small" onChange={e => onChange(e, 'prod', item)} />
                </div>
                {/* <ResponsiveContainer> */}
                {/* <BarChart width={300} height={200} data={item.pingHistory}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis />
                  <YAxis type="number" domain={[0, 1]} allowDecimals={false} />
                  <Tooltip />
                  <Legend />
                  <Bar name="uptime" dataKey="status" fill="#8884d8" />
                </BarChart> */}
                {/* </ResponsiveContainer> */}
              </List.Item>
            )}
          />
        </TabPane>
        <TabPane tab="Stage" key="2" />
      </Tabs>
    </div>
  );
};
