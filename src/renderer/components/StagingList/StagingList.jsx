import React from 'react';
import { useSelector } from 'react-redux';

import { List, Switch } from 'antd';

import { SERVICE_KEY } from '../../consts';

// PLOP STAGE LIST IMPORTS

export default ({ badgeRenderer, onChange }) => {
  // PLOP STAGE LIST SELECTORS

  const data = [
    // PLOP STAGE LIST DATA
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
            <Switch checked={item.notifyChanges} size="small" onChange={e => onChange(e, 'stage', item)} />
          </div>
        </List.Item>
      )}
    />
  );
};
