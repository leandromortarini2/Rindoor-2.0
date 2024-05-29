import axios from "axios";

const AUTH_SIGNIN = process.env.NEXT_PUBLIC_API_URL_AUTH_SIGNIN;

/**
 * Esta funcion recibe el email del usuario y devuelve el token con los datos del usuario.
 * @param {string} email recibe el email desde useSession
 * @returns retorna el token desde el backend.
 */

const token = localStorage.getItem("token");

export const postEmail = async (email) => {
  try {
    const response = await axios.post(
      AUTH_SIGNIN,
      { email },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("Respuesta de la API:", response);
    return response.data;
  } catch (error) {
    console.error("Error al enviar la solicitud POST:", error);
    throw error;
  }
};
