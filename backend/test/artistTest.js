import chai, { assert } from "chai"
import chaiHttp from "chai-http"
import { fastify as app } from "../main.js"
import { artist, artwork } from "./boolshit.js"

chai.use(chaiHttp)
let artist_id
describe("Artist tests", () => {

    it("It's should clear artist table", (done) => {
      chai.request(app.server).get("/artist/delete").end((err, res1) => {
        assert.equal(res1.status, 200)
        chai.request(app.server).get("/artist").end((err, res2) => {
          assert.equal(res2.status, 200)
          assert.isArray(res2.body)
          assert.equal(res2.body.length, 0)
          done()
        })
      })
    })

    it("It's should add artist to database", (done) => {
        chai.request(app.server).post("/artist/create").send(artist).end((err, res) => {
          assert.equal(res.status, 200)
          assert.isArray(res.body)
          assert.property(res.body[0], "id")
          assert.property(res.body[0], "first_name")
          assert.property(res.body[0], "second_name")
          assert.property(res.body[0], "birth_date")
          assert.property(res.body[0], "death_date")
          assert.property(res.body[0], "image")
          assert.property(res.body[0], "country")
          artist_id = res.body.id
          done()
        })
      })

    it("It's should get all artists from database", (done) => {
      chai.request(app.server).get("/artist").end((err, res) => {
        assert.equal(res.status, 200)
        assert.isArray(res.body)
        done()
      })
    })

    it("It's should get artist by id from database", (done) => {
        chai.request(app.server).get("/artist/" + artist_id).end((err, res) => {
          assert.equal(res.status, 200)
          assert.isArray(res.body)
          done()
        })
      })

    it("It's should update artist from database", (done) => {
        chai.request(app.server).post("/artist/update/" + artist_id).send({death_date: "2099-12-31"}).end((err, res) => {
          assert.equal(res.status, 200)
          done()
        })
      })

    it("It's should delete artist by id from database", (done) => {
        chai.request(app.server).get("/artist/delete/" + artist_id).end((err, res) => {
          assert.equal(res.status, 200)
          chai.request(app.server).get("/artist/" + artist_id).end((err, res) => {
            assert.equal(res.status, 200)
            assert.isArray(res.body)
            done()
          })
        })
      })
  
  })