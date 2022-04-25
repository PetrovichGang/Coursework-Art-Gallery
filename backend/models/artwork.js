import { DataTypes } from "sequelize"
import { db } from "./db"

export const Artwork = db.define('Artwork', {
    id: { type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false, },
    author: { type: DataTypes.INTEGER, allowNull: false },
    created_date: { type: DataTypes.DATEONLY, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: false },
    sizeX: { type: DataTypes.DOUBLE, allowNull: false },
    sizeY: { type: DataTypes.DOUBLE, allowNull: false }
}, { timestamps: false })