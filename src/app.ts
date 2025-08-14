import fastify from "fastify"; 
import crypto  from "node:crypto";
import { eq } from "drizzle-orm";
import { db } from "./database/client.ts";
import { courses } from "./database/schema.ts";

export const app = fastify({
   logger: {
    transport: {
      target: "pino-pretty",
      options: {
        translateTime: "HH:MM:ss",
        ignore: "pid.hostname",
      }
    }
  }
});


app.get("/courses", async (request, reply)=>{
  const result = await db.select().from(courses);
  
  return reply.status(200).send({ courses: result });
})

app.get("/courses/:id", async (request, reply)=>{
  const { id } = request.params as any;
  const result = await db
    .select({
      title: courses.title,
      description: courses.description
    })
    .from(courses)
    .where(eq(courses.id, id))

  if(!result){
    return reply.status(404).send();  
  }

  return reply.status(404).send({ result });
})

app.post("/courses", async (request, reply)=>{

  type Body = {
    title: string;
    description: string;
  }

  const { title, description } = request.body as Body;
  const id: any = crypto.randomUUID();

  if(!title){
    return reply.status(400).send();
  }

  const result = await db
    .insert(courses)
    .values({ title, description })
    .returning()

  return reply.status(201).send({ courseId: result[0].id });
})

app.delete("/courses/:id", async (request, reply)=>{

  const { id } = request.params as any;
  await db.delete(courses).where(eq(courses.id, id));

  return reply.status(200).send();
})
