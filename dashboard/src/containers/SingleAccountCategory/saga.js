import { put, takeLatest } from 'redux-saga/effects';

import {
    fetchAccountCategorySuccess,
    fetchAccountCategoryFailure,
    
    saveAccountCategorySuccess,
    saveAccountCategoryFailure,

    fetchPermissionsSuccess
} from './actions';

import { FETCH_ACCOUNT_CATEGORY, SAVE_ACCOUNT_CATEGORY, FETCH_PERMISSIONS } from './constants';
import { getAccountCategory, updateAccountCategory, createAccountCategory, getPermissions } from './api';


function* fetchAccountCategorySaga(action) {

    try {
        const response = yield getAccountCategory(action.data);

        yield put(fetchAccountCategorySuccess(response.data.data));
    } catch (e) {
        yield put(fetchAccountCategoryFailure(e.response.data.message));
    }

}

function* saveAccountCategorySaga(action) {

    try {
        let apiCall = action.data.id ? updateAccountCategory : createAccountCategory;

        const response = yield apiCall(action.data);

        yield put(saveAccountCategorySuccess(response.data.data));
    } catch (e) {
        yield put(saveAccountCategoryFailure(e.response.data.message));
    }

}

function* fetchPermissionsSaga() {

    try {
        const response = yield getPermissions();

        yield put(fetchPermissionsSuccess(response.data.data));
    } catch (e) {
        console.log(e);
    }

}

function* singleAccountCategorySaga() {
    yield takeLatest(FETCH_ACCOUNT_CATEGORY, fetchAccountCategorySaga);
    yield takeLatest(SAVE_ACCOUNT_CATEGORY, saveAccountCategorySaga);
    yield takeLatest(FETCH_PERMISSIONS, fetchPermissionsSaga);
}


export default singleAccountCategorySaga;