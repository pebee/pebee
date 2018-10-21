import { takeLatest, put } from 'redux-saga/effects';

import {
    fetchFilesSuccess,
    fetchFilesFailure,
    createFolderFailure,
    createFolderSuccess
} from './actions';

import { FETCH_FILES, CREATE_FOLDER } from './constants';
import { getFiles, addFolder } from './api';


function* fetchFilesSaga(action) {

    try {
        const response = yield getFiles(action.data);

        yield put(fetchFilesSuccess(response.data.data));
    } catch (e) {
        yield put(fetchFilesFailure(e.response.data.message));
    }

}

function* createFolderSaga(action) {

    try {
        const response = yield addFolder(action.data);

        yield put(createFolderSuccess(response.data.message));
    } catch (e) {
        yield put(createFolderFailure(e.response.data.message));
    }

}


function* mediaSaga() {
    yield takeLatest(FETCH_FILES, fetchFilesSaga);
    yield takeLatest(CREATE_FOLDER, createFolderSaga);
}


export default mediaSaga;