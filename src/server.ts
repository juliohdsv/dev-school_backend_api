import fastify from "fastify"; 
import crypto from "node:crypto";

const server = fastify({
   logger: {
    transport: {
      target: "pino-pretty",
      options: {
        translateTime: "HH:MM:ss",
        ignore: "pid.hostname",
      }
    }
  }
});


const courses = [
  {id: 1, title: "Curso de Node.js"},
  {id: 2, title: "Curso de React.js"},
  {id: 3, title: "Curso de AWS"}
];

server.get("/courses", ()=>{
  return { courses };
})

server.get("/courses/:id", (request, reply)=>{
  const { id } = request.params as any;
  const course = courses.find(item => item.id == id);
  
  if(course){
    return reply.status(200).send({ course });
  }

  return reply.status(404).send();
})

server.post("/courses", (request, reply)=>{

  type Body = {
    title: string;
  }

  const { title } = request.body as Body;
  const id: any = crypto.randomUUID();

  if(!title){
    return reply.status(400).send();
  }

  courses.push({ id,title });

  return reply.status(201).send({ id, title });
})

server.delete("/courses/:id", (request, reply)=>{

  type Params = {
    id: any
  }

  const { id } = request.params as Params;
  const index = courses.findIndex(item => item.id == id);

  if(index === -1){
    return reply.status(400).send();
  }

  courses.splice(index,1);

  return reply.status(200).send();
})


server.listen({ port: 3333 }).then(()=>{
  console.log("HTTP server runing!")
})