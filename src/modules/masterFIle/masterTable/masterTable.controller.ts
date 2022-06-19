import prisma from "../../../utils/prisma";
import { FastifyReply, FastifyRequest } from "fastify";
import { CreateInputValidator, UpdateInputValidator } from "../masterTable/masterTable.schema";
import { create, update, updateStatus, getAll, get } from "../masterTable/masterTable.service";

export async function createMasterTableHandler(
    request: FastifyRequest<{ Body: CreateInputValidator; }>,
    reply: FastifyReply
) {
    const masterTable = await create({
        ...request.body,
    });
    return reply.code(200).send(masterTable);;
}
export async function updateMasterTableHandler(
    request: FastifyRequest<{ Body: UpdateInputValidator, Params: { id: number } }>,
    reply: FastifyReply
) {
    const checkData = await get(request.params.id);
    if (checkData === null) {
        return reply.code(404);
    }
    const masterTable = await update(request.body, request.params.id);
    return reply.code(200).send(masterTable);
}
export async function updateStatusMasterTableHandler(
    request: FastifyRequest<{ Params: { id: number }, Querystring: { isActive: boolean, modifiedBy: string } }>,
    reply: FastifyReply
) {
    const checkData = await get(request.params.id);
    if (checkData === null) {
        return reply.code(404);
    }
    const masterTable = await updateStatus(
        request.params.id, request.query.modifiedBy, request.query.isActive
    );
    return reply.code(200).send(masterTable);
}
export async function getAllMasterTableHandler(
    request: FastifyRequest<{ Querystring: { isActive: boolean } }>,
    reply: FastifyReply
) {
    const masterTable = await getAll(request.query.isActive);
    console.log(masterTable);
    return reply.code(200).send(masterTable);
}
export async function getMasterTableHandler(
    request: FastifyRequest<{ Params: { id: number } }>,
    reply: FastifyReply
) {
    const masterTable = await get(request.params.id);
    return reply.code(200).send(masterTable);
}

