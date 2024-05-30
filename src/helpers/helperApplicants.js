import axios from "axios"

const URL_JOBS = process.env.NEXT_PUBLIC_API_URL_JOBS
const URL_JOBS_FINISH = process.env.NEXT_PUBLIC_API_URL_JOBS_FINISH
const URL_POSTULATIONS_CLOSE = process.env.NEXT_PUBLIC_API_URL_POSTULATIONS_CLOSE
const URL_USERS = process.env.NEXT_PUBLIC_API_URL_USERS

/** esta funcion hace un solicitud get a /jobs para traerse de la base de datos, un array de todos los trabajos que hay guardados. 
 * devuelve ese array de
*/
export const getJobsMyPosts = async () => {
    try {
        const response = await axios.get(URL_JOBS)
        console.log(response.data, 'response.data helper')
        return response.data
    } catch (error) {
        console.log(error)
    }
}


/** funcion asincrona donde hago un get a /jobs/{id}, donde me devuleve la informacion de un trabajo en especifico, la solicitud me devuelve, la info del trabajo, la info del cliente que la creo y todos los postulantes de ese trabajo */
export const getJobIdMyPosts = async (id) => {
    try {
        const response = await axios.get(`${URL_JOBS}/${id}`)
        console.log(response.data, '+++++++++++++++++ helper jobs id')
        return response.data
    } catch (error) {
        console.log(error)
    }
}

/**
 * Esta funcion permite finalizar un trabajo, es decir cuando un cliente o profesional de click en un boton de 'Finalizar Trabajo' este aparezca como finalizado. 
 * Esta funcion recibe por parametros un jobId y userId. Hace una solicitud PUT a '/jobs/finish', enviando esos parametros, y devuelve ...
 */
export const putJobFinish = async (jobData) => {
    const token = localStorage.getItem("token");
    try {
        const response = await axios.put(URL_JOBS_FINISH, jobData,{
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
        console.log('response.data job finish ---->', response.data)
        return response.data
    } catch (error) {
       console.log(error) 
    }
}

export const putPostulationsClose = async (data) => {
    const token = localStorage.getItem("token");
    try {
        const response = await axios.put(URL_POSTULATIONS_CLOSE, data,{
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
        console.log(response.data, 'response.data put close')
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const getUserById = async (id) => {
    try {
      const res = await axios.get(`${URL_USERS}/${id}`);
      return res.data;
    } catch (error) {
      console.error(`Error al obtener el usuario con ID ${id}:`, error);
      return { error: true, message: error.message };
    }
  };

export const postUserChat = async (id) => {
  try {
    const response = await axios.post(URL_USERS, id)
    console.log(response.data, 'response.data de postUserChat')
    return response.data
  } catch (error) {
    console.log(error, 'error post par chat')
  }
}