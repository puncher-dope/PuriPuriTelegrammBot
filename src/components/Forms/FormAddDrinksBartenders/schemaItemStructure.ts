import { z } from 'zod'

export const schemaItemStructure = z.object({
    nameStructure: z.string(),
    unit: z.string(),
    count: z.string()
})

export type schemaItemStructureData = z.infer<typeof schemaItemStructure>