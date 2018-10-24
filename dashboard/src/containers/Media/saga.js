import { takeLatest, put } from 'redux-saga/effects';

import {
    fetchFilesSuccess,
    fetchFilesFailure,

    createFolderFailure,
    createFolderSuccess,

    downloadFileSuccess,
    downloadFileFailure,

    deleteFileFailure,
    deleteFileSuccess
} from './actions';

import { FETCH_FILES, CREATE_FOLDER, DOWNLOAD_FILE, DELETE_FILE } from './constants';
import { getFiles, addFolder, downloadFile, deleteFile } from './api';


// make api call to fetch files by directory
function* fetchFilesSaga(action) {

    try {
        const response = yield getFiles(action.data);

        yield put(fetchFilesSuccess(response.data.data));
    } catch (e) {
        yield put(fetchFilesFailure(e.response.data.message));
    }

}

// make api call to create new directory
function* createFolderSaga(action) {

    try {
        const response = yield addFolder(action.data);

        yield put(createFolderSuccess(response.data.message));
    } catch (e) {
        yield put(createFolderFailure(e.response.data.message));
    }

}

// make api call to get downloadable content of file
function* downloadFileSaga(action) {

    try {
        const response = yield downloadFile(action.data.fullName);

        yield put(downloadFileSuccess(response.data));
    } catch (e) {
        yield put(downloadFileFailure(e.response.data.message));
    }

}

// make api call to delete file from storage
function* deleteFileSaga(action) {

    try {
        const response = yield deleteFile(action.data);

        yield put(deleteFileSuccess(response.data.message));
    } catch (e) {
        yield put(deleteFileFailure(e.response.data.message));
    }

}


function* mediaSaga() {
    yield takeLatest(FETCH_FILES, fetchFilesSaga);
    yield takeLatest(CREATE_FOLDER, createFolderSaga);
    yield takeLatest(DOWNLOAD_FILE, downloadFileSaga);
    yield takeLatest(DELETE_FILE, deleteFileSaga);
}


export default mediaSaga;