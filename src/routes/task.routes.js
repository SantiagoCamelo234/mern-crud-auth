import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
  getTasks,
  getTask,
  updateTask,
  deleteTask,
  createTask,
} from "../controllers/task.controller.js"; // Traemos las funciones del controlador
import { validateSchema } from "../middlewares/validator.middleware.js"; // Importamos el middleware validador del schema
import { createTaskSchema } from "../schemas/task.schema.js"; // Importamos el schema

const router = Router();

router.get("/tasks", authRequired,  getTasks); // Obtener
router.post(
  "/tasks",
  authRequired,
  validateSchema(createTaskSchema),
  createTask
); // Crear
router.delete("/tasks/:id", authRequired, deleteTask); // Eliminar
router.get("/tasks/:id", authRequired, getTask); // Obtener uno
router.put("/tasks/:id", authRequired, updateTask); // Actualizar uno

export default router;
