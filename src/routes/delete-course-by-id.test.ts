import { faker } from "@faker-js/faker";
import { test, expect } from "vitest";
import request from "supertest";
import { fastify } from "../app";

test("Should delete a course", async ()=> {

  await fastify.ready();

  const createRes = await request(fastify.server)
    .post("/courses")
    .set("content-type", "application/json")
    .send({ 
      title: faker.lorem.words(6), 
      description: faker.lorem.words(6),
    })
    
    expect(createRes.status).toEqual(201)
    expect(createRes.body).toEqual({
      courseId: expect.any(String),
    })

  const { courseId  } = createRes.body;
  const deleteRes = await request(fastify.server)
    .delete(`/courses/${courseId}`);

   expect(deleteRes.status).toEqual(200);
   expect(deleteRes.body).toEqual({ 
    message: expect.any(String),
  });
})