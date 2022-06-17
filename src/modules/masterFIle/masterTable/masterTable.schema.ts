import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";

const input = {
title : z.string(),
createdAt : z.string(),
};

const generated = {
id : z.number(),
modifiedAt : z.string().optional(),
isActive : z.boolean(),
createdBy : z.string(),
modifiedBy : z.string().optional(),
};

const createSchema = z.object({
...input,
});

const responseSchema = z.object({
    ...input,
    ...generated,
});

const responsesSchema = z.array(responseSchema);

export type CreateInput = z.infer<typeof createSchema>;

export const {schemas: masterTableSchemas, $ref} = buildJsonSchemas({
createSchema,
responseSchema,
responsesSchema
});