import axios from "axios";
/**
 * getUsers trae todos los usuarios registrados
 *
 * deleteUsers elimina un usuario
 * @param {string} url necesita la url con el ID del usuario a eliminar
 *
 */

const URL_USERS = process.env.NEXT_PUBLIC_API_URL_USERS;

export const getUsers = async () => {
  try {
    const res = await axios.get(URL_USERS);
    return res.data;
  } catch (error) {
    console.log(error, "fallo");
  }
};

export const deleteUsers = async (id) => {
  try {
    const res = await axios.delete(`${URL_USERS}/${id}`);
    return res.data;
  } catch (error) {
    console.error(`Error al eliminar el usuario con id ${id}`, error);

    return { error: true, message: error.message };
  }
};
