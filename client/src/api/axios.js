import  axios  from "axios";

// Creacion de una estructura basica de axios
const instance = axios.create({
    baseURL: 'http://localhost:3000/api',
    withCredentials: true // Permite guardar las cookies 
})

export default instance

