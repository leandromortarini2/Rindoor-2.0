import axios from "axios";

const URL_USERS = process.env.NEXT_PUBLIC_API_URL_USERS;
const URL_BANNED_USER = process.env.NEXT_PUBLIC_API_URL_BANNED_USER;
const URL_JOBS = process.env.NEXT_PUBLIC_API_URL_JOBS;
const URL_BANNED_JOB = process.env.NEXT_PUBLIC_API_URL_BANNED_JOB;
const URL_CATEGORY = process.env.NEXT_PUBLIC_API_URL_CATEGORY;
const URL_SUBSCRIPTION = process.env.NEXT_PUBLIC_API_URL_SUBSCRIPTION;

const token = localStorage.getItem("token");

// USERS
// USERS
// USERS
// USERS
// USERS
// USERS
// USERS
// USERS
// USERS

/**
 * Obtiene todos los usuarios registrados paginados.
 *
 * @async
 * @function getUsers
 * @param {number} page - Número de página que se desea obtener.
 * @param {number} pageSize - Cantidad de usuarios por página.
 * @returns {Promise<Object>} Los datos de los usuarios en la página especificada.
 *
 */

export const getUsers = async (page, pageSize) => {
  try {
    const res = await axios.get(
      `${URL_USERS}?page=${page}&pageSize=${pageSize}`
    );
    return res.data;
  } catch (error) {
    console.log(error, "fallo");
  }
};

/**
 * Prohíbe a un usuario.
 *
 * @async
 * @function banUser
 * @param {string} id - ID del usuario a prohibir.
 * @returns {Promise<Object>} Resultado de la acción de prohibir.
 */

export const banUser = async (id) => {
  const token = localStorage.getItem("token");
  try {
    const res = await axios.put(`${URL_BANNED_USER}/${id}`, null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error(`Error al banear el usuario con id ${id}`, error);
    return { error: true, message: error.message };
  }
};

// POST
// POST
// POST
// POST
// POST
// POST
// POST
// POST
// POST
// POST
// POST
// POST

/**
 * Obtiene todas las publicaciones.
 *
 * @async
 * @function getPosts
 * @returns {Promise<Object>} Los datos de las publicaciones.
 */
export const getPosts = async () => {
  try {
    const res = await axios.get(URL_JOBS);
    return res.data;
  } catch (error) {
    console.log(error, "fallo");
  }
};

/**
 * Prohíbe una publicación.
 *
 * @async
 * @function banPost
 * @param {string} id - ID de la publicación a prohibir.
 * @returns {Promise<Object>} Resultado de la acción de prohibir.
 */
export const banPost = async (id) => {
  const token = localStorage.getItem("token");
  try {
    const res = await axios.put(`${URL_BANNED_JOB}/${id}`, null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error(`Error al banear la publicación con id ${id}`, error);
    return { error: true, message: error.message };
  }
};

//! CATEGORIES
//! CATEGORIES
//! CATEGORIES
//! CATEGORIES
//! CATEGORIES
//! CATEGORIES
//! CATEGORIES

/**
 * Obtiene todas las categorías.
 *
 * @async
 * @function getCategory
 * @returns {Promise<Object>} Los datos de las categorías.
 */
export const getCategory = async () => {
  try {
    const res = await axios.get(URL_CATEGORY);
    return res.data;
  } catch (error) {
    console.log(error, "fallo");
  }
};

// ?
// ?
// ?

/**
 * Elimina una categoría.
 *
 * @async
 * @function deleteCategory
 * @param {string} id - ID de la categoría a eliminar.
 * @returns {Promise<Object>} Resultado de la acción de eliminar.
 */
export const deleteCategory = async (id) => {
  try {
    const res = await axios.delete(`${URL_CATEGORY}/${id}`);
    return res.data;
  } catch (error) {
    console.error(`Error al eliminar la publicacion con id ${id}`, error);

    return { error: true, message: error.message };
  }
};
// ?
// ?
// ?

/**
 * Edita una categoría.
 *
 * @async
 * @function editCategories
 * @param {string} id - ID de la categoría a editar.
 * @param {Object} formData - Datos actualizados de la categoría.
 * @returns {Promise<Object>} Resultado de la acción de editar.
 */
export const editCategories = async (id, formData) => {
  const token = localStorage.getItem("token");
  try {
    const res = await axios.put(`${URL_CATEGORY}/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error(`Error al editar la categoría con id ${id}`, error);
    return { error: true, message: error.message };
  }
};
// ?
// ?
// ?

/**
 * Crea una nueva categoría.
 *
 * @async
 * @function createCategoryAPI
 * @param {Object} formData - Datos de la nueva categoría.
 * @returns {Promise<Object>} Resultado de la acción de crear.
 */

export const createCategoryAPI = async (formData) => {
  const token = localStorage.getItem("token");
  try {
    const res = await axios.post(URL_CATEGORY, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error al crear la categoría ", error);
    return { error: true, message: error.message };
  }
};

// #### subscriptions
// #### subscriptions
// #### subscriptions
// #### subscriptions
// #### subscriptions
// #### subscriptions

/**
 * Obtiene todas las suscripciones.
 *
 * @async
 * @function getSubscriptions
 * @returns {Promise<Object>} Los datos de las suscripciones.
 * @throws Will throw an error if the request fails.
 */

export const getSubscriptions = async () => {
  const token = localStorage.getItem("token");
  try {
    const res = await axios.get(URL_SUBSCRIPTION, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error, "fallo");
  }
};
