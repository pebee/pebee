/**
 * Media actions
 */


import {
    FETCH_FILES,
    FETCH_FILES_FAILURE,
    FETCH_FILES_SUCCESS,

    UPLOAD_FILE_SUCCESS,
    UPLOAD_FILE_FAILURE,
    TOGGLE_UPLOAD_FILE_MODAL,

    CREATE_FOLDER,
    CREATE_FOLDER_FAILURE,
    CREATE_FOLDER_SUCCESS,
    UPDATE_NEW_FOLDER_NAME,
    TOGGLE_ADD_FOLDER_MODAL,

    HIDE_MESSAGE,

    DOWNLOAD_FILE,
    DOWNLOAD_FILE_FAILURE,
    DOWNLOAD_FILE_SUCCESS,
    RESET_DOWNLOAD_FILE,

    TOGGLE_DELETE_POPCONFIRM,
    DELETE_FILE,
    DELETE_FILE_SUCCESS,
    DELETE_FILE_FAILURE
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
export const toggleUploadFileModal = () => {
    return {
        type: TOGGLE_UPLOAD_FILE_MODAL
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
export const toggleAddFolderModal = () => {
    return {
        type: TOGGLE_ADD_FOLDER_MODAL
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

// it is called on Input field change to update name of directory being created
export const updateNewFolderName = data => {
    return {
        type: UPDATE_NEW_FOLDER_NAME,
        data
    }
};



/* INFORMATIONAL MESSAGE HANDLE */
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

export const resetDownloadFile = () => {
    return {
        type: RESET_DOWNLOAD_FILE
    }
};


/* DELETE FILE */
export const toggleDeleteFilePopconfirm = () => {
    return {
        type: TOGGLE_DELETE_POPCONFIRM
    }
};

export const deleteFile = data => {
    return {
        type: DELETE_FILE,
        data
    }
};

export const deleteFileSuccess = data => {
    return {
        type: DELETE_FILE_SUCCESS,
        data
    }
};

export const deleteFileFailure = data => {
    return {
        type: DELETE_FILE_FAILURE,
        data
    }
};