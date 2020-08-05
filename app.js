const express = require('express')
 
const app = express()

const knex = require('knex')
const config = require('./knexfile.js').development
const db = knex(config)

const bodyParser = require('body-parser')
const brandsRoutes = require('./src/routes/brands')
const modelsRoutes = require('./src/routes/models')
const vehiclesRoutes = require('./src/routes/vehicles')
const userRoutes = require('./src/routes/user')


app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

app.use('/user/auth', userRoutes(db))
app.use('/api/brands', brandsRoutes(db))
app.use('/api/models', modelsRoutes(db))
app.use('/api/vehicles', vehiclesRoutes(db))

app.get('/', (req, res)=>{
    res.send({mensagem: 'Servidor tá rodando'})
})

app.listen(3000,()=>console.log('ouvindo na porta 3000'))


