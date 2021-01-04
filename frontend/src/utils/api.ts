import axios from "axios";

export const accountsApi = axios.create(
    {
        baseURL: "http://127.0.0.1:8000/accounts/"
    }
);

export default axios.create(
    {
        baseURL: "http://127.0.0.1:8000/api/v1/"
    }
)