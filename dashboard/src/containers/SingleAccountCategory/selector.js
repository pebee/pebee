import { createSelector } from 'reselect';


const getSingleAccountCategoryState = state => state.singleAccountCategory;


const singleAccountCategorySelector = createSelector(
    [ getSingleAccountCategoryState ],
    (singleAccountCategoryState) => {
        return {
            ...singleAccountCategoryState.toJS()
        }
    }
);


export default singleAccountCategorySelector;