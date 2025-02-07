import mongoose from "mongoose";
export const connectDB = async () => {
  // Toda conexion a bd es asincrona
  try {
    mongoose.connect("mongodb://localhost/merndb"); // Realizamos conexion a la db
    console.log('>>> DB is connected')
  } catch (error) {
    console.log(error);
  }
};
