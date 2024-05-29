import axios from "axios";
const URL = process.env.NEXT_PUBLIC_API_URL_JOBS;

const URL_API_POSTULATIONS = process.env.NEXT_PUBLIC_API_URL_POSTULATIONS

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

export const postPostulation = async (data) => {
  const token = localStorage.getItem("token");
  try {
    console.log(data, 'data que recibe el helper');
    const response = await axios.post(URL_API_POSTULATIONS, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data, 'response.data helper postulations');
    return { success: true, data: response.data };
  } catch (error) {
    console.log(error, 'error postPostulation');
    return {
      success: false,
      message: error.response?.data?.message || error.message,
      statusCode: error.response?.data?.statusCode,
    };
  }
};