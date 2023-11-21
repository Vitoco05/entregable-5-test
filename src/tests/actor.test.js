const app = require('../app.js');
const request = require('supertest');

let id;

test("GET /actors debe retornar a todos los actores.", async() => {
  const res = await request(app).get('/actors');
  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
});

test("POST /actors debe crear un actor.", async() => {
  const actor = {
    firstName: "Tom",
    lastName: "Cruise",
    nationality: "American",
    image: "https://tom-cruise.jpg",
    birthday: "2002/01/05"
  }
  const res = await request(app).post('/actors').send(actor);
  id = res.body.id
  expect(res.status).toBe(201);
  expect(res.body.id).toBeDefined();
  expect(res.body.name).toBe(actor.name);
});

test("PUT /actors/:id debe actualizar a un actor.", async() => {
  const actor = {
    firstName: "Tom 2"
  }
  const res = await request(app).put(`/actors/${id}`).send(actor);
  expect(res.status).toBe(200);
  expect(res.body.name).toBe(actor.name);
});

test("DELETE /actors/:id debe eliminar a un actor.", async() => {
  const res = await request(app).delete(`/actors/${id}`)
  expect(res.status).toBe(204);
})
