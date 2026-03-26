type FormPayload = {
    name: string
    apellido: string
    email: string
    course: string
    message: string
}

export const FormularioEnvio = async (form: FormPayload) => {
    try {
        const data = {
            "nombre": form.name,
            "apellido": form.apellido,
            "email": form.email,
            "curso": form.course,
            "mensaje": form.message
        }
        const response = await fetch('http://localhost:3000/personas/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            throw new Error('Error al enviar el formulario');
        }
        const result = await response.json();
        return result;
    } catch (error) {
        console.log(error)
        return error
    }


}