import axios from "axios";
/**
 * Realiza un registro de usuario.
 *
 * @async
 * @function postRegister
 * @param {Object} State - Estado del formulario de registro.
 * @returns {Promise<Object>} La respuesta de la solicitud de registro.
 * @throws Will throw an error if the request fails.
 */

const AUTH_SIGNUP_URL = process.env.NEXT_PUBLIC_API_URL_AUTH_SIGNUP;

export const postRegister = async (State) => {
  try {
    const response = await axios.post(AUTH_SIGNUP_URL, State);

    return response.data;
  } catch (error) {
    console.error("Error al enviar la solicitud POST:", error);
    throw error;
  }
};
