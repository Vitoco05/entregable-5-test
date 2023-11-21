const app = require('../app');
const request = require('supertest');

let id;

test("GET /genres debe retornar todos los generos.", async() => {
  const res = await request(app).get('/genres');
  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
});

test("POST /genres debe crear a un genero.", async() => {
  const genre = {
    name: "Fantasy"
  }
  const res = await request(app).post('/genres').send(genre);
  id = res.body.id
  expect(res.status).toBe(201);
  expect(res.body.id).toBeDefined();
  expect(res.body.name).toBe(genre.name);
});

test("PUT /genres/:id debe actualizar a un genero.", async() => {
  const genre = {
    name: "Fantasy 2"
  }
  const res = await request(app).put(`/genres/${id}`).send(genre);
  expect(res.status).toBe(200);
  expect(res.body.name).toBe(genre.name);
});

test("DELETE /genres/:id debe eliminar un genero.", async() => {
  const res = await request(app).delete(`/genres/${id}`);
  expect(res.status).toBe(204);
});