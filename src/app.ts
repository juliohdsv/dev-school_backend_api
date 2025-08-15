import Fastify from "fastify"; 
import { fastifySwagger } from "@fastify/swagger";
import { fastifySwaggerUi } from "@fastify/swagger-ui";
import { 
  validatorCompiler, 
  serializerCompiler, 
  type ZodTypeProvider,
  jsonSchemaTransform 
} from "fastify-type-provider-zod";

export const fastify = Fastify({
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

fastify.register(fastifySwagger),{
  openapi: {
    info: {
      title: "Dev School",
      version: "1.0.0",
    }
  },
  transform: jsonSchemaTransform,
};

fastify.register(fastifySwaggerUi, {
  routePrefix: "/docs"
});

fastify.setSerializerCompiler(serializerCompiler);
fastify.setValidatorCompiler(validatorCompiler);



