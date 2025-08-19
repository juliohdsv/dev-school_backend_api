import { test, expect } from "vitest";
import request from "supertest";
import { faker } from "@faker-js/faker";
import { fastify } from "../app.ts";

test("Should create a course", async ()=> {

  await fastify.ready();

  const response = await request(fastify.server)
    .post("/courses")
    .set("content-type", "application/json")
    .send({ 
      title: faker.lorem.words(6), 
      description: faker.lorem.words(6),
    })
    
    expect(response.status).toEqual(201)
    expect(response.body).toEqual({
      courseId: expect.any(String),
    })
});