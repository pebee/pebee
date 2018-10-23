/**
 * Media reducer
 */


import { fromJS, Map } from 'immutable';
import {
    FETCH_FILES,
    FETCH_FILES_SUCCESS,
    FETCH_FILES_FAILURE,

    UPLOAD_FILE_SUCCESS,
    UPLOAD_FILE_FAILURE,
    SHOW_UPLOAD_FILE_MODAL,
    HIDE_UPLOAD_FILE_MODAL,

    CREATE_FOLDER_SUCCESS,
    CREATE_FOLDER_FAILURE,
    SHOW_ADD_FOLDER_MODAL,
    HIDE_ADD_FOLDER_MODAL,

    UPDATE_NEW_FOLDER_NAME,

    HIDE_MESSAGE
} from './constants';


const initialState = fromJS({
    files: {
        files: [],
        folders: []
    },

    directory: null,

    message: null,
    messageType: 'info',

    uploadFileModal: false,

    addFolderModal: false,
    
    newFolderName: ''
});


const mediaReducer = (state = initialState, action) => {

    switch (action.type) {
        /* fetching files */
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

        /* uploading files */
        case SHOW_UPLOAD_FILE_MODAL:
            return state
                .set('addFolderModal', false)
                .set('uploadFileModal', true);

        case HIDE_UPLOAD_FILE_MODAL:
            return state
                .set('uploadFileModal', false);

        case UPLOAD_FILE_SUCCESS:
            return state
                .set('message', action.data)
                .set('messageType', 'success');

        case UPLOAD_FILE_FAILURE:
            return state
                .set('message', action.data)
                .set('messageType', 'error');

        /* creating folder */
        case CREATE_FOLDER_SUCCESS:
            return state
                .set('message', action.data)
                .set('messageType', 'success');

        case CREATE_FOLDER_FAILURE:
            return state
                .set('message', action.data)
                .set('messageType', 'error');

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

        /* message */
        case HIDE_MESSAGE:
            return state
                .set('message', null)
                .set('messageType', 'info');

        default:
            return state;

    }

}


export default mediaReducer;