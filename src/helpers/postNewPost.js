import axios from "axios";

const JOBS_URL = process.env.NEXT_PUBLIC_API_URL_JOBS;
/**
 * Esta funcion envia los datos del trabajo al backend.
 * @param {object} State recibe el estado, del formulario createJob.
 *
 */

const token = localStorage.getItem("token");

export const postNewPublic = async (State) => {
  try {
    const response = await axios.post(JOBS_URL, State, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error al enviar la solicitud POST:", error);
    throw error;
  }
};
