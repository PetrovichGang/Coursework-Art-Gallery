import { CONFIG } from "./config.js"

import { fastify as init} from "fastify"
import fastifyCors from "fastify-cors"

import { db } from "./models/database.js"
import Association from "./models/associations.js"
import * as artworkRoute from "./routes/artworkRoute.js"
import * as artistRoute from "./routes/artistRoute.js"

export const fastify = init({ logger: CONFIG.logger })
fastify.register(fastifyCors, { origin: true })

Association()
db.sync({ force: false })

fastify.get("/artwork", (req) => artworkRoute.getArtworks(req))
fastify.get("/artwork/:id", (req) => artworkRoute.getArtworkById(req))
fastify.get("/artwork/author/:authorId", (req) => artworkRoute.getArtworkByArtistId(req))
fastify.get("/artwork/delete", () => artworkRoute.deleteArtworks())
fastify.get("/artwork/delete/:id", (req) => artworkRoute.deleteArtworkById(req))
fastify.post("/artwork/update/:id", (req) => artworkRoute.updateArtwork(req))
fastify.post("/artwork/create", (req) => artworkRoute.createArtwork(req))

fastify.get("/artist", (req) => artistRoute.getArtists(req))
fastify.get("/artist/:id", (req) => artistRoute.getArtistById(req))
fastify.get("/artist/delete", () => artistRoute.deleteArtists())
fastify.get("/artist/delete/:id", (req) => artistRoute.deleteArtistById(req))
fastify.post("/artist/update/:id", (req) => artistRoute.updateArtist(req))
fastify.post("/artist/create", (req) => artistRoute.createArtist(req))

fastify.listen(CONFIG.port, err => { if(err) throw err })