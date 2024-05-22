import axios from "axios"

const URL_JOBS = process.env.NEXT_PUBLIC_API_URL_JOBS

export const getApplicants = async (id) => {
    try {
        const response = await axios.get(`${URL_JOBS}/${id}`)
        console.log(response.data)
        return response.data
    } catch (error) {
        console.log(error)
    }
}