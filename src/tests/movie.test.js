const app = require('../app.js');
const request = require('supertest');
const Genre = require('../models/Genre.js');
const Actor = require('../models/Actor.js');
const Director = require('../models/Director.js');
require('../models')

let id;

test("GET /movies debe retornar todas las peliculas", async() => {
  const res = await request(app).get('/movies');
  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
});

test("POST /movies debe crear una pelicula.", async() => {
  const movie = {
    name: "Scary Movie",
    image: "https://scary-movie.jpg",
    synopsis: "synopsis de la pelicula",
    releaseYear: 2002
  }
  const res = await request(app).post('/movies').send(movie);
  id = res.body.id
  expect(res.status).toBe(201);
  expect(res.body.id).toBeDefined();
  expect(res.body.name).toBe(movie.name);
});

test("POST /movies/:id/genres debe setear los generos de la pelicula", async() => {
  const genre = await Genre.create({ name: "Action"});

  const res = await request(app).post(`/movies/${id}/genres`).send([genre.id]);
  await genre.destroy();
  expect(res.status).toBe(200)
  expect(res.body.length).toBe(1);
});

test("POST /movies/:id/actors debe setear los actores de la pelicula", async() => {
  const actor = await Actor.create({
    firstName: "Tom",
    lastName: "Holland",
    nationality: "British",
    image: "https://tom-holland.jpg",
    birthday: "1997/10/25"  
  });

  const res = await request(app).post(`/movies/${id}/actors`).send([actor.id]);
  await actor.destroy();
  expect(res.status).toBe(200)
  expect(res.body.length).toBe(1);
});

test("POST /movies/:id/directors debe setear los directores de la pelicula", async() => {
  const director = await Director.create({
    firstName: "Quentin",
    lastName: "Tarantino",
    nationality: "American",
    image: "https://quentin-tarantino.jpg",
    birthday: "1972/10/25"  
  });

  const res = await request(app).post(`/movies/${id}/directors`).send([director.id]);
  await director.destroy();
  expect(res.status).toBe(200)
  expect(res.body.length).toBe(1);
});

test("PUT /movies/:id debe actualizar una pelicula", async() => {
  const movie = {
    name: "Scary Movie 2"
  }
  const res = await request(app).put(`/movies/${id}`).send(movie);
  expect(res.status).toBe(200);
  expect(res.body.name).toBe(movie.name);
});


test("DELETE /movies/:id debe eliminar una pelicula.", async() => {
  const res = await request(app).delete(`/movies/${id}`)
  expect(res.status).toBe(204);
})

