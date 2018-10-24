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
    TOGGLE_UPLOAD_FILE_MODAL,

    CREATE_FOLDER_SUCCESS,
    CREATE_FOLDER_FAILURE,
    TOGGLE_ADD_FOLDER_MODAL,

    UPDATE_NEW_FOLDER_NAME,

    HIDE_MESSAGE,

    DOWNLOAD_FILE_SUCCESS,
    RESET_DOWNLOAD_FILE,
    DOWNLOAD_FILE,
    DOWNLOAD_FILE_FAILURE,

    TOGGLE_DELETE_POPCONFIRM,
    DELETE_FILE_SUCCESS,
    DELETE_FILE_FAILURE
} from './constants';


const initialState = fromJS({
    // spinner
    spinning: false,

    // all files and folders being shown
    files: {
        files: [],
        folders: []
    },

    // current directory
    directory: null,

    // message to be shown
    message: null,

    // type of message to be shown
    messageType: 'info',

    // if show upload file modal
    uploadFileModal: false,

    // if show add folder modal
    addFolderModal: false,
    
    // name of new directory being created
    newFolderName: '',

    // name of file being downloaded
    downloadFileName: '',

    // contents of downloaded file
    fileDownloadContent: null,

    // if show delete file popconfirm
    deleteFilePopconfirm: false
});


const mediaReducer = (state = initialState, action) => {

    switch (action.type) {
        /* fetching files */
        case FETCH_FILES:
            return state
                .set('directory', action.data)
                .set('spinning', true);

        case FETCH_FILES_SUCCESS:
            return state
                .set('files', Map(action.data))
                .set('message', null)
                .set('spinning', false);

        case FETCH_FILES_FAILURE:
            return state
                .set('files', Map({ files: [], folders: [] }))
                .set('message', action.data)
                .set('spinning', false);

        /* uploading files */
        case TOGGLE_UPLOAD_FILE_MODAL:
            return state
                .set('addFolderModal', false)
                .set('uploadFileModal', !state.get('uploadFileModal'));

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

        case TOGGLE_ADD_FOLDER_MODAL:
            return state
                .set('uploadFileModal', false)
                .set('addFolderModal', !state.get('addFolderModal'))
                .set('newFolderName', '');

        case UPDATE_NEW_FOLDER_NAME:
            return state
                .set('newFolderName', action.data.target ? action.data.target.value : '');

        /* message */
        case HIDE_MESSAGE:
            return state
                .set('message', null)
                .set('messageType', 'info');

        /* file download */
        case DOWNLOAD_FILE:
            return state
                .set('downloadFileName', action.data.filename);

        case DOWNLOAD_FILE_SUCCESS:
            return state
                .set('fileDownloadContent', action.data);

        case DOWNLOAD_FILE_FAILURE:
        case RESET_DOWNLOAD_FILE:
            return state
                .set('fileDownloadContent', null)
                .set('downloadFileName', '');

        /* file delete */
        case TOGGLE_DELETE_POPCONFIRM:
            return state
                .set('deleteFilePopconfirm', !state.get('deleteFilePopconfirm'));

        case DELETE_FILE_SUCCESS:
            return state
                .set('message', action.data)
                .set('messageType', 'success');

        case DELETE_FILE_FAILURE:
            return state
                .set('message', action.data)
                .set('messageType', 'error');

        default:
            return state;

    }

}


export default mediaReducer;