import axios from "axios";
import React from "react";

const URL_SUBSCRIPTION = process.env.NEXT_PUBLIC_API_URL_SUBSCRIPTION;
const URL_SUBSCRIPTION_CANCEL =
  process.env.NEXT_PUBLIC_API_URL_SUBSCRIPTION_CANCEL;
const URL_SUBSCRIPTION_PLANS =
  process.env.NEXT_PUBLIC_API_URL_SUBSCRIPTION_PLANS;

/**
 * Obtiene la información de la suscripción del usuario actual.
 *
 * @async
 * @function getSubscription
 * @returns {Promise<Object>} La información de la suscripción del usuario.
 * @throws Will throw an error if the request fails.
 */

export const getSubscription = async () => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.get(URL_SUBSCRIPTION_PLANS, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log(response.data)
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

/**
 * Realiza una nueva suscripción para un plan específico.
 *
 * @async
 * @function postSubscription
 * @param {Object} plan - Los detalles del plan de suscripción.
 * @returns {Promise<Object>} La respuesta de la creación de la suscripción.
 * @throws Will throw an error if the request fails.
 */
export const postSubscription = async (plan) => {
  const token = localStorage.getItem("token");
  try {
    console.log("plan helper", plan);
    const response = await axios.post(URL_SUBSCRIPTION, plan, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("response post", response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

/**
 * Obtiene la información de un usuario por su ID de suscripción.
 *
 * @async
 * @function getUser
 * @param {string} id - El ID del usuario para obtener su información de suscripción.
 * @returns {Promise<Object>} La información de la suscripción del usuario.
 * @throws Will throw an error if the request fails.
 */
export const getUser = async (id) => {
  try {
    const response = await axios.get(`${URL_SUBSCRIPTION}/${id}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

/**
 * Cancela la suscripción de un usuario por su ID.
 *
 * @async
 * @function cancellSubscription
 * @param {string} id - El ID del usuario cuya suscripción se va a cancelar.
 * @returns {Promise<Object>} La respuesta de la cancelación de la suscripción.
 * @throws Will throw an error if the request fails.
 */
export const cancellSubscription = async (id) => {
  try {
    const response = await axios.put(`${URL_SUBSCRIPTION_CANCEL}/${id}`);
    console.log("response helper cancelled", response);
    return response;
  } catch (error) {
    console.log(error);
  }
};
