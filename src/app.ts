import Fastify, { FastifyRequest, FastifyReply } from "fastify";
import fjwt from "fastify-jwt";
import swagger from "fastify-swagger";
import { withRefResolver } from "fastify-zod";
import userRoutes from "./modules/user/user.route";
import productRoutes from "./modules/product/product.route";
import masterTableRoutes from "./modules/masterFIle/masterTable/masterTable.route";
import { userSchemas } from "./modules/user/user.schema";
import { productSchemas } from "./modules/product/product.schema";
import { masterTableSchemas } from "./modules/masterFIle/masterTable/masterTable.schema";
import { version } from "../package.json";
export const server = Fastify();

declare module "fastify" {
  export interface FastifyInstance {
    authenticate: any;
  }
}

declare module "fastify-jwt" {
  interface FastifyJWT {
    user: {
      id: number;
      email: string;
      name: string;
    };
  }
}

server.register(fjwt, {
  secret: "ndkandnan78duy9sau87dbndsa89u7dsy789adb",
});

server.decorate(
  "authenticate",
  async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      await request.jwtVerify();
    } catch (e) {
      return reply.send(e);
    }
  }
);

server.get("/healthcheck", async function () {
  return { status: "OK" };
});

async function main() {
  for (const schema of [...userSchemas, ...productSchemas, ...masterTableSchemas]) {
    server.addSchema(schema);
  }

  server.register(
    swagger,
    withRefResolver({
      routePrefix: "/docs",
      exposeRoute: true,
      staticCSP: true,
      openapi: {
        info: {
          title: "Fastify API",
          description: "API for some products",
          version,
        },
      },
    })
  );

  server.register(userRoutes, { prefix: "api/users" });
  server.register(productRoutes, { prefix: "api/products" });
  server.register(masterTableRoutes, {prefix: "api/masterTables" });
  try {
    await server.listen(3000, "0.0.0.0");

    console.log(`Server ready at http://localhost:3000`);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

main();
