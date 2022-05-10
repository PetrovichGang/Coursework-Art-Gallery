import { CONFIG } from "./config.js"

import { fastify as init} from "fastify"
import fastifyCors from "fastify-cors"
import fastifyMultipart from '@fastify/multipart'
import { randomUUID } from 'crypto'
import { promisify } from 'util'
import { pipeline } from 'stream' 
import * as fs from 'fs' 
import * as mimetypes from 'mime-types' 
import { getMimeType } from 'stream-mime-type'
const pump = promisify(pipeline)

import { db } from "./models/database.js"
import Association from "./models/associations.js"
import * as artworkRoute from "./routes/artworkRoute.js"
import * as artistRoute from "./routes/artistRoute.js"

export const fastify = init({ logger: CONFIG.logger })
fastify.register(fastifyCors, { origin: true })
fastify.register(fastifyMultipart)

Association()
db.sync({ force: false })

fastify.get("/api/artwork", (req) => artworkRoute.getArtworks(req))
fastify.get("/api/artwork/:id", (req) => artworkRoute.getArtworkById(req))
fastify.get("/api/artwork/author/:authorId", (req) => artworkRoute.getArtworkByArtistId(req))
fastify.get("/api/artwork/delete", () => artworkRoute.deleteArtworks())
fastify.get("/api/artwork/delete/:id", (req) => artworkRoute.deleteArtworkById(req))
fastify.post("/api/artwork/update/:id", (req) => artworkRoute.updateArtwork(req))
fastify.post("/api/artwork/create", (req) => artworkRoute.createArtwork(req))

fastify.get("/api/artist", (req) => artistRoute.getArtists(req))
fastify.get("/api/artist/:id", (req) => artistRoute.getArtistById(req))
fastify.get("/api/artist/delete", () => artistRoute.deleteArtists())
fastify.get("/api/artist/delete/:id", (req) => artistRoute.deleteArtistById(req))
fastify.post("/api/artist/update/:id", (req) => artistRoute.updateArtist(req))
fastify.post("/api/artist/create", (req) => artistRoute.createArtist(req))

fastify.post('/api/upload', async (req) => {
    const data = await req.file({ limits: { fileSize: 5242880 } }) // 5mb
    const { mime, stream } = await getMimeType(data.file)
    const ext = mimetypes.extension(mime)
    const uuid = randomUUID()
    await pump(stream, fs.createWriteStream(`${CONFIG.filesDir}/${uuid}.${ext}`))
    return { name: `//${CONFIG.website}/static/${uuid}.${ext}` }
})

fastify.listen(CONFIG.port, err => { if(err) throw err })