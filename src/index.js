import app from  './app.js'
import { connectDB } from './db.js'

connectDB(); // Ejecutamos la conexion a la db
app.listen(3000);// Puerto donde vamos a escuchar el servidor
console.log('Server on port', 3000);
