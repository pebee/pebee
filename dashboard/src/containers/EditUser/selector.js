import { createSelector } from 'reselect';


const getAppFromState = state => state.app;

const getEditUserFromState = state => state.editUser;


const editUserSelector = createSelector(
    [ getAppFromState, getEditUserFromState ],
    (appState, editUserState) => {

        return {
            account: appState.get('loggedInUser').toJS(),
            ...editUserState.toJS()
        }
    }
);


export default editUserSelector;