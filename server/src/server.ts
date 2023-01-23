import Fastify from "fastify";
import cors from '@fastify/cors';
import { appRoutes } from "./routes";

const app =  Fastify();

// const allowedHosts= { origin: ['http://localhost:3000'] }
app.register(cors); // (cors, allowedHosts)
app.register(appRoutes)

app.listen({
    port: 3333,
}).then(() => {
    console.log('HTTP Server runnnig')
});