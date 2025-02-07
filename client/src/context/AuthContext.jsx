
import { registerRequest, loginRequest, verifyTokenRequest } from "../api/auth";
import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

export const AuthContext = createContext(); // Creacion de un contexto

export const useAuth = () => { // Hook para usar el contexto
    const context = useContext(AuthContext);
    if(!context){
        throw new Error("useAuth must be used within an AuthProvider")
    }

    return context;
}
 
// Creamos un provider (contexto que envuelve a otros componentes)
export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null) // estado para guardar los datos del usuario
    const [isAuthenticated, setIsAuthenticated] = useState(false) // estado que verifica si el usuario esta autenticado o no
    const [errors, setErrors] = useState([])
    const signup = async(user) => {
        try{
            const res = await registerRequest(user); // Envia peticion a la api
            setUser(res.data);
            setIsAuthenticated(true);
        }catch(e){
            setErrors(e.response.data)
            // console.log(e)
        }

    }

    const signin = async (user) => {
      try {
        const res = await loginRequest(user); // Envia peticion a la api
        console.log(res.data)
        setIsAuthenticated(true)
        setUser(res.data);
        
      } catch (error) {
        if(Array.isArray(error.response.data)){ // Verifica si el error viene en forma de arreglo
            return setErrors(errors.response.data)
        }else{
            setErrors([error.response.data.message]) // Pasa el mensaje del error a un array
        }
      }
    };

    useEffect(() => {
        if (errors.length > 0){
            const cleanErrors = setTimeout(()=>{
                setErrors([]);  // Limpia el estado de errors tras 2 segundos
            }, 2000)
        return () => clearTimeout(cleanErrors)
        }
    }, [errors])

    useEffect(() => {
        async function checkLogin() {
          const cookies = Cookies.get(); // Obtiene todos los valores de las cookies
          if (cookies.token) {
            try {
              const res = verifyTokenRequest(cookies.token);
              if (!res) setIsAuthenticated(false);
              setUser(res.data);
            } catch (error) {
              setIsAuthenticated(false);
              setUser(null);
            }
          }
        }

        checkLogin()
    }, [])
    return (
      <AuthContext.Provider
        value={{
          signup,
          user,
          isAuthenticated,
          errors,
          signin
        }}
      >
        {children /* Aqui van todos los elementos hijos*/}
      </AuthContext.Provider>
    );
}