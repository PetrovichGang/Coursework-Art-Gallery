import Artist from "../models/artistModel.js"

export async function getArtists(req){
    const { offset, q } = req.query
    const where = q ? {where: { name: { [Op.like]: `%${q}%` } }} : {}
    return await Artist.findAll({
        ...where,
        limit: 20,
        offset: (+(offset ?? 1) -1 ) * 20
    })
}
export async function getArtistById(req){
    return await Artist.findAll({ where: { id: req.params.id } })
}
export async function deleteArtistById(req){
    return await Artist.destroy({ where: { id: req.params.id } })
}
export async function deleteArtists(){
    return await Artist.destroy({ where: {} })
}
export async function updateArtist(req) {
    return await Artist.update(req.body, { where: { id: req.params.id } })
}
export async function createArtist(req){
    return await Artist.create(req.body)
}