const express = require('express');

const User = require('../models/User');

const router = express.Router();


// CADASTRO DE PESSOA 
router.post('/', async (req, res) => {

    const { cpf } = req.body;
    try {
        if (await User.findOne({ cpf })) 
         return res.status(400).send({error: 'CPF já existe no banco de dados.'});
        
        const user = await User.create(req.body);
        return res.send ({ user });  
           
    } catch (err) {
        return res.status(400).send({ error: 'O cadastro falhou' })
    }
});

// LISTAGEM GERAL DE PESSOAS
router.get('/', async (req, res) => {
    const totalDate = await User.find()

    try {
        let {page, size, cpf} = req.query
        page = parseInt(page)
        if(!page) {
            page = 1;
        }

        if(!size) {
            size = 20;
        }

        const limit = parseInt(size);
        const skip = (page - 1) * size;

        if(cpf) {
             // const users = await User.find({}, {}, {limit: limit, skip: skip});
        const users = await User.find({cpf: cpf}).limit(limit).skip(skip);
        const meta = {
            count: totalDate.length
        }
            res.send({
                page, size, users, meta
            });
        } else {
            // const users = await User.find({}, {}, {limit: limit, skip: skip});
        const users = await User.find().limit(limit).skip(skip);
        const meta = {
            count: totalDate.length
        }
            res.send({
                page, size, users, meta
            });
        }
        
    } catch (err) {
        return res.status(400).send({ error: 'A listagem falhou' })
    }
});


//LISTAGEM INDIVIDUAL DE PESSOAS
router.get('/:_Id', async (req, res) => {
    try {
        const user = await User.findById(req.params._Id)

        return res.send({user})
    } catch(err) {
        return res.status(400).send({error: 'Não foi possivel encontrar o usuario'});
    }
})


// ALTERAR CADASTRO DE UMA PESSOA
router.put('/:_Id', async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params._Id, req.body, {new:true})

        return res.send({user})
    } catch(err) {
        return res.status(400).send({error: 'Não foi possivel encontrar o usuario'});
    }
})

// DELETAR CADASTRO PESSOA
router.delete('/:_Id', async (req, res) => {
    try {
        const user = await User.findByIdAndRemove(req.params._Id)
        return res.send()
    } catch(err) {
        return res.status(400).send({error: 'Não foi possivel encontrar o usuario'});
    }
})

module.exports = app => app.use('/auth', router);