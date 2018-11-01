import axios from './../../utils/axios';


export const getAvailableOptions = () => {
    return axios.get('/options/all');
};