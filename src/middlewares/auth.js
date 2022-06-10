import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config();

// const auth = async (req, res, next) => {
//     const authHeader = req.headers['authorization'];

//     if(!authHeader){
//         return res.status(401).send({ error: 'No token provided'});
//     }
    
//     const parts = authHeader.split(' ');

//     if(!parts.length === 2){
//         return res.status(401).send({ error: 'Token error'});
//     }

//     const [ scheme, token] = parts;

//     if(!(/^Bearer$/i.test(scheme)))
//     return res.status(401).send({ error: 'Token malformatted'});

//     jwt.verify(token, process.env.SECRET, (err, decoded) => {
//         if(err){ 
//             return res.status(401).send({ error: 'Token invalid'});
//         }
//         req.userId = decoded._id;
//         req.userName = decoded.name;
//         req.userEmail = decoded.email;
//         return next();    
//     });
// }

const validateToken = async (params) => {
    let resultValidate;
    if (params != undefined) {
        const bearer = params.split(' ');
        const token = bearer[1]
        
        jwt.verify(token, process.env.SECRET, (err, data) => {
            if (err) {
                console.log(err.message)
                if (err.message === "jwt expired") {
                    resultValidate = { status: 'Sessão inválida', code: 408 }
                }
                if (err.message === "invalid token") {
                    resultValidate = { status: 'Não autorizado', code: 401 }
                }
            } else {
                resultValidate = { 
                    status: 'authenticate',
                    data: data.name,
                    email: data.email
                }
            }
        });
    } else {
        resultValidate = { status: 'Não autorizado', code: 411 }
    }
    return resultValidate
}
const auth = async (req, res, next) => {
    const authToken = req.headers['authorization']
    const result = await validateToken(authToken)
    console.log(result)
    if (result.status == 'authenticate') {
        req.body.name = result.name
        req.body.email = result.email
        // console.log("Cheguei aqui!! Token: " + authToken)
        next()
    }else{
        res.status(result.code).json({ err: 'Não autorizado' })
    }
}
export default {auth, validateToken}