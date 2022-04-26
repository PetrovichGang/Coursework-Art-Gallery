import { DataTypes } from "sequelize"
import { db } from "./database.js"

const Artist = db.define('Artist', {
    id: { type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
    first_name: { type: DataTypes.STRING, allowNull: false, },
    second_name: { type: DataTypes.STRING, allowNull: false },
    last_name: { type: DataTypes.STRING, allowNull: false },
    birth_date: { type: DataTypes.DATEONLY, allowNull: false },
    death_date: { type: DataTypes.DATEONLY, allowNull: true },
    image: { type: DataTypes.STRING, allowNull: true },
    country: { type: DataTypes.STRING, allowNull: false }
}, { timestamps: false })

export default Artist