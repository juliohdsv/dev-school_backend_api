import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";
import { eq } from "drizzle-orm";
import { db } from "../database/client";
import { courses } from "../database/schema";

export const DeleteCoursesRoute: FastifyPluginAsyncZod = async(app)=> {
  
  app.delete("/courses/:id", {
    schema: {
      params: z.object({
        id: z.uuid(),
      }),
    },
  }, async (request, reply)=>{
    
    const { id } = request.params as any;
    await db.delete(courses).where(eq(courses.id, id));

    return reply.status(200).send();
  })
}

