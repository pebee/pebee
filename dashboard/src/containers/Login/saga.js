import { takeLatest, put } from 'redux-saga/effects';

import { loginSuccess, loginFailure } from './actions';
import { LOGIN } from './constants';
import LoginAPI from './api';


function* login(action) {

    try {
        const response = yield LoginAPI.login(action.data);
        
        yield put(loginSuccess(response.data));
    } catch (e) {
        yield put(loginFailure());
    }

}


function* loginSaga() {
    yield takeLatest(LOGIN, login);
}


export default loginSaga;