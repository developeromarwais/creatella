import axios from 'axios'

const API_URL = "http://localhost:3001/"

const apiCall = (url, method, data, config, callback, err) => {
    switch (method) {
        case "get":
            axios[method](`${API_URL}${url}`, config)
                .then(res => {
                    callback(res)
                }).catch(error => {
                    err(error)
                });
            break;
        default:
            err("method not allowed");
            break;
    }

}
export default apiCall
