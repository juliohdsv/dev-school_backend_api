import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";
import { db } from "../database/client.ts";
import { courses } from "../database/schema.ts";
import { ilike, asc } from "drizzle-orm";

export const getCoursesRoute: FastifyPluginAsyncZod = async(app)=> {
  app.get("/courses", {
    schema: {
      querystring: z.object({
        search: z.string().optional(),
        oderBy: z.string().optional(),
        limit: z.coerce.string().optional(),  
      }),
    }
  }, async (request, reply)=>{
    
    const { search } = request.query;
    const result = await db
      .select({
        title: courses.title,
        description: courses.description
      })
      .from(courses)
      .where(ilike(courses.title, `%${search}%`))
      .limit(10)
      .orderBy(asc(courses.title))
      
    return reply.status(200).send({ courses: result });
  })
}

