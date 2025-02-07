import jwt from "jsonwebtoken";
import { SECRET_TOKEN } from "../config.js";

export const authRequired = (req, res, next) => {
  const { token } = req.cookies; // Leemos el token desde las cookies
  if (!token) return res.status(401).json({ message: "No token" }); // Verificamos la existencia del token
  // Comparamos que el token si sea creado por nosotros
  jwt.verify(token, SECRET_TOKEN, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid Token" });
    req.user = user; // Enviamos la informacion del usuario a la ruta por req
    next();
  });
};
