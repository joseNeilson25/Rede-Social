import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { prisma } from '../lib/prisma'

export async function usersRoutes(app: FastifyInstance) {
  app.addHook('preHandler', async (request) => {
    await request.jwtVerify()
  })

  app.get('/users', async (request) => {
    const users = await prisma.user.findMany({
      where: {
        id: request.user.sub,
      },

    })
    return users.map((user) => {
      return {
        id: user.id,
        githubId: user.githubId,
        name: user.name,
        login: user.login,
        avatarUrl: user.avatarUrl,
        bio: user.bio,
      }
    })
  })

  app.get('/users/:id', async (request, reply) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })
    const { id } = paramsSchema.parse(request.params)
    const user = await prisma.user.findUniqueOrThrow({
      where: {
        id,
      },
    })

    return user
  })

  app.put('/users/:id', async (request, reply) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })
    const { id } = paramsSchema.parse(request.params)
    const bodySchema = z.object({
        githubId: z.string(),
        name: z.string(),
        login: z.string(),
        avatarUrl: z.string(),
        bio: z.string(),
    })

    const { githubId, name, login, avatarUrl, bio } = bodySchema.parse(request.body)

    let user = await prisma.user.findUniqueOrThrow({
      where: {
        id,
      },
    })

    if (user.id !== request.user.sub) {
      return reply.status(401).send()
    }

    user = await prisma.user.update({
      where: {
        id,
      },
      data: {
        githubId,
        name,
        login,
        avatarUrl,
        bio,
      },
    })
    return user
  })

  app.patch('/users/:id', async (request, reply) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })
    const { id } = paramsSchema.parse(request.params)
    const bodySchema = z.object({
      content: z.string().optional(),
      githubId: z.string().optional(),
      name: z.string().optional(),
      login: z.string().optional(),
      avatarUrl: z.string().optional(),
      bio: z.string().optional(),
    })
   
    const { githubId, name, login, avatarUrl, bio } = bodySchema.parse(request.body)
   
    let user = await prisma.user.findUniqueOrThrow({
      where: {
        id,
      },
    })
   
    if (user.id !== request.user.sub) {
      return reply.status(401).send()
    }
   
    user = await prisma.user.update({
      where: {
        id,
      },
      data: {
        githubId,
        name,
        login,
        avatarUrl,
        bio,
      },
    })
   
    return user
   })
   
  app.delete('/users/:id', async (request, reply) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = paramsSchema.parse(request.params)

    const user = await prisma.user.findUniqueOrThrow({
      where: {
        id,
      },
    })

    if (user.id !== request.user.sub) {
      return reply.status(401).send()
    }

    await prisma.user.delete({
      where: {
        id,
      },
    })
  })
}