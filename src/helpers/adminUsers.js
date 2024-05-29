import axios from "axios";
/**
 * getUsers trae todos los usuarios registrados
 *
 * deleteUsers elimina un usuario
 * @param {string} url necesita la url con el ID del usuario a eliminar
 *
 */

const URL_USERS = process.env.NEXT_PUBLIC_API_URL_USERS;
const URL_BANNED_USER = process.env.NEXT_PUBLIC_API_URL_BANNED_USER;
const URL_JOBS = process.env.NEXT_PUBLIC_API_URL_JOBS;
const URL_BANNED_JOB = process.env.NEXT_PUBLIC_API_URL_BANNED_JOB;
const URL_CATEGORY = process.env.NEXT_PUBLIC_API_URL_CATEGORY;

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
// export const getUsers = async () => {
//   try {
//     const res = await axios.get(URL_USERS);
//     return res.data;
//   } catch (error) {
//     console.log(error, "fallo");
//   }
// };

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

// helpers/adminUsers.js

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
export const getPosts = async () => {
  try {
    const res = await axios.get(URL_JOBS);
    return res.data;
  } catch (error) {
    console.log(error, "fallo");
  }
};

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
