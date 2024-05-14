import axios from "axios";
const URL = "https://rindoor-backend.onrender.com/jobs";

export async function getWorks(params) {
  try {
    console.log(URL);
    const response = await axios.get(URL, { params });

    return response.data;
  } catch (error) {
    throw new Error(`Error al obtener datos de la API: ${error.message}`);
  }
}
