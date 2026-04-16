import axiosClient from './axiosClient';

export type ChatHistoryItem = {
    role: 'user' | 'model';
    parts: { text: string }[];
};

type ChatbotResponse = {
    reply: string;
};

/**
 * Envía una pregunta al chatbot y devuelve la respuesta generada por la IA.
 * @param message El mensaje o pregunta del usuario.
 * @param history El historial de la conversación previa.
 * @returns La respuesta del chatbot como texto plano.
 */
export const preguntarChatbot = async (message: string, history: ChatHistoryItem[] = []): Promise<string> => {
    try {
        // El backend devuelve { reply: string }
        const response = await axiosClient.post<ChatbotResponse>('/chatbot/ask', { message, history });

        const reply = response.data?.reply;

        if (typeof reply === 'string' && reply.trim()) {
            return reply;
        }

        // Si la respuesta no tiene el formato esperado, intentar leerla como string directo (compatibilidad)
        if (typeof response.data === 'string' && (response.data as string).trim()) {
            return response.data as string;
        }

        return 'Lo siento, no pude obtener una respuesta. Por favor, inténtalo de nuevo.';
    } catch (error: any) {
        console.error('Error en preguntarChatbot:', error);

        // Intentar extraer un mensaje útil de la respuesta de error
        const serverReply = error.response?.data?.reply;
        if (typeof serverReply === 'string' && serverReply.trim()) {
            return serverReply;
        }

        // Si no hay conexión con el servidor
        if (!error.response) {
            return 'No hay conexión con el servidor. Por favor, verifica tu conexión a internet e inténtalo más tarde.';
        }

        return 'Lo siento, ha ocurrido un error. Por favor, inténtalo de nuevo más tarde.';
    }
};
