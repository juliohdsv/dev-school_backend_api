import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";
import { eq } from "drizzle-orm";
import { db } from "../database/client.ts";
import { courses } from "../database/schema.ts";
import { error } from "console";

export const putCourseByIdRoute: FastifyPluginAsyncZod = async(app) =>{
  app.put("/courses/:id", {
    schema: {
      tags: ["courses"],
      summary: "Update a course",
      description: "Update a course information",
      params: z.object({
        id: z.uuid(),
      }),
      body: z.object({
        title: z.string().min(5),
        description: z.string().min(5),
      }),
      response: {
        200: z.object({ 
          course: z.object({
            title: z.string(),
            description: z.string().nullable(), 
          }),
        }),
        404:  z.null(),
      }
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
      
    if(!result || result.length === 0){
      return reply.status(404).send(null);  
    }

    const { title: updatedTitle, description: updatedDescription } = result[0];

    return reply.status(200).send({   
      course: {
        title: updatedTitle, 
        description: updatedDescription 
      }   
    });
  })
}

