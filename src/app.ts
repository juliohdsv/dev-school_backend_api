import Fastify from "fastify"; 
import { fastifySwagger } from "@fastify/swagger";
import scalarAPIReference from "@scalar/fastify-api-reference";
import { 
  validatorCompiler, 
  serializerCompiler, 
  type ZodTypeProvider,
  jsonSchemaTransform 
} from "fastify-type-provider-zod";
import { createCourseRoute } from "./routes/create-course.ts";
import { getCourseByIdRoute } from "./routes/get-course-by-id.ts";
import { getCoursesRoute } from "./routes/get-courses.ts";
import { deleteCourseByIdRoute } from "./routes/delete-course-by-id.ts";
import { putCourseByIdRoute } from "./routes/put-course-by-id.ts";
import { env } from "./config/env.ts";

const fastify = Fastify({
  logger: {
    transport: {
      target: "pino-pretty",
      options: {
        translateTime: "HH:MM:ss",
        ignore: "pid.hostname",
      }
    }
  }
}).withTypeProvider<ZodTypeProvider>();

if(env.NODE_ENV === "development"){
    
  fastify.register(fastifySwagger,{
    openapi: {
      info: {
        title: "Dev School",
        version: "1.0.0",
      }
    },
    transform: jsonSchemaTransform,
  });
  
  fastify.register(scalarAPIReference, {
    routePrefix: "/docs",
    configuration: {
      theme: "kepler",
    }
  });
};

fastify.setValidatorCompiler(validatorCompiler);
fastify.setSerializerCompiler(serializerCompiler);

fastify.register(getCourseByIdRoute);
fastify.register(getCoursesRoute);
fastify.register(createCourseRoute);
fastify.register(deleteCourseByIdRoute);
fastify.register(putCourseByIdRoute);

export { fastify }