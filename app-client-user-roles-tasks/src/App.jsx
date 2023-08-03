import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
//import { TaskProvider } from "./context/TasksContext";

import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import TasksPage from "./pages/TasksPage";
import TaskFormPage from "./pages/TaskFormPage";
import ProfilePage from "./pages/ProfilePage";

import ProtectedRoute from "./PRotectedRoute";
import { TaskProvider } from "./context/TasksContext";
import Navbar from "./components/Navbar";

function App() {
    return(
        <AuthProvider>
            <TaskProvider>
                <BrowserRouter>
                <main className="container mx-auto px-10">
                    <Navbar></Navbar>
                    <Routes>
                        {/*Landing page - ruta pública*/}
                        <Route path='/' element={<HomePage />} />

                        {/*Rutas públicas*/}
                        <Route path='/login' element={<LoginPage />} />
                        <Route path='/register' element={<RegisterPage />} />

                        {/*Rutas protegidas - sólo para usuarios logueados */}
                        <Route element={<ProtectedRoute />}>
                            <Route path='/tasks' element={<TasksPage />} />
                            <Route path='/add-task' element={<TaskFormPage />} />
                            <Route path='/tasks/:id' element={<TaskFormPage />} />
                            <Route path='/profile' element={<ProfilePage />} />
                        </Route>
                    </Routes>
                </main>    
                </BrowserRouter>
            </TaskProvider>
        </AuthProvider>
    )    
}

export default App