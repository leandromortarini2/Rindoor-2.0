import axios from "axios";
const URL = process.env.NEXT_PUBLIC_API_URL_JOBS;

export async function getWorkById(id) {
  try {
    console.log(URL);
    const response = await axios.get(`${URL}/${id}`);

    return response.data;
  } catch (error) {
    throw new Error(`Error al obtener datos de la API: ${error.message}`);
  }
}

//comentario
