import axios from 'axios'
const baseUrl = '/api/flats'

const host = async (creditials) => {
    const response = await axios.post(baseUrl, creditials)
    console.log(response.data)
    return response.data
}

export default {host}