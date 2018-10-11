import axios from './../../utils/axios';


class UsersAPI {

    static getAllUsers() {
        return axios.get('/users/all');
    }

    static getPaginatedUsers(params) {
        return axios.get('/users', {
            params: {
                page: params.page,
                limit: params.limit
            }
        });
    }

    static getUser(userId) {
        return axios.get(`/users/${userId}`);
    }

    static deleteUser(userId) {
        return axios.delete(`/users/${userId}`);
    }

    static restoreUser(userId) {
        return axios.put(`/users/${userId}/restore`);
    }

}


export default UsersAPI;