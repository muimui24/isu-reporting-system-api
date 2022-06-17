import prisma from "../../../utils/prisma";
import { CreateInput } from  "../masterTable/masterTable.schema"

export async function create(
    data: CreateInput & {title: string, createdAt: string}    
    ){
        return prisma.masterTable.create({data})
    }