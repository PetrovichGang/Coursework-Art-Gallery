import chai, { assert } from "chai"
import chaiHttp from "chai-http"
import { fastify as app } from "../main.js"

chai.use(chaiHttp)

describe("/GET artworks", () => {

    it("It's should clear artworks table", (done) => {
      chai.request(app.server).get("/artwork/delete").end((err, res1) => {
        assert.equal(res1.status, 200)
        chai.request(app.server).get("/artwork").end((err, res2) => {
          assert.equal(res2.status, 200)
          assert.isArray(res2.body)
          assert.equal(res2.body.length, 0)
          done()
        })
      })
    })
  
    it("It's should get artworks from database", (done) => {
      chai.request(app.server).get("/artwork").end((err, res) => {
        assert.equal(res.status, 200)
        assert.isArray(res.body)
        done()
      })
    })
  
  })
  
  describe("/POST artwork", () => {
    let artist = {
      first_name: "Stoldman",
      second_name: "Gref",
      birth_date: "2090-12-21",
      image: "jeffrey-katzenberg-has-a-howard-schultz-problem-and-heres-why-that-matters-to-you.jpg",
      country: "otch fam im sr_ball and валуес"
    }
    
    let artwork = {
      name: "Castle of the mocha",
      authorId: 1,
      created_date: "2090-01-01",
      description: "power full rock music in picture",
      sizeX: 100.444,
      sizeY: 37.3423,
      image: "somebody_once_told_me_the_world_is_gonna_roll_me.jpg",
      location: "All stars"
    }
    
    it("It's should create artworks", (done) => {
      chai.request(app.server).post("/student/create").send(artwork).end((err, res) => {
        assert.equal(res.status, 200)
        assert.property(res.body, "name")
        assert.property(res.body, "authorId")
        assert.property(res.body, "created_date")
        assert.property(res.body, "description")
        assert.property(res.body, "sizeX")
        assert.property(res.body, "sizeY")
        assert.property(res.body, "image")
        assert.property(res.body, "location")
        done()
      })
    })
  
    it("It's should update student", (done) => {
      chai.request(app.server).get("/student").end((err, res) => {
        assert.equal(res.status, 200)
        assert.isArray(res.body)
        let currentStudent = res.body[0]
        currentStudent.fam = "Rewritted-Test-SecondName"
        assert.property(currentStudent, "name")
        assert.property(currentStudent, "authorId")
        assert.property(currentStudent, "created_date")
        assert.property(currentStudent, "description")
        assert.property(currentStudent, "sizeX")
        assert.property(currentStudent, "sizeY")
        assert.property(currentStudent, "image")
        assert.property(currentStudent, "location")
        chai.request(app.server).post("/student/update/" + currentStudent.id).send(currentStudent).end((err, res) => {
          assert.equal(res.status, 200)
          chai.request(app.server).get("/student/" + currentStudent.id).end((err, res) => {
            assert.equal(res.status, 200)
            assert.property(currentStudent, "id")
            assert.property(currentStudent, "im")
            assert.property(currentStudent, "fam")
            assert.property(currentStudent, "gr")
            assert.property(currentStudent, "rost")
            assert.property(currentStudent, "denR")
            assert.property(currentStudent, "sr_ball")
            assert.property(currentStudent, "stipendy")
            assert.notEqual(res.body[0], currentStudent)
            done()
          })
        })
      })
      
    })
  
  })