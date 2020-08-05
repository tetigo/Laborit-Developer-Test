const router = require('express').Router()
const auth = require('../../middleware.js')

const brandModel = require('../models/brand')

const rota = (db) => {

    router.post('/', auth, async (req, res) => {
        const { userId, userType } = res.locals.auth_data
        if (userType !== 'admin') return res.status(401).send({ error: 'Não tem permissão' })
        const { brand } = req.body
        const row = await brandModel.insertBrand(db, brand)
        res.send(row)
    })

    router.get('/:id', auth, async (req, res) => {
        const { userId, userType } = res.locals.auth_data
        if (userType !== 'admin') return res.status(401).send({ error: 'Não tem permissão' })
        const id = req.params.id
        const row = await brandModel.getBrandById(db, id)
        res.send(row)
    })

    router.put('/:id', auth, async (req, res) => {
        const { userId, userType } = res.locals.auth_data
        if (userType !== 'admin') return res.status(401).send({ error: 'Não tem permissão' })
        const { brand } = req.body
        const id = req.params.id
        const row = await brandModel.updateBrandById(db, id, brand)
        res.send(row)
    })

    router.delete('/:id', auth, async (req, res) => {
        const { userId, userType } = res.locals.auth_data
        if (userType !== 'admin') return res.status(401).send({ error: 'Não tem permissão' })
        const id = req.params.id
        const ok = await brandModel.deleteBrandById(db, id)
        if(ok) res.send({msg: 'Item excluido'})
        else res.send({error: 'Erro na exclusão'})
    })

    router.get('/', async (req, res) => {
        const rows = await brandModel.selectBrands(db)
        res.send(rows)
    })

    return router
}

module.exports = rota