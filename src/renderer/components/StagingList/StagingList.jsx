import React from 'react';
import { useSelector } from 'react-redux';

import { List, Switch } from 'antd';

import { SERVICE_KEY } from '../../consts';
import {
  mpProdStatusSelector, mpProdVersionSelector, notifyMPProdChangesSelector, mpProdPingHistorySelector,
} from '../../redux/selectors/mpProd.selectors';
import {
  apiGatewayProdStatusSelector, apiGatewayProdVersionSelector, notifyApiGatewayProdChangesSelector, apiGatewayProdPingHistorySelector,
} from '../../redux/selectors/apiGatewayProd.selectors';
import {
  orgDashboardProdStatusSelector,
  orgDashboardProdVersionSelector,
  notifyOrgDashboardProdChangesSelector,
  orgDashboardProdPingHistorySelector,
} from '../../redux/selectors/orgDashboardProd.selectors';
import {
  aclProdStatusSelector, aclProdVersionSelector, notifyAclProdChangesSelector, aclProdPingHistorySelector,
} from '../../redux/selectors/aclProd.selectors';
import {
  apiProdStatusSelector, apiProdVersionSelector, notifyApiProdChangesSelector, apiProdPingHistorySelector,
} from '../../redux/selectors/apiProd.selectors';

export default ({ badgeRenderer, onChange }) => {
  const mpProdStatus = useSelector(mpProdStatusSelector);
  const mpProdVersion = useSelector(mpProdVersionSelector);
  const notifyMPProdChanges = useSelector(notifyMPProdChangesSelector);
  const mpProdPingHistory = useSelector(mpProdPingHistorySelector);

  const apiGatewayProdStatus = useSelector(apiGatewayProdStatusSelector);
  const apiGatewayProdVersion = useSelector(apiGatewayProdVersionSelector);
  const notifyApiGatewayProdChanges = useSelector(notifyApiGatewayProdChangesSelector);
  const apiGatewayProdPingHistory = useSelector(apiGatewayProdPingHistorySelector);

  const orgDashboardProdStatus = useSelector(orgDashboardProdStatusSelector);
  const orgDashboardProdVersion = useSelector(orgDashboardProdVersionSelector);
  const notifyOrgDashboardProdChanges = useSelector(notifyOrgDashboardProdChangesSelector);
  const orgDashboardProdPingHistory = useSelector(orgDashboardProdPingHistorySelector);

  const aclProdStatus = useSelector(aclProdStatusSelector);
  const aclProdVersion = useSelector(aclProdVersionSelector);
  const notifyAclProdChanges = useSelector(notifyAclProdChangesSelector);
  const aclProdPingHistory = useSelector(aclProdPingHistorySelector);

  const apiProdStatus = useSelector(apiProdStatusSelector);
  const apiProdVersion = useSelector(apiProdVersionSelector);
  const notifyApiProdChanges = useSelector(notifyApiProdChangesSelector);
  const apiProdPingHistory = useSelector(apiProdPingHistorySelector);

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
    {
      key: SERVICE_KEY.ORG_DASHBOARD,
      title: 'Org Dashboard',
      version: orgDashboardProdVersion,
      status: orgDashboardProdStatus,
      notifyChanges: notifyOrgDashboardProdChanges,
      pingHistory: orgDashboardProdPingHistory.map(status => ({ status: status ? 1 : 0 })),
    },
    {
      key: SERVICE_KEY.ACL,
      title: 'ACL',
      version: aclProdVersion,
      status: aclProdStatus,
      notifyChanges: notifyAclProdChanges,
      pingHistory: aclProdPingHistory.map(status => ({ status: status ? 1 : 0 })),
    },
    {
      key: SERVICE_KEY.API,
      title: 'Api Service',
      version: apiProdVersion,
      status: apiProdStatus,
      notifyChanges: notifyApiProdChanges,
      pingHistory: apiProdPingHistory.map(status => ({ status: status ? 1 : 0 })),
    },
  ];

  return (
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
        </List.Item>
      )}
    />
  );
};
