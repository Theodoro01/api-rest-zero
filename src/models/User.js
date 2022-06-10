import mongoose from "mongoose";
import bcrypt from "bcrypt";

const {model, Schema} = mongoose; 

const schema = new Schema({
    _id : String,    
    name : { type: String },
    email:{ type: String, unique: true, lowercase: true},
    password:{ type: String, select: false }, // select: false = Quando eu buscar uma lista de usuarios, não quero que a senha venha junto
    createAt:{ type: Date, default: Date.now }
});

schema.pre("save", async function(next){
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
}); 

export default model("user", schema, "user");