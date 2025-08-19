import { fakerPT_BR as faker } from "@faker-js/faker";
import { db } from "./client.ts";
import { courses, enrollments, users } from "./schema.ts";

async function seed(){
  const userInsert = await db.insert(users).values([
    { name: faker.person.fullName(), email: faker.internet.email() },
    { name: faker.person.fullName(), email: faker.internet.email() },
    { name: faker.person.fullName(), email: faker.internet.email() },
    { name: faker.person.fullName(), email: faker.internet.email() },
    { name: faker.person.fullName(), email: faker.internet.email() },
    { name: faker.person.fullName(), email: faker.internet.email() },
    { name: faker.person.fullName(), email: faker.internet.email() }
  ]).returning()

  const coursesInsert = await db.insert(courses).values([
    { title: "Docker" },
    { title: "React.js" },
    { title: "React Native" },
    { title: "Node.js" },
    { title: "FullStack" },
    { title: "SQL Server" },
  ]).returning()

  await db.insert(enrollments).values([
    { courseId: coursesInsert[0].id, userId: userInsert[0].id },
    { courseId: coursesInsert[1].id, userId: userInsert[1].id },
    { courseId: coursesInsert[2].id, userId: userInsert[2].id },
    { courseId: coursesInsert[3].id, userId: userInsert[3].id },
    { courseId: coursesInsert[6].id, userId: userInsert[4].id },
    { courseId: coursesInsert[6].id, userId: userInsert[5].id },
  ]).returning()
}

seed();