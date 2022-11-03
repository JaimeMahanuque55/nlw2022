import Fastify from 'fastify';
import cors from '@fastify/cors';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  log: ['query'],
})

async function bootstrao() {

  const fastify = Fastify({
    logger: true,
  })

  await fastify.register(cors, {
    // origin: 'www.jaime.co.mz' // Only this site can access the backend
    origin: true, // every application can access the backend

  })

  fastify.get('/pools/count', async () => {
    // const pools = await prisma.pool.findMany({
    //   where: {
    //     code: {
    //       startsWith: 'J'
    //     }
    //   }
    // })
    const count = await prisma.pool.count()

    return { count }
  })

  await fastify.listen({ port: 3333, host: '0.0.0.0' })
}

bootstrao();