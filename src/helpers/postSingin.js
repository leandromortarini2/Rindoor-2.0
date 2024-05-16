import axios from "axios";

const AUTH_SIGNIN = process.env.NEXT_PUBLIC_API_URL_AUTH_SIGNIN;

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
