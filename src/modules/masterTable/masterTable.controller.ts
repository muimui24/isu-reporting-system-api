import { FastifyReply, FastifyRequest } from "fastify";
import { getInput } from "./masterTable.schema";
import { createMasterTable, getMasterTable } from "./masterTable.service";

export async function createMasterTableHandler(
  request: FastifyRequest<{
    Body: getInput;
  }>
) {
  const masterTable = await createMasterTable({
    ...request.body,
  });
  return masterTable;
}

export async function getMasterTableHandler() {
  const masterTables = await getMasterTable();

  return masterTables;
}
