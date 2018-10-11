import { put, takeLatest } from 'redux-saga/effects';
import { FETCH_USERS, DELETE_USER, RESTORE_USER } from './contants';
import { fetchUsersSuccess, fetchUsersFailure, deleteUserFailure, deleteUserSuccess, fetchUsers as fetchUsersAction } from './actions';
import UsersAPI from './api';


function* fetchUsers(params) {

    try {
        const response = yield UsersAPI.getPaginatedUsers(params.data);

        yield put(fetchUsersSuccess(response.data));
    } catch (e) {
        yield put(fetchUsersFailure());
    }
    
};


function* deleteUser(action) {

    try {
        yield UsersAPI.deleteUser(action.data.id);

        let fetchUsersData = {
            page: action.data.pagination.current,
            limit: action.data.pagination.pageSize
        };

        yield put(fetchUsersAction(fetchUsersData));
    } catch (e) {
        yield put(deleteUserFailure());
    }

};


function* restoreUser(action) {

    try {
        yield UsersAPI.restoreUser(action.data.id);

        let fetchUsersData = {
            page: action.data.pagination.current,
            limit: action.data.pagination.pageSize
        };

        yield put(fetchUsersAction(fetchUsersData));
    } catch (e) {
        yield put();
    }
    
}


function* usersSaga() {
    yield takeLatest(FETCH_USERS, fetchUsers);
    yield takeLatest(DELETE_USER, deleteUser);
    yield takeLatest(RESTORE_USER, restoreUser);
};


export default usersSaga;