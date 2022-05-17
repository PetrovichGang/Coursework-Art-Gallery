import chai, { assert } from "chai"
import chaiHttp from "chai-http"
import { fastify as app } from "../main.js"
import { artwork, artist } from "./models.js"

chai.use(chaiHttp)

let artworkId

describe("Artwork tests", () => {
    it("It's should create artist for testing artworks", (done) => {
      chai.request(app.server).post("/api/artist/create").send(artist).end((err, res) => {
        assert.equal(res.status, 200)
        artwork.authorId = res.body.id
        done()
      })
    })

    it("It's should clear artwork table", (done) => {
      chai.request(app.server).get("/api/artwork/delete").end((err, res1) => {
        assert.equal(res1.status, 200)
        chai.request(app.server).get("/api/artwork").end((err, res2) => {
          assert.equal(res2.status, 200)
          assert.isArray(res2.body)
          assert.equal(res2.body.length, 0)
          done()
        })
      })
    })

    it("It's should add artwork to database", (done) => {
      chai.request(app.server).post("/api/artwork/create").send(artwork).end((err, res) => {
        assert.equal(res.status, 200)
        artworkId = res.body.id
        chai.request(app.server).get("/api/artwork/" + artworkId).end((err, res) => {
          assert.property(res.body[0], "name")
          assert.property(res.body[0], "authorId")
          assert.property(res.body[0], "created_date")
          assert.property(res.body[0], "description")
          assert.property(res.body[0], "sizeX")
          assert.property(res.body[0], "sizeY")
          assert.property(res.body[0], "image")
          assert.property(res.body[0], "location")
          done()
        })
      })
    })

    it("It's should get all artworks from database", (done) => {
      chai.request(app.server).get("/api/artwork").end((err, res) => {
        assert.equal(res.status, 200)
        assert.isArray(res.body)
        assert.property(res.body[0], "name")
        assert.property(res.body[0], "authorId")
        assert.property(res.body[0], "created_date")
        assert.property(res.body[0], "description")
        assert.property(res.body[0], "sizeX")
        assert.property(res.body[0], "sizeY")
        assert.property(res.body[0], "image")
        assert.property(res.body[0], "location")
        done()
      })
    })

    it("It's should get artwork by id from database", (done) => {
        chai.request(app.server).get("/api/artwork/" + artworkId).end((err, res) => {
          assert.equal(res.status, 200)
          assert.isArray(res.body)
          assert.property(res.body[0], "name")
          assert.property(res.body[0], "authorId")
          assert.property(res.body[0], "created_date")
          assert.property(res.body[0], "description")
          assert.property(res.body[0], "sizeX")
          assert.property(res.body[0], "sizeY")
          assert.property(res.body[0], "image")
          assert.property(res.body[0], "location")
          done()
        })
      })

    it("It's should update artwork from database", (done) => {
        chai.request(app.server).post("/api/artwork/update/" + artworkId).send({ sizeX: 256, sizeY: 256 }).end((err, res) => {
          assert.equal(res.status, 200)
          done()
        })
      })

    it("It's should delete artwork by id from database", (done) => {
        chai.request(app.server).get("/api/artwork/delete/" + artworkId).end((err, res) => {
          assert.equal(res.status, 200)
          chai.request(app.server).get("/api/artwork/" + artworkId).end((err, res) => {
            assert.equal(res.status, 200)
            assert.isArray(res.body)
            done()
          })
        })
      })
  
  })