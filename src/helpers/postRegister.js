import axios from "axios";
/** Esta fuencion envia los datos del usuario al backend
 * @param {object} State recibe un objeto con los datos del usuario
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
