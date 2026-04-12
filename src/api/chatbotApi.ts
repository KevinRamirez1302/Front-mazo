import axiosClient from './axiosClient';

export type ChatHistoryItem = {
    role: 'user' | 'model';
    parts: { text: string }[];
};

/**
 * Envía una pregunta al chatbot y devuelve la respuesta generada por la IA.
 * @param message El mensaje o pregunta del usuario.
 * @param history El historial de la conversación previa.
 * @returns La respuesta del chatbot.
 */
export const preguntarChatbot = async (message: string, history: ChatHistoryItem[] = []): Promise<string> => {
    // El backend espera { message, history }
    const response = await axiosClient.post<string>('/chatbot/ask', { message, history });
    
    // El servicio en el backend devuelve el texto directamente (string)
    return response.data;
};
