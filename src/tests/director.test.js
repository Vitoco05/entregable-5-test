const app = require('../app.js');
const request = require('supertest');

let id;

test("GET /directors debe retornar todos los directores", async() => {
  const res = await request(app).get('/directors');
  expect(res.status).toBe(200);
});

test("POST /directors debe crear a un director.", async() => {
  const director = {
    firstName: "Juan",
    lastName: "Rondon",
    nationality: "American",
    image: "https://juan-rondon.jpg",
    birthday: "1997/01/05"
  }
  const res = await request(app).post('/directors').send(director);
  id = res.body.id 
  expect(res.status).toBe(201);
  expect(res.body.id).toBeDefined();
  expect(res.body.name).toBe(director.name);
});

test("PUT /directors/:id debe actualizar a un director.", async() => {
  const director = {
    firstName: "Juan 2"
  }
  const res = await request(app).put(`/directors/${id}`).send(director);
  expect(res.status).toBe(200);
  expect(res.body.firstName).toBe(director.firstName);
});

test("DELETE /directors/:id debe eliminar a un director.", async() => {
  const res = await request(app).delete(`/directors/${id}`);
  expect(res.status).toBe(204);
});