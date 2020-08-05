
const getBrandById = async (db, id) => {
    const row = await db
        .from('brand')
        .select('id', 'brand')
        .where({ 'id': id })
    return row
}

const updateBrandById = async (db, id, brand) => {
    await db('brand')
        .where({ 'id': id })
        .update({ 'brand': brand })
    const row = await db
        .from('brand')
        .select('id', 'brand')
        .where({ 'id': id })
    return row
}

const deleteBrandById = async (db, id) => {
    try {
        await db('brand')
            .where({ 'id': id })
            .del()
        return true
    } catch (err) {
        return false
    }
}

const insertBrand = async (db, brand) => {
    await db('brand').insert({ brand: brand })
    const row = await db
        .from('brand')
        .select('id', 'brand')
        .where({ brand: brand })
    return row
}

const selectBrands = async (db) => {
    const rows = await db
        .from('brand')
        .select('id', 'brand')
    return rows
}

module.exports = {
    getBrandById,
    updateBrandById,
    deleteBrandById,
    insertBrand,
    selectBrands,
}
