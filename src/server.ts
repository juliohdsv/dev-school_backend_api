import { app as server} from "./app.ts"
import { env } from "./config/env.ts"

server.listen({ port: env.NODE_PORT }).then(()=>{
  console.log(`HTTP server runing on ${env.NODE_ENV} mode`)
})