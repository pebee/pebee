import axios from './../../utils/axios';


const getUser = id => {
    return axios.get(`/users/${id}`);
}

const editUser = (data) => {
    return axios.put(`/users/${data.id}`, data);
}

const addUser = (data) => {
    return axios.post(`/users`, data);
}


export {
    getUser,
    editUser,
    addUser
};