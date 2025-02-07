import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/AuthContext"

export function ProtectedRoute(){
    const {user, isAuthenticated} = useAuth()
    if(!isAuthenticated) return <Navigate to='/login' replace/> // El replace sirve para que no vuelva a la ruta anterior y se sobreescriba
    return <Outlet/> // Significa que continua con el componente que esta adentro
}