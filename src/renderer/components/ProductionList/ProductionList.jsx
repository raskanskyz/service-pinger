import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  orderBy, map,
} from 'lodash-es';
import { Switch, Collapse } from 'antd';

import { SERVICE_KEY } from '../../consts';

// PLOP PROD LIST IMPORTS
import {
  searchProdStatusSelector, searchProdVersionSelector, notifySearchProdChangesSelector, searchProdUptimePercentSelector, searchProdVersionDeploymentDateSelector,
} from '../../redux/selectors/searchProd.selectors';

import {
  provisioningProdStatusSelector, provisioningProdVersionSelector, notifyProvisioningProdChangesSelector, provisioningProdUptimePercentSelector, provisioningProdVersionDeploymentDateSelector,
} from '../../redux/selectors/provisioningProd.selectors';

import {
  echProdStatusSelector,
  echProdVersionSelector,
  notifyEchProdChangesSelector,
  echProdUptimePercentSelector,
  echProdVersionDeploymentDateSelector,
} from '../../redux/selectors/echProd.selectors';

import {
  billingProdStatusSelector,
  billingProdVersionSelector,
  notifyBillingProdChangesSelector,
  billingProdUptimePercentSelector,
  billingProdVersionDeploymentDateSelector,
} from '../../redux/selectors/billingProd.selectors';

import {
  issuesProdStatusSelector,
  issuesProdVersionSelector,
  notifyIssuesProdChangesSelector,
  issuesProdUptimePercentSelector,
  issuesProdVersionDeploymentDateSelector,
} from '../../redux/selectors/issuesProd.selectors';

import {
  mpProdStatusSelector, mpProdVersionSelector, notifyMPProdChangesSelector, mpProdUptimePercentSelector, mpProdVersionDeploymentDateSelector,
} from '../../redux/selectors/mpProd.selectors';
import {
  apiGatewayProdStatusSelector,
  apiGatewayProdVersionSelector,
  notifyApiGatewayProdChangesSelector,
  apiGatewayProdUptimePercentSelector,
  apiGatewayProdVersionDeploymentDateSelector,
} from '../../redux/selectors/apiGatewayProd.selectors';

import {
  aclProdStatusSelector,
  aclProdVersionSelector,
  notifyAclProdChangesSelector,
  aclProdUptimePercentSelector,
  aclProdVersionDeploymentDateSelector,
} from '../../redux/selectors/aclProd.selectors';
import {
  apiProdStatusSelector,
  apiProdVersionSelector,
  notifyApiProdChangesSelector,
  apiProdUptimePercentSelector,
  apiProdVersionDeploymentDateSelector,
} from '../../redux/selectors/apiProd.selectors';

const { Panel } = Collapse;

