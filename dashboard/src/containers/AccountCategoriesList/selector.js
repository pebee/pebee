import { createSelector } from 'reselect';


const getAccountCategoriesListFromState = state => state.accountCategoriesList;


const accountCategoriesSelector = createSelector(
    [ getAccountCategoriesListFromState ],
    ( accountCategoriesListState ) => {
        return {
            ...accountCategoriesListState.toJS()
        }
    }
);


export default accountCategoriesSelector;