import {Router} from 'express' // Traemos la funcion de Router
import { login, register, logout, profile, verifyToken } from '../controllers/auth.controller.js'; // Importacion de las funciones del controlador
import { authRequired } from '../middlewares/validateToken.js'; // Imprtamos el middleware
import { validateSchema } from "../middlewares/validator.middleware.js"; // Traemos el midleware de validacion
import { registerSchema, loginSchema } from '../schemas/auth.schema.js'; // Traemos los schemas
const router = Router() // Guardamos el objeto en una constante

// Definicion de las rutas
router.post("/register", validateSchema(registerSchema), register)
router.post("/login", validateSchema(loginSchema), login);
router.post("/logout", logout);
router.get("/verify" , verifyToken); // Ruta protegida por el middleware
router.get("/profile", authRequired ,profile); // Ruta protegida por el middleware

export default router // Exportamos para que express los pueda leer