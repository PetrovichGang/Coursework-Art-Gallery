import { CONFIG } from "./config.js"

import { fastify as init} from "fastify"
import fastifyCors from "fastify-cors"

import { db } from "./models/db"
import * as artworkRoute from "./routes/artwork"

export const fastify = init({ logger: CONFIG.logger })
fastify.register(fastifyCors, { origin: true })

db.sync()

fastify.get("/artwork", (req) => artworkRoute.getArtworks(req))
fastify.get("/artwork/:id", (req) => artworkRoute.getArtworkById(req))
fastify.get("/artwork/delete", (req) => artworkRoute.deleteArtworks())
fastify.get("/artwork/delete/:id", (req) => artworkRoute.deleteArtworkById(req))
fastify.post("/artwork/update/:id", (req) => artworkRoute.updateArtwork(req))
fastify.post("/artwork/create", (req) => artworkRoute.createArtwork(req))

fastify.listen(CONFIG.port, err => { if(err) throw err })