import { put, takeLatest } from 'redux-saga/effects';

import { FETCH_USER, SAVE_USER, FETCH_ACCOUNT_CATEGORIES } from './constants';

import { fetchUserFailure, fetchUserSuccess, saveUserSuccess, saveUserFailure, fetchAccountCategoriesSuccess } from './actions';

import { getUser, singleUser, addUser, getAccountCategories } from './api';


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
            response = yield singleUser(action.data);
        } else {
            response = yield addUser(action.data);
        }

        yield put(saveUserSuccess(response.data));
    } catch (e) {
        yield put(saveUserFailure(e.response.data));
    }

}

function* fetchAccountCategoriesSaga() {

    try {
        const response = yield getAccountCategories();

        yield put(fetchAccountCategoriesSuccess(response.data.data));
    } catch (e) {
        yield put();
    }

}


function* singleUserSaga() {
    yield takeLatest(FETCH_USER, fetchUserSaga);
    yield takeLatest(SAVE_USER, saveUserSaga);
    yield takeLatest(FETCH_ACCOUNT_CATEGORIES, fetchAccountCategoriesSaga);
}


export default singleUserSaga;