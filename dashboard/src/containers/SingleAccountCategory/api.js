import axios from './../../utils/axios';


export const getAccountCategory = accountCategoryId => {
    return axios.get(`/account_categories/${accountCategoryId}`);
};

export const createAccountCategory = data => {
    return axios.post('/account_categories', data);
};

export const updateAccountCategory = data => {
    return axios.put(`/account_categories/${data.id}`, data);
};

export const getPermissions = () => {
    return axios.get('/permissions/all');
};