import { createSelector } from 'reselect';


const getAppFromState = state => state.app;

const getSingleUserFromState = state => state.singleUser;


const singleUserSelector = createSelector(
    [ getAppFromState, getSingleUserFromState ],
    (appState, singleUserState) => {

        return {
            account: appState.get('loggedInUser').toJS(),
            ...singleUserState.toJS()
        }
    }
);


export default singleUserSelector;