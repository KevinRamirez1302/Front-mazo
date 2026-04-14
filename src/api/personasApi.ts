import axiosClient from './axiosClient';

export type PersonaPayload = {
    nombre: string;
    apellido: string;
    email: string;
    telefono?: string;
    dni?: string;
    curso: string;
    mensaje: string;
};

/**
 * Registra una nueva persona (formulario de contacto).
 */
export const crearPersona = async (data: PersonaPayload) => {
    const response = await axiosClient.post('/personas/', data);
    return response.data;
};

/**
 * Obtiene la lista de todas las personas registradas.
 */
export const obtenerPersonas = async () => {
    const response = await axiosClient.get('/personas/');
    return response.data;
};

/**
 * Obtiene una persona por su ID.
 */
export const obtenerPersonaPorId = async (id: number | string) => {
    const response = await axiosClient.get(`/personas/${id}`);
    return response.data;
};

/**
 * Elimina una persona por su ID.
 */
export const eliminarPersona = async (id: number | string) => {
    const response = await axiosClient.delete(`/personas/${id}`);
    return response.data;
};
