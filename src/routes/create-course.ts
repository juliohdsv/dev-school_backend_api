import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";
import { db } from "../database/client.ts";
import { courses } from "../database/schema.ts";

export const createCourseRoute: FastifyPluginAsyncZod = async(app) =>{

  app.post("/courses", {
    schema: {
      body: z.object({
        title: z.string().min(5,"Title required minimun of 5 cahracters"),
        description: z.string().min(5, "Description required minimun of 5 cahracters"),
      }),
    }
  }, async (request, reply)=>{
  
    const { title, description } = request.body;
    const result = await db
      .insert(courses)
      .values({ title, description })
      .returning()
  
    return reply.status(201).send({ courseId: result[0].id });
  })
  
}

