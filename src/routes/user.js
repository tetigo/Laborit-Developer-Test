const router = require('express').Router()
const bcrypt = require('bcrypt')
const config2 = require('../../config')
const jwt = require('jsonwebtoken')


const rota = (db) => {
    
    //funcao auxiliadora
    const createUserToken = (userId, userType) =>{
        return jwt.sign({userId, userType},  config2.SUPER_HIDDEN_PASS, {expiresIn: '7d'})
    }


    return router.post('/',async (req, res)=>{
        // console.log(req.body)
        const {email, password} = req.body
        if(!email || !password) return res.status(400).send({error: 'Dados insuficientes'})
        let rows = {}
        try {
            rows = await db
                .from('user')
                .select('id','email','password','usertype')
                .where({email: email})
            // console.log(rows[0].email, rows)
            if(!rows[0].email) return res.status(400).send({error: 'Usuario não registrado'})
    
        } catch (err) {
            return res.status(500).send({error: 'Erro buscando usuario '+ err})
        }
        try {
            // console.log(password, rows[0].password)
            const ok = await bcrypt.compare(String(password), String(rows[0].password))
            if (!ok) return res.status(401).send({error: 'Senha inválida'})
            return res.send({email:rows[0].email, usertype:rows[0].usertype, token: createUserToken(rows[0].id, rows[0].usertype)})
        } catch (err) {
            return res.status(500).send({error: 'Erro na criptografia '+ err})
        }
    })
}


module.exports = rota