const router = require('express').Router()
const auth = require('../../middleware.js')
const modelModel = require('../models/model')

const rota = (db) => {

    router.post('/', auth, async (req, res) => {
        const { userId, userType } = res.locals.auth_data
        if (userType !== 'admin') return res.status(401).send({ error: 'Não tem permissão' })
        const { model, brand_id } = req.body
        const row = await modelModel.insertModel(db, model, brand_id)
        res.send(row)
    })

    router.get('/:id', auth, async (req, res) => {
        const { userId, userType } = res.locals.auth_data
        const id = req.params.id
        if (userType !== 'admin') {
        console.log(row)
            const row = await modelModel.getModelByBrandId(db, id)
            res.send(row)
        } else {
            const row = await modelModel.getModelById(db, id)
            res.send(row)
        }
    })

    router.put('/:id', auth, async (req, res) => {
        const { userId, userType } = res.locals.auth_data
        if (userType !== 'admin') return res.status(401).send({ error: 'Não tem permissão' })
        const { model } = req.body
        const id = req.params.id
        const row = await modelModel.updateModelById(db, id, model)
        res.send(row)
    })

    router.delete('/:id', auth, async (req, res) => {
        const { userId, userType } = res.locals.auth_data
        if (userType !== 'admin') return res.status(401).send({ error: 'Não tem permissão' })
        const id = req.params.id
        const ok = await modelModel.deleteModelById(db, id)
        if (ok) res.send({ msg: 'Item excluido' })
        else res.send({ error: 'Erro na exclusão' })
    })

    return router
}

module.exports = rota