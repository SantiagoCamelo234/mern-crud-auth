export const validateSchema = (schema) => (req, res, next) => {
    try {
        schema.parse(req.body) // Comparamos los datos enviados por el cliente con el schema
        next()
    } catch(error){
        return res.status(400).json(error.errors.map(error => error.message))
    }
    
}