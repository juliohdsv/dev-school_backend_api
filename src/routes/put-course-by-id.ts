import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "../database/client.ts";
import { courses } from "../database/schema.ts";

export const putCourseByIdRoute: FastifyPluginAsyncZod = async(app) =>{
  app.put("/courses/:id", {
    schema: {
      tags: ["courses"],
      summary: "update a course",
      description: "Update a course information",
      params: z.object({
        id: z.uuid(),
      }),
      body: z.object({
        title: z.string().min(5),
        description: z.string().min(5),
      })
    },
  }, async (request, reply)=> {

    const { id } = request.params; 
    const { title, description } = request.body;
    const result = await db.update(courses)
      .set({
        title,
        description,
      })
      .where(eq(courses.id, id))
      .returning()
      
    if(!result){
      return reply.status(404).send();  
    }

    return reply.status(404).send({ course: result });
  })
}

