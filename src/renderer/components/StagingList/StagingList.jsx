import React from 'react';
import { useSelector } from 'react-redux';
import { orderBy } from 'lodash-es';

import { List } from 'antd';

import { SERVICE_KEY } from '../../consts';
import ListItem from '../ListItem/ListItem';

// PLOP STAGE LIST IMPORTS
import {
  aclServiceStageStatusSelector, aclServiceStageVersionSelector, notifyAclServiceStageChangesSelector, aclServiceStageUptimePercentSelector, aclServiceStageVersionDeploymentDateSelector,
} from '../../redux/selectors/aclServiceStage.selectors';

import {
  provisioningStageStatusSelector, provisioningStageVersionSelector, notifyProvisioningStageChangesSelector, provisioningStageUptimePercentSelector, provisioningStageVersionDeploymentDateSelector,
} from '../../redux/selectors/provisioningStage.selectors';

import {
  aclV2StageStatusSelector, aclV2StageVersionSelector, notifyAclV2StageChangesSelector, aclV2StageUptimePercentSelector, aclV2StageVersionDeploymentDateSelector,
} from '../../redux/selectors/aclV2Stage.selectors';

import {
  issuesStageStatusSelector, issuesStageVersionSelector, notifyIssuesStageChangesSelector, issuesStageUptimePercentSelector, issuesStageVersionDeploymentDateSelector,
} from '../../redux/selectors/issuesStage.selectors';

import {
  ech2StageStatusSelector, ech2StageVersionSelector, notifyEch2StageChangesSelector, ech2StageUptimePercentSelector, ech2StageVersionDeploymentDateSelector,
} from '../../redux/selectors/ech2Stage.selectors';

import {
  apiStageStatusSelector, apiStageVersionSelector, notifyApiStageChangesSelector, apiStageUptimePercentSelector,
} from '../../redux/selectors/apiStage.selectors';

export default ({ onChange }) => {
  // PLOP STAGE LIST SELECTORS

  const aclServiceStageStatus = useSelector(aclServiceStageStatusSelector);
  const aclServiceStageVersion = useSelector(aclServiceStageVersionSelector);
  const notifyAclServiceStageChanges = useSelector(notifyAclServiceStageChangesSelector);
  const aclServiceStageUptimePercent = useSelector(aclServiceStageUptimePercentSelector);
  const aclServiceStageVersionDeploymentDate = useSelector(aclServiceStageVersionDeploymentDateSelector);

  const provisioningStageStatus = useSelector(provisioningStageStatusSelector);
  const provisioningStageVersion = useSelector(provisioningStageVersionSelector);
  const notifyProvisioningStageChanges = useSelector(notifyProvisioningStageChangesSelector);
  const provisioningStageUptimePercent = useSelector(provisioningStageUptimePercentSelector);
  const provisioningStageVersionDeploymentDate = useSelector(provisioningStageVersionDeploymentDateSelector);

  const aclV2StageStatus = useSelector(aclV2StageStatusSelector);
  const aclV2StageVersion = useSelector(aclV2StageVersionSelector);
  const notifyAclV2StageChanges = useSelector(notifyAclV2StageChangesSelector);
  const aclV2StageUptimePercent = useSelector(aclV2StageUptimePercentSelector);
  const aclV2StageVersionDeploymentDate = useSelector(aclV2StageVersionDeploymentDateSelector);

  const issuesStageStatus = useSelector(issuesStageStatusSelector);
  const issuesStageVersion = useSelector(issuesStageVersionSelector);
  const notifyIssuesStageChanges = useSelector(notifyIssuesStageChangesSelector);
  const issuesStageUptimePercent = useSelector(issuesStageUptimePercentSelector);
  const issuesStageVersionDeploymentDate = useSelector(issuesStageVersionDeploymentDateSelector);

  const ech2StageStatus = useSelector(ech2StageStatusSelector);
  const ech2StageVersion = useSelector(ech2StageVersionSelector);
  const notifyEch2StageChanges = useSelector(notifyEch2StageChangesSelector);
  const ech2StageUptimePercent = useSelector(ech2StageUptimePercentSelector);
  const ech2StageVersionDeploymentDate = useSelector(ech2StageVersionDeploymentDateSelector);

  const apiStageStatus = useSelector(apiStageStatusSelector);
  const apiStageVersion = useSelector(apiStageVersionSelector);
  const notifyApiStageChanges = useSelector(notifyApiStageChangesSelector);
  const apiStageUptimePercent = useSelector(apiStageUptimePercentSelector);


  const data = orderBy(
    [
      // PLOP STAGE LIST DATA
    {
      key: SERVICE_KEY.ACL_SERVICE,
      title: 'Acl Service',
      version: aclServiceStageVersion,
      status: aclServiceStageStatus,
      notifyChanges: notifyAclServiceStageChanges,
      uptimePercent: aclServiceStageUptimePercent,
      versionDeploymentDate: aclServiceStageVersionDeploymentDate,
    },

      {
        key: SERVICE_KEY.PROVISIONING,
        title: 'Provisioning Service',
        version: provisioningStageVersion,
        status: provisioningStageStatus,
        notifyChanges: notifyProvisioningStageChanges,
        uptimePercent: provisioningStageUptimePercent,
        versionDeploymentDate: provisioningStageVersionDeploymentDate,
      },

      {
        key: SERVICE_KEY.ACL_V2,
        title: 'Acl V2',
        version: aclV2StageVersion,
        status: aclV2StageStatus,
        notifyChanges: notifyAclV2StageChanges,
        uptimePercent: aclV2StageUptimePercent,
        versionDeploymentDate: aclV2StageVersionDeploymentDate,
      },

      {
        key: SERVICE_KEY.ISSUES,
        title: 'Issues Service',
        version: issuesStageVersion,
        status: issuesStageStatus,
        notifyChanges: notifyIssuesStageChanges,
        uptimePercent: issuesStageUptimePercent,
        versionDeploymentDate: issuesStageVersionDeploymentDate,
      },

      {
        key: SERVICE_KEY.ECH2,
        title: 'Ech2 0',
        version: ech2StageVersion,
        status: ech2StageStatus,
        notifyChanges: notifyEch2StageChanges,
        uptimePercent: ech2StageUptimePercent,
        versionDeploymentDate: ech2StageVersionDeploymentDate,
      },

      {
        key: SERVICE_KEY.API,
        title: 'Api Service',
        version: apiStageVersion,
        status: apiStageStatus,
        notifyChanges: notifyApiStageChanges,
        uptimePercent: apiStageUptimePercent.toFixed(2),
      },

    ],
    ['title'],
    ['asc'],
  );

  return (
    <List
      itemLayout="horizontal"
      dataSource={data}
      renderItem={item => (
        <ListItem item={item} onChange={onChange} env="stage" />
      )}
    />
  );
};
