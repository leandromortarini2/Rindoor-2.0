import axios from "axios";

/**
 * Esta funcion trae todas las categorias
 * @param {URL} url url de .env
 * @returns {object} retorna la data de las categorias.
 */
const CATEGORY_URL = process.env.NEXT_PUBLIC_API_URL_CATEGORY;

const token = localStorage.getItem("token");

export const getCategory = async () => {
  try {
    const response = await axios.get(CATEGORY_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error al enviar la solicitud GET:", error);
    throw error;
  }
};
