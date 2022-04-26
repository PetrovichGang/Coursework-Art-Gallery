import Artist from "./artistModel.js"
import Artwork from "./artworkModel.js"

function Association(){
    Artist.hasMany(Artwork, {
        foreignKey: "authorId"
    })
    Artwork.belongsTo(Artist, {
        foreignKey: "authorId"
    })
}

export default Association