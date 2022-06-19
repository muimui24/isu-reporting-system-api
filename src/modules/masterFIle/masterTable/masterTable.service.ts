import prisma from "../../../utils/prisma";
import { CreateInputValidator, UpdateInputValidator } from  "../masterTable/masterTable.schema"

export async function create(data: CreateInputValidator){    
        return await prisma.masterTable.create({data: {...data } });
    }
export async function update(data: UpdateInputValidator, id: number){    
    return await prisma.masterTable.update({
        where: {
            id:id
        },
        data: {
            title: data.title,
            modifiedBy: data.modifiedBy,
            modifiedAt: new Date(),
        }
    });
}
export async function updateStatus(id: number,modifiedBy: string, isActive: boolean){     
    const oldData = prisma.masterTable.findUnique({
        where: {
            id:id
        },
        select: {
            isActive: true,
        }
    });
    return await prisma.masterTable.update({
        where: {
            id:id
        },
        data: {
            isActive: isActive,
            modifiedBy: modifiedBy,
            modifiedAt: new Date(),
        }
    });
}
export function getAll (isActive: boolean){
    return prisma.masterTable.findMany({
        where: {
            isActive: isActive
        }
    });
}
export function get (id: number){
    return prisma.masterTable.findUnique ({
        where: {
            id: id
        }
    });
}