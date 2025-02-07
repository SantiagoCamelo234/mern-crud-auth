import axios from "./axios.js";



export const registerRequest = user => axios.post(`/register`, user) // user = req.body

export const loginRequest = user => axios.post(`/login`, user)

export const verifyTokenRequest = () => axios.get('/verify') // Peticion que verifica el token 