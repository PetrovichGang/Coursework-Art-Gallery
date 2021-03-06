import chai, { assert } from "chai"
import chaiHttp from "chai-http"
import { fastify as app } from "../main.js"
import { artist, artwork } from "./models.js"

chai.use(chaiHttp)

let artistId

describe("Artist tests", () => {

    it("It's should clear artist table", (done) => {
      chai.request(app.server).get("/api/artist/delete").end((err, res1) => {
        assert.equal(res1.status, 200)
        chai.request(app.server).get("/api/artist").end((err, res2) => {
          assert.equal(res2.status, 200)
          assert.isArray(res2.body)
          assert.equal(res2.body.length, 0)
          done()
        })
      })
    })

    it("It's should add artist to database", (done) => {
      chai.request(app.server).post("/api/artist/create").send(artist).end((err, res) => {
        assert.equal(res.status, 200)
        artistId = res.body.id
        chai.request(app.server).get("/api/artist/" + artistId).end((err, res) => {
          assert.property(res.body[0], "id")
          assert.property(res.body[0], "first_name")
          assert.property(res.body[0], "second_name")
          assert.property(res.body[0], "birth_date")
          assert.property(res.body[0], "death_date")
          assert.property(res.body[0], "image")
          assert.property(res.body[0], "country")
          done()
        })
      })
    })

    it("It's should get all artists from database", (done) => {
      chai.request(app.server).get("/api/artist").end((err, res) => {
        assert.equal(res.status, 200)
        assert.isArray(res.body)
        assert.property(res.body[0], "id")
        assert.property(res.body[0], "first_name")
        assert.property(res.body[0], "second_name")
        assert.property(res.body[0], "birth_date")
        assert.property(res.body[0], "death_date")
        assert.property(res.body[0], "image")
        assert.property(res.body[0], "country")
        done()
      })
    })

    it("It's should get artist by id from database", (done) => {
        chai.request(app.server).get("/api/artist/" + artistId).end((err, res) => {
          assert.equal(res.status, 200)
          assert.isArray(res.body)
          assert.property(res.body[0], "id")
          assert.property(res.body[0], "first_name")
          assert.property(res.body[0], "second_name")
          assert.property(res.body[0], "birth_date")
          assert.property(res.body[0], "death_date")
          assert.property(res.body[0], "image")
          assert.property(res.body[0], "country")
          done()
        })
      })

    it("It's should update artist from database", (done) => {
        chai.request(app.server).post("/api/artist/update/" + artistId).send({ death_date: "2099-12-31" }).end((err, res) => {
          assert.equal(res.status, 200)
          done()
        })
      })

    it("It's should delete artist by id from database", (done) => {
        chai.request(app.server).get("/api/artist/delete/" + artistId).end((err, res) => {
          assert.equal(res.status, 200)
          chai.request(app.server).get("/api/artist/" + artistId).end((err, res) => {
            assert.equal(res.status, 200)
            assert.isArray(res.body)
            done()
          })
        })
      })
  
  })