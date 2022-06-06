module.exports = (app)=>{
    //abrir a view login.ejs
    app.get('/login',(req,res)=>{
        res.render('login.ejs')
    })

    //abrir a view atividades
    app.post('/login', async(req,res)=>{
        //conectar com o banco de dados
        const conexao = require('../config/database')() 
        //conectar a model usuarios
        const usuarios = require('../models/usuarios')
        //procurar pelo endereço de email
        console.log(req.body)
        var procurar = await usuarios.findOne({email:req.body.email})
        if(!procurar){
            return res.send('Email não cadastrado!!')
        }
        //comparar a senha digitada com a armazenada
        const bcrypt = require('bcryptjs')
        var comparar = await bcrypt.compare(req.body.senha,procurar.senha)
        if(!comparar){
            return res.send("Senha Incorreta")
        }
        //buscar os documentos na colecao atividades desse usuario
        const atividades =  require('../models/atividades')
        var buscar = await atividades.find({usuario:procurar._id})
        //abrir a view atividades e enviar nome e id
        res.render('atividades.ejs',{nome:procurar.nome,id:procurar._id,dados:buscar})
    })
}