const jwt = require('jsonwebtoken');

const generarJWT = (uid) => { // parametro uid 

    return new Promise ((resolve, reject) =>{
      
        const payload ={uid};

    jwt.sign(payload, process.env.JWT_KEY, {
        expiresIn: '36h',
        // TO DO documentacion oficial 
    }, (err,token) => {
        if (err){    
            //  Not token
            reject('No se pudo generar el JWT');
        }
        else {
            resolve(token);
        }
    }
    );
    })
} 

module.exports = { generarJWT }