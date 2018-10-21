import axios from './../../utils/axios';


export const getFiles = directory => {
    let url = directory ? `/storage/files?directory=${directory}` : '/storage/files';

    return axios.get(url);
};

export const addFolder = data => {
    return axios.post('/storage/create_dir', data);
};