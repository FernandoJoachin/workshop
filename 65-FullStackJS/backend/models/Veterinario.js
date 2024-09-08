import mongoose from "mongoose";
import bcrypt from "bcrypt";
import generarID from "../helpers/generarID.js";

const veterinarioScheme =  mongoose.Schema({
    nombre:{
        type: String,
        required: true,
        trim: true
    },
    password:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    telefono:{
        type: String,
        default: null,
        trim: true
    },
    web:{
        type: String,
        default: null,
    },
    token: {
        type: String,
        default: generarID()
    },
    confirmado:{
        type: Boolean,
        default: false
    }
});

veterinarioScheme.pre('save', async function(next){
    if(!this.isModified("password")){
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

veterinarioScheme.methods.comprobarPassword = async function(passwordFormulario) {
    return await bcrypt.compare(passwordFormulario, this.password);
}

const Veterinario = mongoose.model('Veterinario', veterinarioScheme);
export default Veterinario;