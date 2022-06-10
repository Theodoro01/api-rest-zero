import User from "../models/user.js"
import { v4 as uuidv4 } from 'uuid';
import { validate as isUuid } from 'uuid';
import crypto from "crypto";
import token from "../middlewares/token.js";
import bcrypt from "bcrypt"
import user from "../models/user.js";

export default {
    insert: async (req, res) => {
        try{
            const user = req.body;
            const validateEmail = await User.findOne({email: user.email});
            if(validateEmail){
                return res.status(400).send({ error: "User already exists" });
            }
            user._id = uuidv4();   
            const resultCreate = await User.create(user);
            resultCreate.password = undefined;
            const tokenGeneration = await token.generationToken({resultCreate});

            return res.status(201).json({ resultCreate , token: tokenGeneration});
        }catch(err){ 
            return res.status(400).json({error: 'Registration failed'});
        }
    },
    login: async (req, res) => {
        try {
            const { email, password } = req.body;   
            const user = await User.findOne({ email }).select('+password');

            if(!user){
                return res.status(400).json({error: "User not found"})
            }
            if (!await bcrypt.compare( password , user.password )){
                return res.status(400).json({ error: "Invalid user" })
            }

            user.password = undefined;

            const tokenGeneration = await token.generationToken({user});
            return res.status(201).json({user , token: tokenGeneration});
        }catch(err){ 
            console.log(err)
            return res.status(400).json({error: 'Registration failed'});
        }
    },
    search: async (req, res) => {
        try{
            const resultSearch = await User.find(); 
            return res.status(200).json({ data: resultSearch });
        }catch(err){
            return res.status(400).json({error: "Bad Request"});
        }
    },
    searchById: async (req, res) => {
        try{
            const {_id } = req.params;
            const validateUuid = isUuid(_id);
            const resultSearchById = await User.findById(_id);
            if (!await resultSearchById || !validateUuid){
                return res.status(404).json({error: "no user found, insert the correct id!!"});
            }   
            return res.status(200).json({resultSearchById});
        }catch(err){
            console.log(err)
            return res.status(400).json({error: "Bad Request"})
        }
    },
    deleteById: async (req, res) => {
        try{
            const {_id} = req.params;
            const validateId = await User.findById(_id);
            if(!validateId){
                return res.status(404).json({error: "no user found, insert the correct id!!"});
            }
            const resultDelete = await User.deleteOne({_id: _id});

            return res.status(200).json(validateId);
        }catch(err){
            return res.status(400).json({error: "there is something wrong"})
        }
    },
    updateById: async (req, res) => {
        try{
            const {_id } = req.params;
            const name = req.body;
            // console.log(name)
            // if(name === "" || name === " "){
            //     return res.status(400).json({error: "The name is mandatory!"});
            // }
            const validateId = await User.findById(_id);
            if(!validateId){
                return res.status(404).json({error: "no user found, insert the correct id!!"});
            }
            const resultUpdate = await User.findByIdAndUpdate({_id: _id}, name, {new: true})

            return res.status(200).json({resultUpdate});
        }catch(err){
            return res.status(400).json({error: "there is something wrong"})
        }
    }
}