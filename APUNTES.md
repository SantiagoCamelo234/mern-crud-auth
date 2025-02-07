# PRACTICA MERN
- "type": "module": Habilitar los modulos de ECS6
- modulo creado por mi va con .js
- modulo de terceros sin .js

## Carpetas
- Controllers: logica de los endpoints
- libs: Codigo que podemos importar varias veces
- middlewares: Codigo que va antes de acceder al endpoint
- Models: Modelos para la base de datos
- Routes: Donde definimos todos los endpoints
- Schemas: Verificacion de la entrada de datos

## Archivos
- db.js: Conexion a la base de datos
- app.js: Creacion del servidor (express)
- config.js: Variables de entorno que necesitemos
- index.js: Arranque del backend con express y la base de datos

## Conexion base de datos 
- npm i mongoose
- mongodb crea la base de datos automaticamente cuando insertemos nuestro primer dato
- Un modelo es una forma de especificarle a MongoDB como son los datos que vamos a guardar

## Token
- String que recibe de forma adicional el frontend que tiene la funcionalidad de un pase
- jsonwebtoken
- payload: Contenido que trae el token
- key: caracteres para cifrar o descifrar la informacion
- **Middlewares:** Son funciones que se ejecutan antes de llegar a una ruta
- El next en lugar de retornar una respuesta del cliente da el permiso para continuar a la ruta
- cookie parser nos permite añadir un middleware para poder leer cookies


### FRONTEND
- react-router-dom = simula el enrutado de parte del frontend
-react-hook-form = maneja el cambio de estado y tambien la validacion
 - register = forma de registrar un campo de un formulario
 - handleSubmit = actualiza el estado y valida los datos segun el register (devuelve los datos del formulario en forma de objeto)
- axios  = libreria para consumir api de forma rapida y simple
- los timer en react consumen muchos recursos por eso es mejor limpiarlos
- el protected route es una ruta que nos va a permitir seleccionar que datos existen en el navegador para que pueda redirigir
- cada vez que me redirija a una ruta manualmente la aplicacion se recargara y todos los estados volveran a su estado inicial
- js-cookie : Libreria que nos permite leer las cookies desde el frontend