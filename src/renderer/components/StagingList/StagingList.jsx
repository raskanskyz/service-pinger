import React from 'react';
import { useSelector } from 'react-redux';
import { orderBy } from 'lodash-es';

import { List } from 'antd';

import { SERVICE_KEY } from '../../consts';
import ListItem from '../ListItem/ListItem';

// PLOP STAGE LIST IMPORTS
import {
  issuesStageStatusSelector, issuesStageVersionSelector, notifyIssuesStageChangesSelector, issuesStageUptimePercentSelector, issuesStageVersionDeploymentDateSelector,
} from '../../redux/selectors/issuesStage.selectors';

import {
  ech2StageStatusSelector, ech2StageVersionSelector, notifyEch2StageChangesSelector, ech2StageUptimePercentSelector, ech2StageVersionDeploymentDateSelector,
} from '../../redux/selectors/ech2Stage.selectors';

import {
  aclStageStatusSelector, aclStageVersionSelector, notifyAclStageChangesSelector, aclStageUptimePercentSelector, aclStageVersionDeploymentDateSelector,
} from '../../redux/selectors/aclStage.selectors';

import {
  apiStageStatusSelector, apiStageVersionSelector, notifyApiStageChangesSelector, apiStageUptimePercentSelector,
} from '../../redux/selectors/apiStage.selectors';

export default ({ onChange }) => {
  // PLOP STAGE LIST SELECTORS
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

  const aclStageStatus = useSelector(aclStageStatusSelector);
  const aclStageVersion = useSelector(aclStageVersionSelector);
  const notifyAclStageChanges = useSelector(notifyAclStageChangesSelector);
  const aclStageUptimePercent = useSelector(aclStageUptimePercentSelector);
  const aclStageVersionDeploymentDate = useSelector(aclStageVersionDeploymentDateSelector);


  const apiStageStatus = useSelector(apiStageStatusSelector);
  const apiStageVersion = useSelector(apiStageVersionSelector);
  const notifyApiStageChanges = useSelector(notifyApiStageChangesSelector);
  const apiStageUptimePercent = useSelector(apiStageUptimePercentSelector);


  const data = orderBy(
    [
      // PLOP STAGE LIST DATA
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
        key: SERVICE_KEY.ACL,
        title: 'Acl Service',
        version: aclStageVersion,
        status: aclStageStatus,
        notifyChanges: notifyAclStageChanges,
        uptimePercent: aclStageUptimePercent,
        versionDeploymentDate: aclStageVersionDeploymentDate,
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
    ['status', 'title'],
    ['asc', 'asc'],
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
