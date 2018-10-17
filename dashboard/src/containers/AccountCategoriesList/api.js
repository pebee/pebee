import axios from './../../utils/axios';


export const getAccountCategories = () => {
    return axios.get('/account_categories/all');
};

export const deleteAccountCategory = accountCategoryId => {
    return axios.delete(`/account_categories/${accountCategoryId}`);
};

export const restoreAccountCategory = accountCategoryId => {
    return axios.put(`/account_categories/${accountCategoryId}/restore`);
};