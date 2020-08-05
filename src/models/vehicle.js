const insertVehicle = async (db, fuel, yearModel, value, model_id, brand_id) => {
    await db('vehicle').insert({ 'fuel': fuel, 'yearModel': yearModel, 'value': value, 'model_id': model_id, 'brand_id': brand_id })
    const row = await db
        .from('vehicle')
        .select('yearModel', 'fuel', 'value', 'model.model', 'brand.brand')
        .innerJoin('brand', 'brand.id', 'vehicle.brand_id')
        .innerJoin('model', 'model.id', 'vehicle.model_id')
        .where({ 'model.id': model_id })
    return row
}

const getVehicleByModelId = async (db, id) => {
    const rows = await db
        .from('vehicle')
        .select('value', 'brand.brand', 'model.model', 'yearModel', 'fuel')
        .innerJoin('brand', 'brand.id', 'vehicle.brand_id')
        .innerJoin('model', 'model.id', 'vehicle.model_id')
        .where({ 'vehicle.model_id': id })
    return row
}

const getVehicleById = async (db, id) => {
    const row = await db
        .from('vehicle')
        .select('value', 'brand.brand', 'model.model', 'yearModel', 'fuel')
        .innerJoin('brand', 'brand.id', 'vehicle.brand_id')
        .innerJoin('model', 'model.id', 'vehicle.model_id')
        .where({ 'vehicle.id': id })
    return row
}

const updateVehicleById = async (db, id, fuel, yearModel, value, brand_id, model_id) => {
    await db('vehicle')
        .where({ 'id': id })
        .update({ 'fuel': fuel, 'yearModel': yearModel, 'value': value, 'brand_id': brand_id, 'model_id': model_id })
    const row = await db
        .from('vehicle')
        .select('value', 'brand.brand', 'model.model', 'yearModel', 'fuel')
        .innerJoin('brand', 'brand.id', 'vehicle.brand_id')
        .innerJoin('model', 'model.id', 'vehicle.model_id')
        .where({ 'vehicle.id': id })
    return row
}

const deleteVehicleById = async (db, id) => {
    try {
        await db('vehicle')
            .where({ 'id': id })
            .del()
        return true
    } catch (err) {
        return false
    }
}

module.exports = {
    insertVehicle,
    getVehicleByModelId,
    getVehicleById,
    updateVehicleById,
    deleteVehicleById,
}