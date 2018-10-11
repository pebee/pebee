import { put, takeLatest } from 'redux-saga/effects';
import { getAccountCategories } from './api';
import { fetchAccountCategoriesSuccess, fetchAccountCategoriesFailure } from './actions';
import { FETCH_ACCOUNT_CATEGORIES } from './constants';


function* fetchAccountCategories() {

    try {
        const response = yield getAccountCategories();

        yield put(fetchAccountCategoriesSuccess(response.data.data));
    } catch (e) {
        yield put(fetchAccountCategoriesFailure(e.response.data.message))
    }

}

function* accountCategoriesListSaga() {
    yield takeLatest(FETCH_ACCOUNT_CATEGORIES, fetchAccountCategories);
}


export default accountCategoriesListSaga;