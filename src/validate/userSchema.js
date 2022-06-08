const userSchema = {
    type: "object",
    properties: {
        name : { type:"string"},
        email:{ type: "string"},
        password:{ type: "string"}
    },
    required: ["name", "email", "password"], 
    additionalProperties: false
}

export default userSchema;
