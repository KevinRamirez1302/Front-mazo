import axiosClient from './axiosClient';

export type LoginPayload = {
    username: string;
    password: string;
};

export type LoginResponse = {
    access_token: string;
    user: Record<string, unknown>;
};

/**
 * Inicia sesión con credenciales de administrador.
 * Devuelve el token de acceso y los datos del usuario.
 */
export const login = async (credentials: LoginPayload): Promise<LoginResponse> => {
    const response = await axiosClient.post<LoginResponse>('/usuarios/login', credentials);
    return response.data;
};
