import axios from 'axios'
const baseUrl = '/api/users'

const signup = async (creditials) => {
    const response = await axios.post(baseUrl, creditials)
    return response.data
}

export default {signup}