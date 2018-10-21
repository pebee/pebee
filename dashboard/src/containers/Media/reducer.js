/**
 * Media reducer
 */


import { fromJS, Map } from 'immutable';
import {
    FETCH_FILES,
    FETCH_FILES_SUCCESS,
    FETCH_FILES_FAILURE,

    SHOW_UPLOAD_FILE_MODAL,
    HIDE_UPLOAD_FILE_MODAL,

    SHOW_ADD_FOLDER_MODAL,
    HIDE_ADD_FOLDER_MODAL,
    UPDATE_NEW_FOLDER_NAME
} from './constants';


const initialState = fromJS({
    files: {
        files: [],
        folders: []
    },
    directory: null,
    message: null,
    uploadFileModal: false,
    addFolderModal: false,
    newFolderName: ''
});


const mediaReducer = (state = initialState, action) => {

    switch (action.type) {
        case FETCH_FILES:
            return state
                .set('directory', action.data);

        case FETCH_FILES_SUCCESS:
            return state
                .set('files', Map(action.data))
                .set('message', null);

        case FETCH_FILES_FAILURE:
            return state
                .set('files', Map({ files: [], folders: [] }))
                .set('message', action.data);

        case SHOW_UPLOAD_FILE_MODAL:
            return state
                .set('addFolderModal', false)
                .set('uploadFileModal', true);

        case HIDE_UPLOAD_FILE_MODAL:
            return state
                .set('uploadFileModal', false);

        case SHOW_ADD_FOLDER_MODAL:
            return state
                .set('uploadFileModal', false)
                .set('addFolderModal', true);

        case HIDE_ADD_FOLDER_MODAL:
            return state
                .set('newFolderName', '')
                .set('addFolderModal', false);

        case UPDATE_NEW_FOLDER_NAME:
            return state
                .set('newFolderName', action.data.target ? action.data.target.value : '');

        default:
            return state;

    }

}


export default mediaReducer;