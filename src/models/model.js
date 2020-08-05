const insertModel = async (db, model, brand_id) => {
    await db('model').insert({ model: model, brand_id: brand_id })
    const row = await db
        .from('model')
        .select('id', 'model')
        .where({ 'model': model })
    return row
}

const getModelByBrandId = async (db, id) => {
    const row = await db
        .from('model')
        .select('id', 'model')
        .where({ 'brand_id': id })
    return row
}

const getModelById = async (db, id) => {
    const row = await db
        .from('model')
        .select('id', 'model')
        .where({ 'id': id })
    return row
}

const updateModelById = async (db, id, model) => {
    await db('model')
        .where({ 'id': id })
        .update({ 'model': model })
    const row = await db
        .from('model')
        .select('id', 'model')
        .where({ 'id': id })
    return row
}

const deleteModelById = async (db, id) => {
    try {
        await db('model')
            .where({ 'id': id })
            .del()
        return true
    } catch (err) {
        return false
    }

}

module.exports = {
    insertModel,
    getModelByBrandId,
    getModelById,
    updateModelById,
    deleteModelById,
}