import express from 'express'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import cors from 'cors'

import authRoutes from './routes/auth.routes.js' // Importamos las rutas que creamos
import taskRoutes from './routes/task.routes.js' // Importamos las rutas de tasks
// app es basicamente el servidor
const app = express() // Una vez inicializado el servidor devuelve el objeto
app.use(cors({
    origin: 'http://localhost:5173', // Solo permite que este dominio se comunique con el backend
    credentials: true // Permite el paso de las credenciales hacia el frontend (cookies)
}))
// Middlewares
app.use(morgan('dev')) // Muestra en consolo cada vez que hayan peticiones
app.use(express.json()) // Middleware para procesar informacion en formato JSON
app.use(cookieParser()) // Permite leer la informacion de las cookies

// Rutas
app.use("/api", authRoutes) // Usamos las rutas que creamos (todas las rutas de authRoutes van a comenzar con /api)
app.use("/api", taskRoutes) // Usamos las rutas de tasks


export default app