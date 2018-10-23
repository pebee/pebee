/**
 * Media actions
 */


import {
    FETCH_FILES,
    FETCH_FILES_FAILURE,
    FETCH_FILES_SUCCESS,

    UPLOAD_FILE_SUCCESS,
    UPLOAD_FILE_FAILURE,
    SHOW_UPLOAD_FILE_MODAL,
    HIDE_UPLOAD_FILE_MODAL,

    SHOW_ADD_FOLDER_MODAL,
    HIDE_ADD_FOLDER_MODAL,

    CREATE_FOLDER,
    CREATE_FOLDER_FAILURE,
    CREATE_FOLDER_SUCCESS,
    UPDATE_NEW_FOLDER_NAME,

    HIDE_MESSAGE,

    DOWNLOAD_FILE,
    DOWNLOAD_FILE_FAILURE,
    DOWNLOAD_FILE_SUCCESS
} from './constants';



/* FETCHING FILES */
export const fetchFiles = data => {
    return {
        type: FETCH_FILES,
        data
    }
};

export const fetchFilesSuccess = data => {
    return {
        type: FETCH_FILES_SUCCESS,
        data
    }
};

export const fetchFilesFailure = () => {
    return {
        type: FETCH_FILES_FAILURE
    }
};


/* UPLOAD FILE */
export const showUploadFileModal = () => {
    return {
        type: SHOW_UPLOAD_FILE_MODAL
    }
};

export const hideUploadFileModal = () => {
    return {
        type: HIDE_UPLOAD_FILE_MODAL
    }
};

export const uploadFileSuccess = data => {
    return {
        type: UPLOAD_FILE_SUCCESS,
        data
    }
};

export const uploadFileFailure = data => {
    return {
        type: UPLOAD_FILE_FAILURE,
        data
    }
};


/* ADD FOLDER MODAL */
export const showAddFolderModal = () => {
    return {
        type: SHOW_ADD_FOLDER_MODAL
    }
};

export const hideAddFolderModal = () => {
    return {
        type: HIDE_ADD_FOLDER_MODAL
    }
};



/* CREATE FOLDER API CALL */
export const createFolder = data => {
    return {
        type: CREATE_FOLDER,
        data
    }
};

export const createFolderSuccess = data => {
    return {
        type: CREATE_FOLDER_SUCCESS,
        data
    }
};

export const createFolderFailure = data => {
    return {
        type: CREATE_FOLDER_FAILURE,
        data
    }
};

export const updateNewFolderName = data => {
    return {
        type: UPDATE_NEW_FOLDER_NAME,
        data
    }
};



/* MESSAGE */
export const hideMessage = () => {
    return {
        type: HIDE_MESSAGE
    }
};



/* DOWNLOAD FILE */
export const downloadFile = data => {
    return {
        type: DOWNLOAD_FILE,
        data
    }
};

export const downloadFileSuccess = data => {
    return {
        type: DOWNLOAD_FILE_SUCCESS,
        data
    }
};

export const downloadFileFailure = data => {
    return {
        type: DOWNLOAD_FILE_FAILURE,
        data
    }
};