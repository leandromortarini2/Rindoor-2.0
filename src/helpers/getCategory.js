import axios from "axios";

const CATEGORY_URL = process.env.NEXT_PUBLIC_API_URL_CATEGORY;

export const getCategory = async () => {
  try {
    const response = await axios.get(CATEGORY_URL);

    return response.data;
  } catch (error) {
    console.error("Error al enviar la solicitud GET:", error);
    throw error;
  }
};
