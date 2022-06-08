import User from "../models/user.js"
import { v4 as uuidv4 } from 'uuid';
import crypto from "crypto";

export default {
    insert: async (req, res) => {
        const user = req.body;

        try{

            const validateEmail = await User.findOne({email: user.email});
            if(validateEmail){
                return res.status(400).send({ error: "User already exists" });
            }

            user._id = uuidv4();   

            const resultCreate = await User.create(user);
            resultCreate.password = undefined;
            return res.status(201).json(resultCreate);

        }catch(err){ 
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
        const {_id } = req.params;
        try{
            const resultSearchById = await User.findById(_id);
            if (! await resultSearchById){
                return res.status(404).json({error: "no user found, insert the correct id!!"});
            }   
            return res.status(200).json(resultSearchById);
        }catch(err){
            console.log(err)
            return res.status(400).json({error: "Bad Request"})
        }
    },
    deleteById: async (req, res) => {
        const {_id} = req.params;
        try{
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
        const {_id } = req.params;
        const user = req.body;

        try{
            const validateId = await User.findById(_id);
            if(!validateId){
                return res.status(404).json({error: "no user found, insert the correct id!!"});
            }
            const resultUpdate = await User.updateOne({_id: _id}, user)
            return res.status(200).json(resultUpdate);
        }catch(err){
            return res.status(400).json({error: "there is something wrong"})
        }
    }
}