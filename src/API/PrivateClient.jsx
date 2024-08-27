import axios from 'axios';
import { HOST_URL } from '../components/common/HostApi';

const token = localStorage.getItem("authToken");

export const privateApiClient = axios.create({
    baseURL: HOST_URL,
    headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Cache-Control': "no-cach"
    },
});