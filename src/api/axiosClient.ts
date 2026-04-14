import axios from 'axios';

const API_BASE_URL = `${import.meta.env.VITE_API_URL}`;

const axiosClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor para agregar el token de autenticación automáticamente
axiosClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('adminToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Interceptor de respuesta para manejar errores globales
axiosClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('adminToken');
            localStorage.removeItem('adminUser');
            // Opcional: redirigir al login
        }
        return Promise.reject(error);
    }
);

export default axiosClient;
