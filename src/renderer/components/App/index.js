import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Tabs, List, Switch } from 'antd';

import {
  establishConnectionAction,
  closeConnectionAction,
  toggleMPProdListenAction,
  toggleODProdListenAction,
} from '../../redux/actions';
import {
  mpProdStatusSelector,
  odProdStatusSelector,
  mpProdVersionSelector,
  odProdVersionSelector,
  isMPListeningSelector,
  isODListeningSelector,
} from '../../redux/selectors/prod';

const { TabPane } = Tabs;

export default () => {
  const dispatch = useDispatch();

  const mpProdStatus = useSelector(mpProdStatusSelector);
  const odProdStatus = useSelector(odProdStatusSelector);
  const mpProdVersion = useSelector(mpProdVersionSelector);
  const odProdVersion = useSelector(odProdVersionSelector);
  const isMPListening = useSelector(isMPListeningSelector);
  const isODListening = useSelector(isODListeningSelector);

  useEffect(() => {
    dispatch(establishConnectionAction());
    return () => {
      dispatch(closeConnectionAction());
    };
  }, []);

  const callback = (key) => {
    console.log(key);
  };

  const data = [
    {
      key: 'mp-client',
      title: 'Marketplace',
      version: mpProdVersion,
      status: mpProdStatus,
      isListening: isMPListening,
    },
    {
      key: 'org',
      title: 'Organization Dashboard',
      version: odProdVersion,
      status: odProdStatus,
      isListening: isODListening,
    },
  ];

  const onChange = (item) => {
    const actionMapper = {
      'mp-client': toggleMPProdListenAction,
      org: toggleODProdListenAction,
    };

    return dispatch(actionMapper[item.key]());
  };

  return (
    <div>
      <Tabs defaultActiveKey="1" onChange={callback}>
        <TabPane tab="Prod" key="1">
          <List
            itemLayout="horizontal"
            dataSource={data}
            renderItem={item => (
              <List.Item>
                <List.Item.Meta title={item.title} description={item.version} />
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Switch checked={item.isListening} size="small" onChange={() => onChange(item)} />
                </div>
              </List.Item>
            )}
          />
        </TabPane>
        <TabPane tab="Stage" key="2">
                    Content of Tab Pane 2
        </TabPane>
      </Tabs>
    </div>
  );
};
