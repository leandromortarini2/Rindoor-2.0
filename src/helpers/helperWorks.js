import axios from "axios";
const URL = process.env.NEXT_PUBLIC_API_URL_JOBS;

export async function getWorks(params) {
  try {
    console.log(URL);
    const response = await axios.get(URL, { params });

    return response.data;
  } catch (error) {
    throw new Error(`Error al obtener datos de la API: ${error.message}`);
  }
}
