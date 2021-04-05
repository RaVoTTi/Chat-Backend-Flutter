// response = brinda cierto tipado, ayuda de vs-code
const { response } = require('express') // {variable o funcion} = desestructuracion
const { validationResult, body } = require('express-validator');
const bcrypt = require('bcryptjs');

const User = require('../models/user');
const { generarJWT } = require('../helpers/jwt');

const createUser = async (req, res = response) => {


    const { email, password } = req.body;

    try {

        const existeEmail = await User.findOne({ email: email }); // {email}

        if (existeEmail) {
            console.log(existeEmail);
            return res.status(400).json({
                ok: false,
                msg: 'El email esta registrado' // no es una bueno info para brindar por seguridad
            });

        }

        const user = new User(req.body);

        // Encriptar contrasena
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        // grabar usuario
        await user.save();

        // generar JWT

        const token = await generarJWT(user._id);

        res.json({
            ok: true,
            msg: 'User created!!!!',
            user,
            token,
            // password: user.password

        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            ok: false,
            msg: 'F por la app'
        })
    }
}
const loginUser = async (req, res = response) => {

    const { email, password } = req.body;
    //  no se pueden enviar 2 res jajaja
    try {

        const userDB = await User.findOne({ email: email }); // {email}
        console.log('Login', userDB)
        if (!userDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Email no encontrado'
            })
        }

        const validPassword = bcrypt.compareSync(password, userDB.password); // compara las contrasenas

        if (!validPassword) {
            return res.status(404).json({
                ok: false,
                msg: 'Contrasena no es correcta'
            })
        }

        const token = generarJWT(userDB._id);

        res.json({
            ok: true,
            msg: 'Login correctly',
            userDB,
            token,
            // password: user.password

        });

    }

    catch (err) {
        console.log(err);
        res.status(500).json({
            ok: false,
            msg: 'F por la app'
        })
    }
}
// const renewToken = (req, res = response) =>{
//     res.json({
//         ok: true,
//         msj: 'Renew',
        
//     });
// }
module.exports = {
    createUser,
    loginUser,
    // renewToken
}