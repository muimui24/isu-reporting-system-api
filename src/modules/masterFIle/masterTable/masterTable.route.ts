import { FastifyInstance } from "fastify";
import {
    createMasterTableHandler,
    updateMasterTableHandler,
    getMasterTableHandler,
    getAllMasterTableHandler,
    updateStatusMasterTableHandler
} from "./masterTable.controller";
import { $ref } from "./masterTable.schema";

async function masterTableRoutes(server: FastifyInstance) {
    server.post(
        "/",
        {
            // preHandler: [server.authenticate],
            schema: {
                tags: ["Master Table"],
                body: $ref("createInputSchema"),
                response: {
                    200: $ref("responseSchema"),
                },
            },
        },
        createMasterTableHandler
    );

    server.get(
        "/",
        {
            // preHandler: [server.authenticate],
            schema: {
                tags: ["Master Table"],
                querystring: { isActive: { type: "boolean" } },
                response: {
                    200: $ref("responsesSchema"),
                },
            },
        },
        getAllMasterTableHandler
    );
    server.get(
        "/:id",
        {
            // preHandler: [server.authenticate],
            schema: {
                tags: ["Master Table"],
                params: { id: { type: "number" } },
                response: {
                    200: $ref("responseSchema"),
                },
            },
        },
        getMasterTableHandler
    );
    server.put(
        "/:id",
        {
            // preHandler: [server.authenticate],
            schema: {
                tags: ["Master Table"],
                params: { id: { type: "number" } },
                body: $ref("updateSchema"),
                response: {
                    200: $ref("responseSchema"),
                },
            },
        },
        updateMasterTableHandler
    );
    server.put(
        "/:id/status",
        {
            // preHandler: [server.authenticate],
            schema: {
                tags: ["Master Table"],
                params: { id: { type: "number" } },
                querystring: { isActive: {type: "boolean"}, modifiedBy: {type: "string"}},
                response: {
                    200: $ref("responseSchema"),
                },
            },
        },
        updateStatusMasterTableHandler
    );
}
export default masterTableRoutes;