import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5000/api",
    withCredentials: true
});

api.interceptors.response.use(
    (response) => {
        return response;
    },

    (error) => {
        const message = error.response?.data?.message;
        
        if (message) {
            alert(`Error: ${message}`);
        } else if (error.request) {
            alert("Network Error: Cannot connect to the server.");
        } else {
            alert(`Unexpected Error: ${error.message}`);
        }

        return Promise.reject(error);
    }
);

export default api;