export default ({ badgeRenderer, onChange }) => {
  // PLOP PROD LIST SELECTORS
  const searchProdStatus = useSelector(searchProdStatusSelector);
  const searchProdVersion = useSelector(searchProdVersionSelector);
  const notifySearchProdChanges = useSelector(notifySearchProdChangesSelector);
  const searchProdUptimePercent = useSelector(searchProdUptimePercentSelector);
  const searchProdVersionDeploymentDate = useSelector(searchProdVersionDeploymentDateSelector);

  const provisioningProdStatus = useSelector(provisioningProdStatusSelector);
  const provisioningProdVersion = useSelector(provisioningProdVersionSelector);
  const notifyProvisioningProdChanges = useSelector(notifyProvisioningProdChangesSelector);
  const provisioningProdUptimePercent = useSelector(provisioningProdUptimePercentSelector);
  const provisioningProdVersionDeploymentDate = useSelector(provisioningProdVersionDeploymentDateSelector);

  const echProdStatus = useSelector(echProdStatusSelector);
  const echProdVersion = useSelector(echProdVersionSelector);
  const notifyEchProdChanges = useSelector(notifyEchProdChangesSelector);
  const echProdUptimePercent = useSelector(echProdUptimePercentSelector);
  const echProdVersionDeploymentDate = useSelector(echProdVersionDeploymentDateSelector);

  const billingProdStatus = useSelector(billingProdStatusSelector);
  const billingProdVersion = useSelector(billingProdVersionSelector);
  const notifyBillingProdChanges = useSelector(notifyBillingProdChangesSelector);
  const billingProdUptimePercent = useSelector(billingProdUptimePercentSelector);
  const billingProdVersionDeploymentDate = useSelector(billingProdVersionDeploymentDateSelector);

  const issuesProdStatus = useSelector(issuesProdStatusSelector);
  const issuesProdVersion = useSelector(issuesProdVersionSelector);
  const notifyIssuesProdChanges = useSelector(notifyIssuesProdChangesSelector);
  const issuesProdUptimePercent = useSelector(issuesProdUptimePercentSelector);
  const issuesProdVersionDeploymentDate = useSelector(issuesProdVersionDeploymentDateSelector);

  const mpProdStatus = useSelector(mpProdStatusSelector);
  const mpProdVersion = useSelector(mpProdVersionSelector);
  const notifyMPProdChanges = useSelector(notifyMPProdChangesSelector);
  const mpProdUptimePercent = useSelector(mpProdUptimePercentSelector);
  const mpProdVersionDeploymentDate = useSelector(mpProdVersionDeploymentDateSelector);

  const apiGatewayProdStatus = useSelector(apiGatewayProdStatusSelector);
  const apiGatewayProdVersion = useSelector(apiGatewayProdVersionSelector);
  const notifyApiGatewayProdChanges = useSelector(notifyApiGatewayProdChangesSelector);
  const apiGatewayProdUptimePercent = useSelector(apiGatewayProdUptimePercentSelector);
  const apiGatewayProdVersionDeploymentDate = useSelector(apiGatewayProdVersionDeploymentDateSelector);

  const aclProdStatus = useSelector(aclProdStatusSelector);
  const aclProdVersion = useSelector(aclProdVersionSelector);
  const notifyAclProdChanges = useSelector(notifyAclProdChangesSelector);
  const aclProdUptimePercent = useSelector(aclProdUptimePercentSelector);
  const aclProdVersionDeploymentDate = useSelector(aclProdVersionDeploymentDateSelector);

  const apiProdStatus = useSelector(apiProdStatusSelector);
  const apiProdVersion = useSelector(apiProdVersionSelector);
  const notifyApiProdChanges = useSelector(notifyApiProdChangesSelector);
  const apiProdUptimePercent = useSelector(apiProdUptimePercentSelector);
  const apiProdVersionDeploymentDate = useSelector(apiProdVersionDeploymentDateSelector);

  const data = orderBy(
    [
      // PLOP PROD LIST DATA
    {
      key: SERVICE_KEY.SEARCH,
      title: 'Search Service',
      version: searchProdVersion,
      status: searchProdStatus,
      notifyChanges: notifySearchProdChanges,
      uptimePercent: searchProdUptimePercent,
      versionDeploymentDate: searchProdVersionDeploymentDate,
    },

      {
        key: SERVICE_KEY.PROVISIONING,
        title: 'Provisioning Service',
        version: provisioningProdVersion,
        status: provisioningProdStatus,
        notifyChanges: notifyProvisioningProdChanges,
        uptimePercent: provisioningProdUptimePercent,
        versionDeploymentDate: provisioningProdVersionDeploymentDate,
      },
      {
        key: SERVICE_KEY.ECH,
        title: 'Ech',
        version: echProdVersion,
        status: echProdStatus,
        notifyChanges: notifyEchProdChanges,
        uptimePercent: echProdUptimePercent.toFixed(2),
        versionDeploymentDate: echProdVersionDeploymentDate,
      },

      {
        key: SERVICE_KEY.BILLING,
        title: 'Billing Service',
        version: billingProdVersion,
        status: billingProdStatus,
        notifyChanges: notifyBillingProdChanges,
        uptimePercent: billingProdUptimePercent.toFixed(2),
        versionDeploymentDate: billingProdVersionDeploymentDate,
      },

      {
        key: SERVICE_KEY.ISSUES,
        title: 'Issues Service',
        version: issuesProdVersion,
        status: issuesProdStatus,
        notifyChanges: notifyIssuesProdChanges,
        uptimePercent: issuesProdUptimePercent.toFixed(2),
        versionDeploymentDate: issuesProdVersionDeploymentDate,
      },

      {
        key: SERVICE_KEY.MARKETPLACE,
        title: 'Marketplace',
        version: mpProdVersion,
        status: mpProdStatus,
        notifyChanges: notifyMPProdChanges,
        uptimePercent: mpProdUptimePercent.toFixed(2),
        versionDeploymentDate: mpProdVersionDeploymentDate,
      },
      {
        key: SERVICE_KEY.API_GATEWAY,
        title: 'Api Gateway',
        version: apiGatewayProdVersion,
        status: apiGatewayProdStatus,
        notifyChanges: notifyApiGatewayProdChanges,
        uptimePercent: apiGatewayProdUptimePercent.toFixed(2),
        versionDeploymentDate: apiGatewayProdVersionDeploymentDate,
      },
      {
        key: SERVICE_KEY.ACL,
        title: 'ACL',
        version: aclProdVersion,
        status: aclProdStatus,
        notifyChanges: notifyAclProdChanges,
        uptimePercent: aclProdUptimePercent.toFixed(2),
        versionDeploymentDate: aclProdVersionDeploymentDate,
      },
      {
        key: SERVICE_KEY.API,
        title: 'Api Service',
        version: apiProdVersion,
        status: apiProdStatus,
        notifyChanges: notifyApiProdChanges,
        uptimePercent: apiProdUptimePercent.toFixed(2),
        versionDeploymentDate: apiProdVersionDeploymentDate,
      },
    ],
    ['status', 'title'],
    ['asc', 'asc'],
  );

  const itemRenderer = item => (
    <Panel
      key={item.key}
      style={{ cursor: 'pointer' }}
      header={(
        <div
          style={{
            cursor: 'pointer',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <span style={{ cursor: 'pointer' }}>
              {badgeRenderer(item.status)}
              {item.title}
            </span>
          </div>
          <Switch
            checked={item.notifyChanges}
            size="small"
            onChange={(checked, event) => {
              event.preventDefault();
              event.stopPropagation();
              onChange(checked, 'prod', item);
            }}
          />
        </div>
      )}
    >
      <div>
        <div>{`version: ${item.version}`}</div>
        <div>{`deployment date: ${item.versionDeploymentDate}`}</div>
        <div>{`uptime: ${item.uptimePercent}%`}</div>
      </div>
    </Panel>
  );

  return (
    <Collapse bordered={false}>
      {map(data, itemRenderer)}
    </Collapse>
  );
};
