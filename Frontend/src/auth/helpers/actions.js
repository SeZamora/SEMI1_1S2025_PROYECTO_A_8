const api = import.meta.env.VITE_API_URL;

export const login = async (data) => {
    try {
        console.log(data);
        const response = await fetch(`${api}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: data.username,
                password: data.password
            }),
        });

        if (!response.ok) {
            throw new Error('Credenciales incorrectas');
        }

        const result = await response.json();

        return {
            exito: true,
            mensaje: "Inicio de sesión exitoso",
            usuario: {
                id: result.user_id,
                usuario: result.username,
                correo: result.email,
                fotoPerfil: result.profile_picture
            }
        };

    } catch (error) {
        return {
            exito: false,
            mensaje: error.message
        };
    }
};
