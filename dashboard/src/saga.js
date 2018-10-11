import { takeEvery, put } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';

import { fetchAccountFailure, fetchAccountSuccess } from './containers/App/actions';

import axios from './utils/axios';


function* fetchAccount() {

    try {
        const response = yield axios.get('/me');

        yield put(fetchAccountSuccess(response.data));
    } catch (e) {
        yield put(fetchAccountFailure());
    }

}


function* globalSaga() {
    yield takeEvery(LOCATION_CHANGE, fetchAccount);
}


export default globalSaga;