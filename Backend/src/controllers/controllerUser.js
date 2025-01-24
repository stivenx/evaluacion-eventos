const User = require("../models/users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.register = async (req, res) => {
    
    try {
        const { userName, password } = req.body;

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(userName)) {
        return res.status(400).json({ message: "El userName debe ser un email válido" });
        }
        const hashedPasword = await bcrypt.hash(password, 10);
        const existingUser = await User.findOne({ userName });
        if (existingUser) {
            return res.status(400).json({ message: "El usuario ya existe" });
        }
        
        const user = new User({ userName, password: hashedPasword });
        await user.save();
        res.status(201).json({ message: "Usuario creado con éxito" });
        
    } catch (error) {
        return res.status(500).json({ message: "Error al crear el usuario" });
        
    }
   
};

exports.login = async (req, res) => {
    try {
        const { userName, password } = req.body;
        const user = await User.findOne({ userName });

        if(!user || !await bcrypt.compare(password, user.password)) {
            return res.status(401).json({ message: "Credenciales incorrectas" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.status(200).json({message: "Inicio de sesión exitoso", token });
    } catch (error) {
        return res.status(500).json({ message: "Error al iniciar sesión" });    
    }

};

