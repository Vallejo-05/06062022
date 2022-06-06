const atividades = require('../models/atividades')

module.exports = (app)=>{
    app.post('/atividades', async(req,res)=>{
        //recuperando as informacoes digitadas
        var dados = req.body
        //exibindo no terminal
        //console.log(dados)
        //conectar com o database
        const conexao = require('../config/database')()
        //model atividades
        const atividades = require('../models/atividades')
        //salvar as informacoes do formulario na database
        var salvar = await new atividades({
            data:dados.data,
            tipo:dados.tipo,
            disciplina:dados.disciplina,
            entrega:dados.entrega,
            instrucoes:dados.orientacao,
            usuario:dados.id
        }).save()

        //buscar todas as atividades desse usuario
        var buscar = await atividades.find({usuario:dados.id})
        //console.log(buscar)
        res.render('atividades.ejs',{nome:dados.nome,id:dados.id,dados:buscar})
    })

    //excluir atividades
    app.get("/excluir", async(req,res)=>{
        //recuperar o parametro id da barra de endereco
        var id = req.query.id
        var excluir = await atividades.findOneAndRemove({
            _id:id
        })
        //voltar para pagina atividades
        //res.render('atividades.ejs',{nome:dados.nome,id:dados.id,dados:buscar})
        res.send("Atividade Excluida!!")
    })
}