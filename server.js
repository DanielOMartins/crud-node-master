const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://danielMartins:daniel25@cluster0.da9el.mongodb.net/?retryWrites=true&w=majority"

MongoClient.connect(uri, (err, client) => {
    if(err) return console.log(err)
    db = client.db('test')

    app.listen(3000, function(){
        console.log('server running on port 3000')
    })
})

const mongoose = require('mongoose')
mongoose.connect(uri)

app.use(bodyParser.urlencoded({
    extended: true
}))

app.set('view engine', 'ejs')

app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/img', express.static(__dirname + 'public/img'))
app.use('/src', express.static(__dirname + 'public/src'))

app.get('/home', (req, res) =>{ //READ: ENVIA A INFORMAÇÃO
    //res.render('index.ejs')
    res.render('home.ejs')
})

app.get('/cadastro', (req, res) =>{ //READ: ENVIA A INFORMAÇÃO
    //res.render('index.ejs')
    res.render('index.ejs')
})

app.get('/listaProdutos', (req, res) =>{ //READ: ENVIA A INFORMAÇÃO
    //res.render('index.ejs')
    res.render('listaProdutos.ejs')
})
app.get('/editar', (req, res) =>{ //READ: ENVIA A INFORMAÇÃO
    //res.render('index.ejs')
    res.render('editar.ejs')
})

const Produtos = require('./model/produtos');
const { ObjectId } = require('mongodb');

app.get('/produtos', (req, res) =>{
    let listaProdutos = Produtos.find({}, function(err, produtos){
        if(err) console.log(err);
        res.json(produtos)
    })
})

app.get('/getProduto', (req, res) =>{
    let listaProdutos = Produtos.find({"_id": req.query._id}, function(err, produtos){
        if(err) console.log(err);
        res.json(produtos)
    })
})

app.post('/show', (req, res) => {
    db.collection('produtos').insertOne(req.body, (err, result) => {
        if (err) return console.log(err);
        console.log('Salvo com sucesso')
        res.redirect("/home")
    })
    
})

app.post('/atualizaProduto', async (req, res) =>{
    console.log(req.body._id);
    const filter = {"_id": ObjectId(req.body._id)}
    await Produtos.findByIdAndUpdate(ObjectId(req.body._id), {$set:{
        id: req.body.id,
        funcao: req.body.funcao,
        paciente: req.body.paciente,
        validade: req.body.validade,
        quant: req.body.quant
    }})
    
    res.redirect('/listaProdutos')
})

app.delete('/deletar', (req, res) =>{
    console.log(req.query.id);
    db.collection('produtos').deleteOne({"id": req.query.id});
})