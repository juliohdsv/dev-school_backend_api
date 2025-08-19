import { test, expect } from 'vitest'
import request from 'supertest'
import { fastify } from '../app.ts'
import { makeUser } from '../tests/factories/make-user.ts'

test('login', async () => {
  await fastify.ready()

  const { user, passwordBeforeHash } = await makeUser()

  const response = await request(fastify.server)
    .post('/sessions')
    .set('Content-Type', 'application/json')
    .send({ 
      email: user.email,
      password: passwordBeforeHash,
    })

  expect(response.status).toEqual(200)
  expect(response.body).toEqual({
    token: expect.any(String),
  })
})