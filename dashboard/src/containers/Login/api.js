import axios from './../../utils/axios';


class LoginAPI {

    static login(data) {
        return axios.post('/login', data);
    }

}


export default LoginAPI;