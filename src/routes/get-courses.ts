import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";
import { db } from "../database/client";
import { courses } from "../database/schema";


export const GetCoursesRoute: FastifyPluginAsyncZod = async(app)=> {
  app.get("/courses", {
    schema: {
      querystring: z.object({
        search: z.string(),
        orderBy: z.string(),
        page: z.coerce.number(),
      }),
    },
  }, async (request, reply)=>{
    
    const { search, orderBy, page } = request.query;
    const result = await db.select().from(courses);
  
  return reply.status(200).send({ courses: result });
})
}

