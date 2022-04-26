import { DataTypes } from "sequelize"
import { db } from "./database"

export const Artwork = db.define('Artwork', {
    id: { type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false, },
    author: { type: DataTypes.INTEGER, allowNull: true },
    created_date: { type: DataTypes.DATEONLY, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: false },
    sizeX: { type: DataTypes.DOUBLE, allowNull: false },
    sizeY: { type: DataTypes.DOUBLE, allowNull: false },
    picture: { type: DataTypes.STRING, allowNull: false },
    location: { type: DataTypes.STRING, allowNull: false }
}, { timestamps: false })