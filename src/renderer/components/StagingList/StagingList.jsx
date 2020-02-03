import React from 'react';
import { useSelector } from 'react-redux';

import { List, Switch } from 'antd';

import { SERVICE_KEY } from '../../consts';
import {
  mpProdStatusSelector, mpProdVersionSelector, notifyMPProdChangesSelector, mpProdUptimePercentSelector,
} from '../../redux/selectors/mpProd.selectors';
import {
  apiGatewayProdStatusSelector, apiGatewayProdVersionSelector, notifyApiGatewayProdChangesSelector, apiGatewayProdUptimePercentSelector,
} from '../../redux/selectors/apiGatewayProd.selectors';
import {
  orgDashboardProdStatusSelector,
  orgDashboardProdVersionSelector,
  notifyOrgDashboardProdChangesSelector,
  orgDashboardProdUptimePercentSelector,
} from '../../redux/selectors/orgDashboardProd.selectors';
import {
  aclProdStatusSelector, aclProdVersionSelector, notifyAclProdChangesSelector, aclProdUptimePercentSelector,
} from '../../redux/selectors/aclProd.selectors';
import {
  apiProdStatusSelector, apiProdVersionSelector, notifyApiProdChangesSelector, apiProdUptimePercentSelector,
} from '../../redux/selectors/apiProd.selectors';

export default ({ badgeRenderer, onChange }) => {
  const mpProdStatus = useSelector(mpProdStatusSelector);
  const mpProdVersion = useSelector(mpProdVersionSelector);
  const notifyMPProdChanges = useSelector(notifyMPProdChangesSelector);
  const mpProdUptimePercent = useSelector(mpProdUptimePercentSelector);

  const apiGatewayProdStatus = useSelector(apiGatewayProdStatusSelector);
  const apiGatewayProdVersion = useSelector(apiGatewayProdVersionSelector);
  const notifyApiGatewayProdChanges = useSelector(notifyApiGatewayProdChangesSelector);
  const apiGatewayProdUptimePercent = useSelector(apiGatewayProdUptimePercentSelector);

  const orgDashboardProdStatus = useSelector(orgDashboardProdStatusSelector);
  const orgDashboardProdVersion = useSelector(orgDashboardProdVersionSelector);
  const notifyOrgDashboardProdChanges = useSelector(notifyOrgDashboardProdChangesSelector);
  const orgDashboardProdUptimePercent = useSelector(orgDashboardProdUptimePercentSelector);

  const aclProdStatus = useSelector(aclProdStatusSelector);
  const aclProdVersion = useSelector(aclProdVersionSelector);
  const notifyAclProdChanges = useSelector(notifyAclProdChangesSelector);
  const aclProdUptimePercent = useSelector(aclProdUptimePercentSelector);

  const apiProdStatus = useSelector(apiProdStatusSelector);
  const apiProdVersion = useSelector(apiProdVersionSelector);
  const notifyApiProdChanges = useSelector(notifyApiProdChangesSelector);
  const apiProdUptimePercent = useSelector(apiProdUptimePercentSelector);

  const data = [
    {
      key: SERVICE_KEY.MARKETPLACE,
      title: 'Marketplace',
      version: mpProdVersion,
      status: mpProdStatus,
      notifyChanges: notifyMPProdChanges,
      uptimePercent: mpProdUptimePercent,
    },
    {
      key: SERVICE_KEY.API_GATEWAY,
      title: 'Api Gateway',
      version: apiGatewayProdVersion,
      status: apiGatewayProdStatus,
      notifyChanges: notifyApiGatewayProdChanges,
      uptimePercent: apiGatewayProdUptimePercent,
    },
    {
      key: SERVICE_KEY.ORG_DASHBOARD,
      title: 'Org Dashboard',
      version: orgDashboardProdVersion,
      status: orgDashboardProdStatus,
      notifyChanges: notifyOrgDashboardProdChanges,
      uptimePercent: orgDashboardProdUptimePercent,
    },
    {
      key: SERVICE_KEY.ACL,
      title: 'ACL',
      version: aclProdVersion,
      status: aclProdStatus,
      notifyChanges: notifyAclProdChanges,
      uptimePercent: aclProdUptimePercent,
    },
    {
      key: SERVICE_KEY.API,
      title: 'Api Service',
      version: apiProdVersion,
      status: apiProdStatus,
      notifyChanges: notifyApiProdChanges,
      uptimePercent: apiProdUptimePercent,
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
