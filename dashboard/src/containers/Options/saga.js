import { takeLatest, put } from 'redux-saga/effects';
import { getAvailableOptions } from './api';
import { fetchOptionsFailure, fetchOptionsSuccess } from './actions';
import { FETCH_OPTIONS } from './constants';


function* fetchAvailableOptionsSaga() {

    try {
        const response = yield getAvailableOptions();

        yield put(fetchOptionsSuccess(response.data.data));
    } catch (e) {
        yield put(fetchOptionsFailure(e.response.data.message));
    }

}


function* optionsSaga() {
    yield takeLatest(FETCH_OPTIONS, fetchAvailableOptionsSaga);
}


export default optionsSaga;