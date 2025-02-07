import User from "../models/user.model.js"; // Importamos el modelo de mongo
import bcrypt from "bcrypt";
import { createAccessToken } from "../libs/jwt.js";
import jwt from 'jsonwebtoken'
import {SECRET_TOKEN} from '../config.js'

export const register = async (req, res) => {
  const { email, password, username } = req.body; // req.body son los datos que el cliente envia

  try {

    const userFound = await User.findOne({email})
    if (userFound) return res.status(400).json(['User already exists'])
    const passwordHash = await bcrypt.hash(password, 10); // Encriptamos la contraseña
    const newUser = new User({
      // Creamos un nuevo usuario con los datos recibidos en el backend NO en la DB
      username,
      email,
      password: passwordHash,
    });
    const userSaved = await newUser.save(); // Guarda el usuario creado en la DB
    const token = await createAccessToken({ id: userSaved._id });

    res.cookie("token", token); // Crea una cookie con el token adentro y la guarda en el header

    res.json({
      id: userSaved._id,
      username: userSaved.username,
      email: userSaved.email,
    });
  } catch (error) {
    res.status(500).json([error.message])
  }
};

export const login = async(req, res) => {
  const { email, password } = req.body; // req.body son los datos que el cliente envia

  try {

    const userFound = await User.findOne({email}) // Encontramos el usuario por el email
    if(!userFound) return res.status(400).json({message: 'User not found'})
    
    const isMatch = await bcrypt.compare(password, userFound.password); // Comparamos la contraseña
    if(!isMatch) return res.status(400).json({message: 'Invalid Credentials'})
    
    const token = await createAccessToken({ id: userFound._id }); // Crea un token con el id del usuario encontrado

    res.cookie("token", token); // Crea una cookie con el token adentro y la guarda en el header

    res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
    });
  } catch (error) {
    res.status(500).json({message: error.message})
  }
};

export const logout = async(req, res) => {
  res.cookie('token', "", { // ELiminamos el token de la cookie
    expires: new Date(0)
  })

  return res.sendStatus(200)
}

export const profile = async(req, res) => {
  const userFound = await User.findById(req.user.id) // Buscamos el usuario por el id que tiene el token
  if(!userFound) return res.status(400).json({message: 'User not found'})

  return res.json({
    id: userFound._id,
    username: userFound.username,
    email: userFound.email
    })
  console.log(req.user)
}

// Verifica si el usuario existe
export const verifyToken = async(req, res) => {
  const {token} = req.cookies // cookies que envia el navegador

  if(!token) return res.status(401).json({message: "Unauthorized"})
  jwt.verify(SECRET_TOKEN, token, async(err, user) => {
     if (err) return res.status(401).json({message: 'Unauthorized'})
     const userFound = await User.findById(user.id)
     if(!userFound) return res.status(401).json({
      message:  "Unauthorized"
     })

     return res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email
     })
    })
  
} 