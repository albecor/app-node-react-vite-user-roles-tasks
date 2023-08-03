import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";

import {createRoles} from './libs/initialSeptup.js';
import authRoutes from "./routes/auth.routes.js";
import tasksRoutes from "./routes/tasks.routes.js"

//Initialization
const app = express();
createRoles(); //Crea en la base de datos los roles de usuario que se van a utilizar.

//Settings
app.set('port', process.env.PORT || 4001);

//Middleware
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))    
app.use(express.json()); //Permite que express entienda el formato json y muestre mensajes json 
                         //por consola y otros.
app.use(morgan('dev'));  //Permite ver por consola las peticiones que llegan.
app.use(cookieParser()); //Esta librería nos permite leer las cookies

//Routes
app.use("/api", authRoutes);
app.use("/api", tasksRoutes); 


export default app;