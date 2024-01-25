import { createStore, applyMiddleware, compose } from 'redux';
import { createEpicMiddleware } from 'redux-observable';

import rootReducer from './reducers';
import rootEpic from './epics';

const epicMiddleware = createEpicMiddleware();

/* eslint-disable no-underscore-dangle */
const store = createStore(
  rootReducer, compose(applyMiddleware(epicMiddleware)),
);
/* eslint-enable */

epicMiddleware.run(rootEpic);

export default store;
