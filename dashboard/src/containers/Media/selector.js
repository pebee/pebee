/**
 * Media selector
 */

import { createSelector } from 'reselect';


const getMediaFromState = state => state.media;


const mediaSelector = createSelector(
    [ getMediaFromState ],
    (mediaState) => {
        return mediaState.toJS();
    }
);


export default mediaSelector;