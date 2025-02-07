import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { LoginPage } from './pages/LoginPage'
import { RegisterPage } from './pages/RegisterPage'
import { TasksPage } from './pages/TasksPage'
import { AuthProvider } from './context/AuthContext'
import { TaskFormPage } from './pages/TaskFormPage'
import { ProfilePage } from './pages/ProfilePage'
import { HomePage } from './pages/HomePage'
import { ProtectedRoute } from './ProtectedRoute'

function App () {
  return (
    <AuthProvider>
      <BrowserRouter>
        {/*Creacion de multiples rutas*/}
        <Routes>
          {/*Rutas publicas*/}
          <Route path="/" element={<HomePage />} />
          {/*Creacion de una SOLA ruta*/}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/*" element={<h1>Not found</h1>} />

          <Route element={<ProtectedRoute/>}>
            {/*Rutas protegidas*/}
            <Route path="/tasks" element={<TasksPage />} />
            <Route path="/add-task" element={<TaskFormPage />} />
            <Route path="/task/:id" element={<TaskFormPage />} />
            {/*Ruta que recibe un parametro*/}
            <Route path="/profile" element={<ProfilePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App