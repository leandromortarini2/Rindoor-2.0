import axios from "axios";

const AUTH_SIGNIN = process.env.NEXT_PUBLIC_API_URL_AUTH_SIGNIN;
/**
 * Envía una solicitud de inicio de sesión por correo electrónico.
 *
 * @async
 * @function postEmail
 * @param {string} email - Dirección de correo electrónico del usuario.
 * @returns {Promise<Object>} La respuesta de la solicitud de inicio de sesión.
 * @throws Will throw an error if the request fails.
 */

export const postEmail = async (email) => {
  try {
    const response = await axios.post(AUTH_SIGNIN, { email });
    console.log("Respuesta de la API:", response);
    return response.data;
  } catch (error) {
    console.error("Error al enviar la solicitud POST:", error);
    throw error;
  }
};
