import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  Tabs, Badge,
} from 'antd';

import { establishConnectionAction, closeConnectionAction, notifyChangesAction } from '../../redux/actions';


import ProductionList from '../ProductionList/ProductionList';
import StagingList from '../StagingList/StagingList';

const { TabPane } = Tabs;

export default () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(establishConnectionAction());

    return () => {
      dispatch(closeConnectionAction());
    };
  }, []);

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
      <Tabs defaultActiveKey="1">
        <TabPane tab="Prod" key="1">
          <ProductionList badgeRenderer={badgeRenderer} onChange={onChange} />
        </TabPane>
        <TabPane tab="Stage" key="2">
          <StagingList badgeRenderer={badgeRenderer} onChange={onChange} />
        </TabPane>
      </Tabs>
    </div>
  );
};
