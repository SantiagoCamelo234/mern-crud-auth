import { useForm } from "react-hook-form"; // Hook para validar los datos
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { useNavigate, Link } from 'react-router-dom'

export function RegisterPage() {
  const { register, handleSubmit, formState: { // Extraemos todos los valores que puedan ocurrir en el form
    errors
  }} = useForm(); // Extraemos las funciones que requerimos del hook
  const {signup, isAuthenticated, errors: registerErrors} = useAuth(); // Trae la funcion sign up de nuestro contexto
  const navigate = useNavigate()
  useEffect(() => {
    if(isAuthenticated) navigate("/tasks"); // Redirige a otra ruta
  }, [isAuthenticated])
  
  const onSubmit = handleSubmit(async (values) => {
    signup(values) // Le enviamos los datos del formulario a la funcion
  }); // Devuelve los datos del formulario como un objeto
  
  return (
    <div className="bg-zinc-800 max-w-md p-10 rounded-md">
      {registerErrors.map((error, i) => (
        <div className="bg-red-500 p-2 text-white" key={i}>
          {error}
        </div>
      ))}
      <form onSubmit={onSubmit}>
        <input
          type="text"
          {...register("username", { required: true })} // Creamos un input registrado para no tener que crear un estadi
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          placeholder="username"
        />
        {errors.username && (
          <p className="text-red-500"> User name is required</p>
        )}
        <input
          type="email"
          {...register("email", { required: true })}
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          placeholder="email"
        />
        {errors.email && <p className="text-red-500"> Email is required</p>}
        <input
          type="password"
          {...register("password", { required: true })}
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          placeholder="password"
        />
        {errors.password && (
          <p className="text-red-500"> Password is required</p>
        )}
        <button type="submit">Register</button>
      </form>
      <p className="flex gap-x-2 justify-between">
        Already have an account?
        <Link className="text-sky-500" to="/login">
          Sign in
        </Link>
      </p>
    </div>
  );
}
