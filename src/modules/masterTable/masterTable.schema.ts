import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";

const masterTableInput = {
  description: z.string(),
};

const createMasterTableSchema = z.object({
  ...masterTableInput,
});

const masterTableGenerated = {
  id: z.number(),
  createdBy: z.string(),
  createdAt: z.date(),
  modifiedBy: z.string(),
  modifiedAt: z.date(),
  isActive: z.boolean(),
  description: z.string(),
};

const masterTableResponseSchema = z.object({
  ...masterTableInput,
  ...masterTableGenerated,
});

const masterTablesResponseSchema = z.array(masterTableResponseSchema);

export type getInput = z.infer<typeof createMasterTableSchema>;

export const { schemas: masterTableSchemas, $ref } = buildJsonSchemas({
  createMasterTableSchema,
  masterTableResponseSchema,
  masterTablesResponseSchema,
});
