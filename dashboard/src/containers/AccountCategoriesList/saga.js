import { put, takeLatest } from 'redux-saga/effects';

import {
    getAccountCategories,
    deleteAccountCategory,
    restoreAccountCategory
} from './api';

import {
    fetchAccountCategories,
    fetchAccountCategoriesSuccess,
    fetchAccountCategoriesFailure,

    deleteAccountCategoryFailure
} from './actions';

import { FETCH_ACCOUNT_CATEGORIES, DELETE_ACCOUNT_CATEGORY, RESTORE_ACCOUNT_CATEGORY } from './constants';


function* fetchAccountCategoriesSaga() {

    try {
        const response = yield getAccountCategories();

        yield put(fetchAccountCategoriesSuccess(response.data.data));
    } catch (e) {
        yield put(fetchAccountCategoriesFailure(e.response.data.message))
    }

}

function* deleteAccountCategorySaga(action) {

    try {
        yield deleteAccountCategory(action.data);

        yield put(fetchAccountCategories());
    } catch (e) {
        yield put(deleteAccountCategoryFailure());
    }

}

function* restoreAccountCategorySaga(action) {

    try {
        yield restoreAccountCategory(action.data);

        yield put(fetchAccountCategories());
    } catch (e) {
        console.log(e);
    }

}

function* accountCategoriesListSaga() {
    yield takeLatest(FETCH_ACCOUNT_CATEGORIES, fetchAccountCategoriesSaga);
    yield takeLatest(DELETE_ACCOUNT_CATEGORY, deleteAccountCategorySaga);
    yield takeLatest(RESTORE_ACCOUNT_CATEGORY, restoreAccountCategorySaga);
}


export default accountCategoriesListSaga;