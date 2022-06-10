import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config();

const generationToken = async (params) => {
    const token = jwt.sign(
        {
            _id: params._id,
            name: params.name,
            email: params.email
        },
        process.env.SECRET,
        { expiresIn: 86400 }
    )
    return params.token = token
}
export default {generationToken}