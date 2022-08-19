import axios from "axios";

axios.interceptors.response.use(null, error => {
    const expectedError = error.response && error.response >= 400 && error.response <= 500;
    if (!expectedError) {
        console.log("logging the error", error);
        alert("an unexpected error occured!");
    }
    return Promise.reject(error);
})
export default {
    get: axios.get,
    put: axios.put,
    post: axios.post,
    delete: axios.delete,
}