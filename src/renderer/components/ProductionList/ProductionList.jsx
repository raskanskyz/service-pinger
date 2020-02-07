import React from 'react';
import { useSelector } from 'react-redux';

import { List, Switch } from 'antd';

import { SERVICE_KEY } from '../../consts';

// PLOP PROD LIST IMPORTS
import {
  echProdStatusSelector, echProdVersionSelector, notifyEchProdChangesSelector, echProdUptimePercentSelector,
} from '../../redux/selectors/echProd.selectors';

import {
  billingProdStatusSelector, billingProdVersionSelector, notifyBillingProdChangesSelector, billingProdUptimePercentSelector,
} from '../../redux/selectors/billingProd.selectors';

import {
  issuesProdStatusSelector, issuesProdVersionSelector, notifyIssuesProdChangesSelector, issuesProdUptimePercentSelector,
} from '../../redux/selectors/issuesProd.selectors';

import {
  mpProdStatusSelector, mpProdVersionSelector, notifyMPProdChangesSelector, mpProdUptimePercentSelector,
} from '../../redux/selectors/mpProd.selectors';
import {
  apiGatewayProdStatusSelector, apiGatewayProdVersionSelector, notifyApiGatewayProdChangesSelector, apiGatewayProdUptimePercentSelector,
} from '../../redux/selectors/apiGatewayProd.selectors';

import {
  aclProdStatusSelector, aclProdVersionSelector, notifyAclProdChangesSelector, aclProdUptimePercentSelector,
} from '../../redux/selectors/aclProd.selectors';
import {
  apiProdStatusSelector, apiProdVersionSelector, notifyApiProdChangesSelector, apiProdUptimePercentSelector,
} from '../../redux/selectors/apiProd.selectors';

export default ({ badgeRenderer, onChange }) => {
  // PLOP PROD LIST SELECTORS
  const echProdStatus = useSelector(echProdStatusSelector);
  const echProdVersion = useSelector(echProdVersionSelector);
  const notifyEchProdChanges = useSelector(notifyEchProdChangesSelector);
  const echProdUptimePercent = useSelector(echProdUptimePercentSelector);

  const billingProdStatus = useSelector(billingProdStatusSelector);
  const billingProdVersion = useSelector(billingProdVersionSelector);
  const notifyBillingProdChanges = useSelector(notifyBillingProdChangesSelector);
  const billingProdUptimePercent = useSelector(billingProdUptimePercentSelector);

  const issuesProdStatus = useSelector(issuesProdStatusSelector);
  const issuesProdVersion = useSelector(issuesProdVersionSelector);
  const notifyIssuesProdChanges = useSelector(notifyIssuesProdChangesSelector);
  const issuesProdUptimePercent = useSelector(issuesProdUptimePercentSelector);


  const mpProdStatus = useSelector(mpProdStatusSelector);
  const mpProdVersion = useSelector(mpProdVersionSelector);
  const notifyMPProdChanges = useSelector(notifyMPProdChangesSelector);
  const mpProdUptimePercent = useSelector(mpProdUptimePercentSelector);

  const apiGatewayProdStatus = useSelector(apiGatewayProdStatusSelector);
  const apiGatewayProdVersion = useSelector(apiGatewayProdVersionSelector);
  const notifyApiGatewayProdChanges = useSelector(notifyApiGatewayProdChangesSelector);
  const apiGatewayProdUptimePercent = useSelector(apiGatewayProdUptimePercentSelector);

  const aclProdStatus = useSelector(aclProdStatusSelector);
  const aclProdVersion = useSelector(aclProdVersionSelector);
  const notifyAclProdChanges = useSelector(notifyAclProdChangesSelector);
  const aclProdUptimePercent = useSelector(aclProdUptimePercentSelector);

  const apiProdStatus = useSelector(apiProdStatusSelector);
  const apiProdVersion = useSelector(apiProdVersionSelector);
  const notifyApiProdChanges = useSelector(notifyApiProdChangesSelector);
  const apiProdUptimePercent = useSelector(apiProdUptimePercentSelector);

  const data = [
    // PLOP PROD LIST DATA
    {
      key: SERVICE_KEY.ECH,
      title: 'Ech',
      version: echProdVersion,
      status: echProdStatus,
      notifyChanges: notifyEchProdChanges,
      uptimePercent: echProdUptimePercent,
    },

    {
      key: SERVICE_KEY.BILLING,
      title: 'Billing Service',
      version: billingProdVersion,
      status: billingProdStatus,
      notifyChanges: notifyBillingProdChanges,
      uptimePercent: billingProdUptimePercent,
    },

    {
      key: SERVICE_KEY.ISSUES,
      title: 'Issues Service',
      version: issuesProdVersion,
      status: issuesProdStatus,
      notifyChanges: notifyIssuesProdChanges,
      uptimePercent: issuesProdUptimePercent,
    },

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
