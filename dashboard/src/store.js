import { createStore, compose, applyMiddleware } from 'redux';
import createHistory from 'history/createBrowserHistory';
import { routerMiddleware } from 'react-router-redux';

import createSagaMiddleware from 'redux-saga';

// Reducer
import createReducer from './reducer';

// Global saga
import globalSaga from './saga';

// Saga
const saga = createSagaMiddleware();

const history = createHistory();

const store = createStore(
    createReducer(),
    compose(applyMiddleware(saga, routerMiddleware(history)))
);


store.asyncReducers = {};
store.injectedSagas = {};
store.runSaga = saga.run;

// inject async reducer
store.injectReducer = (key, reducer) => {
    store.asyncReducers[key] = reducer;
    store.replaceReducer(createReducer(store.asyncReducers));
    return store;
};

// inject new saga if it does not already exist
store.injectSaga = (key, saga) => {
    if (!store.injectedSagas[key]) {
        store.injectedSagas[key] = saga;
        store.runSaga(saga);
    }
};

store.runSaga(globalSaga);


export {
    store,
    history
};