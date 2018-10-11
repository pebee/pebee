import { createSelector } from 'reselect';


const getApp = (state) => state.app;

const getLogin = (state) => state.login;


const getPebeeSelector = () => createSelector(
    [ getApp, getLogin ],
    (app, login) => {

        return {
            loginFailure: login.get('loginFailure'),
            isLoggedIn: app.get('isLoggedIn')
        };
    }
);


export default getPebeeSelector;