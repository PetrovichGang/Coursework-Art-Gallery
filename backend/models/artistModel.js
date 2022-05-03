import { DataTypes } from "sequelize"
import { db } from "./database.js"

const Artist = db.define('artist', {
    id: { type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
    first_name: { type: DataTypes.STRING, allowNull: false, },
    second_name: { type: DataTypes.STRING, allowNull: false },
    last_name: { type: DataTypes.STRING, allowNull: false },
    birth_date: { type: DataTypes.DATEONLY, allowNull: false },
    death_date: { type: DataTypes.DATEONLY, allowNull: true },
    image: { type: DataTypes.STRING(500), allowNull: true },
    country: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING(1000), allowNull: true },
}, { timestamps: false })

export default Artist