import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";
import { eq } from "drizzle-orm";
import { db } from "../database/client.ts";
import { courses } from "../database/schema.ts";

export const deleteCourseByIdRoute: FastifyPluginAsyncZod = async(app)=> {
  
  app.delete("/courses/:id", {
    schema: {
      tags: ["courses"],
      summary: "Delete a course",
      description: "Receive a id and delete the course in the database",
      params: z.object({
        id: z.uuid(),
      }),
    },
  }, async (request, reply)=>{
    
    const { id } = request.params as any;
    await db
      .delete(courses)
      .where(eq(courses.id, id))

    return reply.status(200).send({ message: "Course deleted successfully" });
  })
}

