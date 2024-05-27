import axios from "axios"

const URL_JOBS = process.env.NEXT_PUBLIC_API_URL_JOBS

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