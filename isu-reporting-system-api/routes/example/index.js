'use strict'

module.exports = async function (fastify, opts) {
  const { PrismaClient } = require('@prisma/client')
  const prisma = new PrismaClient()
  // use `prisma` in your application to read and write data in your DB

  fastify.get('/', async function (request, reply) {
    return 'this is an example'
  })
}
