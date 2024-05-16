import axios from "axios";

const USERS_URL = process.env.NEXT_PUBLIC_API_URL_USERS;

export const postRegister = async (State) => {
  try {
    const response = await axios.post(USERS_URL, State);

    return response.data;
  } catch (error) {
    console.error("Error al enviar la solicitud POST:", error);
    throw error;
  }
};
