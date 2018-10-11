import { put, takeLatest } from 'redux-saga/effects';

import { FETCH_USER, SAVE_USER } from './constants';
import { fetchUserFailure, fetchUserSuccess, saveUserSuccess, saveUserFailure } from './actions';
import { getUser, editUser, addUser } from './api';


function* fetchUserSaga(action) {

    try {
        const response = yield getUser(action.data);

        yield put(fetchUserSuccess(response.data.data));
    } catch (e) {
        yield put(fetchUserFailure());
    }

}

function* saveUserSaga(action) {

    try {
        let response;

        if (action.data.id && Number.isInteger(parseInt(action.data.id))) {
            response = yield editUser(action.data);
        } else {
            response = yield addUser(action.data);
        }

        yield put(saveUserSuccess(response.data));
    } catch (e) {
        yield put(saveUserFailure(e.response.data));
    }

}


function* editUserSaga() {
    yield takeLatest(FETCH_USER, fetchUserSaga);
    yield takeLatest(SAVE_USER, saveUserSaga);
}


export default editUserSaga;