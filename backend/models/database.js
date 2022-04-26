import { Sequelize } from "sequelize"
import { CONFIG } from "../config.js"

export const db = new Sequelize(CONFIG.connectionString.dev, { logging: CONFIG.logger })