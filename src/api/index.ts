// Barrel file para exportar todas las APIs desde un solo punto
export { default as axiosClient } from './axiosClient';
export { crearPersona, obtenerPersonas, obtenerPersonaPorId, eliminarPersona } from './personasApi';
export type { PersonaPayload } from './personasApi';
export { login } from './authApi';
export type { LoginPayload, LoginResponse } from './authApi';
export { preguntarChatbot } from './chatbotApi';
