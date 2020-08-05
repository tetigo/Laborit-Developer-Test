const router = require('express').Router()
const auth = require('../../middleware.js')
const vehicleModel = require('../models/vehicle')

const rota = (db) => {

    router.post('/', auth, async (req, res) => {
        const { userId, userType } = res.locals.auth_data
        if (userType !== 'admin') return res.status(401).send({ error: 'Não tem permissão' })
        const { fuel, yearModel, value, model_id, brand_id } = req.body
        const row = await vehicleModel.insertVehicle(db, fuel, yearModel, value, model_id, brand_id)
        res.send(row)
    })

    router.get('/:id', auth, async (req, res) => {
        const { userId, userType } = res.locals.auth_data
        const id = req.params.id
        if (userType !== 'admin') {
            const rows = await vehicleModel.getVehicleByModelId(db, id)
            res.send(rows)
        } else {
            const row = await vehicleModel.getVehicleById(db, id)
            res.send(row)
        }
    })

    router.put('/:id', auth, async (req, res) => {
        const { userId, userType } = res.locals.auth_data
        if (userType !== 'admin') return res.status(401).send({ error: 'Não tem permissão' })
        const { fuel, yearModel, value, brand_id, model_id } = req.body
        const id = req.params.id
        const row = await vehicleModel.updateVehicleById(db, id, fuel, yearModel, value, brand_id, model_id)
        res.send(row)
    })

    router.delete('/:id', auth, async (req, res) => {
        const { userId, userType } = res.locals.auth_data
        if (userType !== 'admin') return res.status(401).send({ error: 'Não tem permissão' })
        const id = req.params.id
        const ok = vehicleModel.deleteVehicleById(db, id)
        if(ok) res.send({ msg: 'Item excluido' })
        else res.send({error: 'Erro na exclusão'})
    })


    return router
}

module.exports = rota
