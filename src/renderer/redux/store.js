import { createStore, applyMiddleware, compose } from 'redux';
import { createEpicMiddleware } from 'redux-observable';

import rootReducer from './reducers';
import rootEpic from './epics';
// import DevTools from './DevTools';

const epicMiddleware = createEpicMiddleware();

/* eslint-disable no-underscore-dangle */
const store = createStore(
  rootReducer, compose(applyMiddleware(epicMiddleware), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()),
);
/* eslint-enable */

epicMiddleware.run(rootEpic);

export default store;
