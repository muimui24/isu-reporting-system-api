import prisma from "../../utils/prisma";
import { getInput } from "./masterTable.schema";

export async function createMasterTable(data: getInput) {
  return prisma.masterTable.create({
    data,
  });
}
export function getMasterTable() {
  return prisma.masterTable.findMany({
    select: {
      id: true,
      isActive: true,
      modifiedBy: true,
      modifiedAt: true,
      createdBy: true,
      createdAt: true,
      description: true,
      MasterTableDetail: {
        select: {
          id: true,
          isActive: true,
          modifiedBy: true,
          modifiedAt: true,
          createdBy: true,
          createdAt: true,
          header: true,
          headerId: true,
          description: true,
        },
      },
    },
  });
}
