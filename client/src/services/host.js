import axios from 'axios'
const baseUrl = '/api/hosts'
const findUrl = '/api/hosts/find'

/*const host = async (creditials) => {
    const response = await axios.post(baseUrl, creditials)
    console.log(response.data)
    return response.data
}*/

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const getDestination = (destination) => {
    const request = axios.get(`${findUrl}/${destination}`)
    return request.then(response => response.data)
}

const create = async (newObject) => {
    console.log(newObject)
    const response = await axios.post(baseUrl, newObject)
    return response.data
}

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
}

export default {getAll, create, update, getDestination}