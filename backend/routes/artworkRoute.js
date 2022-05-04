import Artist from "../models/artistModel.js"
import Artwork from "../models/artworkModel.js"
import { Op } from 'sequelize'

export async function getArtworks(req){
    const { offset, q } = req.query
    const where = q ? {where: { name: { [Op.like]: `%${q}%` } }} : {}
    return await Artwork.findAll({
        ...where,
        limit: 20,
        offset: (+(offset ?? 1) -1 ) * 20,
        include: [
            { model: Artist }
        ]
    })
}
export async function getArtworkById(req){
    return await Artwork.findAll({ where: { id: req.params.id }, include: [{ model: Artist }] })
}
export async function getArtworkByArtistId(req){
    return await Artwork.findAll({ where: { authorId: req.params.authorId } })
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