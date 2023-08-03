import User from "../models/user.model.js";
import Role from '../models/role.model.js'
import jwt from "jsonwebtoken";
import { createAccessToken } from "../libs/jwt.js";
import { TOKEN_SECRET } from "../config.js";

export const register = async (req, res) => {
    try {
        console.log(req.body)
        const {username, email, password, roles} = req.body

        //check if the user is already registered
        const userFound = await User.findOne({ email });
        if (userFound)
            return res.status(400).json(["The email is already in use"]);

        //creating the user
        const newUser = new User({ username, email, password })        
        newUser.password = await newUser.encryptPassword(password);

        //Putting roles
        if (roles) {            
            const foundRoles = await Role.find({name: {$in: roles}})        
            newUser.roles = foundRoles.map(role => role._id)               
        } else {
            //Si no indicas ningún role se asignará el role "user"        
            const role = await Role.findOne({name: "user"})        
            newUser.roles = [role._id]                       
        }

        // saving the user in the database
        const userSaved = await newUser.save();

        // creating access token
        const token = await createAccessToken({ id: userSaved._id });

        ///Crea una cookie llamada token, con el valor token, para enviarla al navegador.
        res.cookie("token", token);       
        res.json({
            message: "User successfully created",
            id: userSaved._id,
            username: userSaved.username,
            email: userSaved.email
        })
        //console.log(newUser)
        //return res.json('registrando')        
    } catch (error) {
        res.status(500).json({ message: error.message });  
    }    
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const userFound = await User.findOne({ email });
        if(!userFound)
            return res.status(400).json({ message: ["The email does not exist"] });
        
        const isMatch = await userFound.comparePassword(req.body.password, userFound.password);
        if (!isMatch) {
            return res.status(400).json({
                message: ["The password is incorrect"],
            });
        }

        const token = await createAccessToken({ id: userFound._id });
        res.cookie("token", token, {
            //httpOnly: process.env.NODE_ENV !== "development",
            httpOnly: false,
            secure: true,
            sameSite: "none",
        });

        res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });        
    }
};
 
export const logout = async (req, res) => {
    res.cookie("token", "", {
        httpOnly: true,
        secure: true,
        expires: new Date(0),
    });
    return res.sendStatus(200);
};

export const profile = async (req, res) => {
    //console.log(req.user)
    const userFound = await User.findById(req.user.id)

    if (!userFound) return res.status(400).json({ message: "User not found" });

    return res.json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email        
    })
}


export const verifyToken = async (req, res) => {
    const { token } = req.cookies;
    //console.log(token)
    if (!token) return res.status(401).json({message: 'Unauthorized'});
  
    jwt.verify(token, TOKEN_SECRET, async (error, user) => {
      if (error) return res.sendStatus(401).json({message: 'Unauthorized'});
  
      const userFound = await User.findById(user.id);
      if (!userFound) return res.sendStatus(401).json({message: 'Unauthorized'});
  
      return res.json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
        token: token
      });
    });
  };
