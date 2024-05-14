import axios from "axios";

const JOBS_URL = process.env.NEXT_PUBLIC_API_URL_JOBS;

export const postNewPublic = async (State) => {
  try {
    const response = await axios.post(JOBS_URL, State);

    return response.data;
  } catch (error) {
    console.error("Error al enviar la solicitud POST:", error);
    throw error;
  }
};
