import { createSelector } from 'reselect';


const getUsersFromState = (state) => {
    return state.users;
};

const getAppFromState = state => {
    return state.app;
}


const getUsersSelector = createSelector(
    [ getUsersFromState, getAppFromState ],
    (usersState, appState) => {
        return {
            account: appState.get('loggedInUser').toJS(),
            ...usersState.toJS(),
        }
    }
);

export default getUsersSelector;