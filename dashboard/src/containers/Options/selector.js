import { createSelector } from 'reselect';


const getOptionsState = state => state.options;


const optionsSelector = createSelector(
    [ getOptionsState ],
    (optionsState) => {
        return optionsState.toJS();
    }
)


export default optionsSelector;