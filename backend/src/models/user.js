const mongoose = require('../database');

const UserSchema = new mongoose.Schema({
    nome: {
        type:String,
        require: true,
    },
    sobrenome: {
        type:String,
        require: true,
    },
    email: {
        type:String,
        required:true,
        lowercase:true,   
    },
    nacionalidade: {
        type:String,
        required:true,
        lowercase:true,   
    },
    cep: {
        type:String,
        required:true,
        lowercase:true,   
    },
    estado: {
        type:String,
        required:true,
        lowercase:true,   
    },
    cidade: {
        type:String,
        required:true,
        lowercase:true,   
    },
    rua: {
        type:String,
        required:true,
        lowercase:true,   
    },
    numero: {
        type:String,
        required:true,
        lowercase:true,   
    },
    telefone: {
        type:String,
        required:true,
        lowercase:true,   
    },
    cpf: {
        type:String,
        required:true,
        unique: true,
        lowercase:true,   
    },
    createdAt: {
        type:Date,
        default: Date.now,
    },
})

const User = mongoose.model('User', UserSchema);

module.exports = User;