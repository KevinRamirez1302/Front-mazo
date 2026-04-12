import { crearPersona } from '../api';
import type { PersonaPayload } from '../api';

type FormPayload = {
    name: string
    apellido: string
    email: string
    course: string
    message: string
}

export const FormularioEnvio = async (form: FormPayload) => {
    try {
        const data: PersonaPayload = {
            nombre: form.name,
            apellido: form.apellido,
            email: form.email,
            curso: form.course,
            mensaje: form.message,
        };

        const result = await crearPersona(data);
        return result;
    } catch (error) {
        console.log(error);
        return error;
    }
}