import React from 'react';
import { List, Badge, Switch } from 'antd';

export default function ListItem({ item, onChange, env }) {
  const badgeRenderer = (status) => {
    const statusMapper = {
      true: { status: 'success' },
      false: { status: 'error' },
      null: { status: 'processing', color: '#faad14' },
    };

    return <Badge {...statusMapper[status]} />;
  };

  return (
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
        <Switch checked={item.notifyChanges} size="small" onChange={e => onChange(e, env, item)} />
      </div>
    </List.Item>
  );
}
