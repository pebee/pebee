import React from 'react';
import ReactDOM from 'react-dom';

import { AppContainer } from 'react-hot-loader';

import { ConnectedRouter } from 'react-router-redux';

import { Provider } from 'react-redux';


import App from './containers/App';
import Intl from './containers/Intl';
import { history, store } from './store';



const render = (Component, IntlComponent) => {
    ReactDOM.render(
        <AppContainer>
            <Provider store={store}>
                <IntlComponent>
                    <ConnectedRouter history={history}>
                        <Component />
                    </ConnectedRouter>
                </IntlComponent>
            </Provider>
        </AppContainer>,
        document.getElementById('root')
    );
};

render(App, Intl);


if (module.hot) {
    module.hot.accept(['./containers/App', './containers/Intl'], () => {
        render(App, Intl);
    });
}