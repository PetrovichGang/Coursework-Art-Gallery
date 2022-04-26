import chai, { assert } from "chai"
import chaiHttp from "chai-http"
import { fastify as app } from "../main.js"

chai.use(chaiHttp)

describe("/GET student", () => {

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
  
    let artwork = {
        name: "Test-Artwork-Name",
        authorId: 1
    }
  
    it("It's should create student", (done) => {
      chai.request(app.server).post("/student/create").send(student).end((err, res) => {
        assert.equal(res.status, 200)
        assert.property(res.body, "im")
        assert.property(res.body, "fam")
        assert.property(res.body, "gr")
        assert.property(res.body, "rost")
        assert.property(res.body, "denR")
        assert.property(res.body, "sr_ball")
        assert.property(res.body, "stipendy")
        done()
      })
    })
  
    it("It's should update student", (done) => {
      chai.request(app.server).get("/student").end((err, res) => {
        assert.equal(res.status, 200)
        assert.isArray(res.body)
        let currentStudent = res.body[0]
        currentStudent.fam = "Rewritted-Test-SecondName"
        assert.property(currentStudent, "id")
        assert.property(currentStudent, "im")
        assert.property(currentStudent, "fam")
        assert.property(currentStudent, "gr")
        assert.property(currentStudent, "rost")
        assert.property(currentStudent, "denR")
        assert.property(currentStudent, "sr_ball")
        assert.property(currentStudent, "stipendy")
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