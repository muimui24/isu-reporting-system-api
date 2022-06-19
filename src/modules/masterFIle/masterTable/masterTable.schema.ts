import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";

const createInputSchema = z.object({
    title: z.string(),
    createdBy: z.string(),
});

const responseSchema = z.object({
    id: z.number(),
    modifiedAt: z.date(),
    modifiedBy: z.string(),
    isActive: z.boolean(),
    createdBy: z.string(),
    createdAt: z.date(),
    title: z.string(),
});

const updateSchema = z.object({
    id: z.number(),
    title: z.string(),
    modifiedBy: z.string(),
});

const responsesSchema = z.array(responseSchema);

export type CreateInputValidator = z.infer<typeof createInputSchema>;
export type UpdateInputValidator = z.infer<typeof updateSchema>;

export const { schemas: masterTableSchemas, $ref } = buildJsonSchemas({
    createInputSchema,
    responseSchema,
    responsesSchema,
    updateSchema
});