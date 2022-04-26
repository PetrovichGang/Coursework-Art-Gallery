import Artist from "../models/artistModel.js"

export async function getArtists(req){
    if(req.query.offset)
        return await Artist.findAll({ limit: 5, offset: ((+req.query.offset ?? 0) -1 ) * 5 })
    else
        return await Artist.findAll()
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