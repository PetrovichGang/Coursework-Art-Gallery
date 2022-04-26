import { DataTypes } from "sequelize"
import { db } from "./database.js"

const Artwork = db.define('Artwork', {
    id: { type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false, },
    authorId: { type: DataTypes.INTEGER, allowNull: false },
    created_date: { type: DataTypes.DATEONLY, allowNull: true },
    description: { type: DataTypes.STRING, allowNull: false },
    sizeX: { type: DataTypes.DOUBLE, allowNull: false },
    sizeY: { type: DataTypes.DOUBLE, allowNull: false },
    image: { type: DataTypes.STRING, allowNull: false },
    location: { type: DataTypes.STRING, allowNull: false }
}, { timestamps: false })

export default Artwork