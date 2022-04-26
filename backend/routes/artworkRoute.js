import Artist from "../models/artistModel.js"
import Artwork from "../models/artworkModel.js"

export async function getArtworks(req){
    if(req.query.offset)
        return await Artwork.findAll({ limit: 5, offset: ((+req.query.offset ?? 0) -1 ) * 5, include: [{ model: Artist }] })
    else
        return await Artwork.findAll({include: [{ model: Artist }]})
}
export async function getArtworkById(req){
    return await Artwork.findAll({ where: { id: req.params.id } })
}
export async function deleteArtworkById(req){
    return await Artwork.destroy({ where: { id: req.params.id }})
}
export async function deleteArtworks(){
    return await Artwork.destroy({where: {}})
}
export async function updateArtwork(req) {
    return await Artwork.update(req.body, { where: { id: req.params.id } })
}
export async function createArtwork(req){
    return await Artwork.create(req.body)
}