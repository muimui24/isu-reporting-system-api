import { FastifyInstance } from "fastify";
import {
  createMasterTableHandler,
  getMasterTableHandler,
} from "./masterTable.controller";
import { $ref } from "./masterTable.schema";

async function masterTableRoutes(server: FastifyInstance) {
  server.post(
    "/",
    {
      preHandler: [server.authenticate],
      schema: {
        body: $ref("createMasterTableSchema"),
        response: {
          201: $ref("masterTableResponseSchema"),
        },
      },
    },
    createMasterTableHandler
  );
  server.get(
    "/",
    {
      schema: {
        response: {
          200: $ref("masterTableResponseSchema"),
        },
      },
    },
    getMasterTableHandler
  );
}
export default masterTableRoutes;
