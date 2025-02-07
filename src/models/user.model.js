import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  // Creacion del Schema
  username: {
    type: String, // Tipo
    required: true, // Obligatorio
    trim: true // Quita los espacios
  },
  email: {
    type: String,
    required: true,
    unique: true // Cada email es unico
  },
  password: {
    type: String,
    required: true,
  },
}, {
  timestamps: true // Añade fecha de creacion y fecha de actualizacion
}); 

export default mongoose.model('User', userSchema) // El modelo crea el objeto para poder hacer consultas