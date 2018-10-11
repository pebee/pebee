import axios from './../../utils/axios';


export const getAccountCategories = () => {
    return axios.get('/account_categories/all');
};