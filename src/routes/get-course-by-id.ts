import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "../database/client.ts";
import { courses } from "../database/schema.ts";

export const getCourseByIdRoute: FastifyPluginAsyncZod = async(app) =>{
  app.get("/courses/:id", {
    schema: {
      params: z.object({
        id: z.uuid(),
      }),
    },
  }, async (request, reply)=> {

    const { id } = request.params; 
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
}

