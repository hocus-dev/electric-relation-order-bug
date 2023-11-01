import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { TableSchema, DbSchema, Relation, ElectricClient, HKT } from 'electric-sql/client/model';
import migrations from './migrations';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const ColumnScalarFieldEnumSchema = z.enum(['id','n','reference_set_id','table_id']);

export const ColumnReferenceScalarFieldEnumSchema = z.enum(['id','n','reference_set_id']);

export const ColumnReferenceSetScalarFieldEnumSchema = z.enum(['id','n']);

export const DataTableScalarFieldEnumSchema = z.enum(['id','n']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const QueryModeSchema = z.enum(['default','insensitive']);
/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// COLUMN SCHEMA
/////////////////////////////////////////

export const ColumnSchema = z.object({
  id: z.string(),
  n: z.string(),
  reference_set_id: z.string(),
  table_id: z.string(),
})

export type Column = z.infer<typeof ColumnSchema>

/////////////////////////////////////////
// COLUMN REFERENCE SCHEMA
/////////////////////////////////////////

export const ColumnReferenceSchema = z.object({
  id: z.string(),
  n: z.string(),
  reference_set_id: z.string(),
})

export type ColumnReference = z.infer<typeof ColumnReferenceSchema>

/////////////////////////////////////////
// COLUMN REFERENCE SET SCHEMA
/////////////////////////////////////////

export const ColumnReferenceSetSchema = z.object({
  id: z.string(),
  n: z.string(),
})

export type ColumnReferenceSet = z.infer<typeof ColumnReferenceSetSchema>

/////////////////////////////////////////
// DATA TABLE SCHEMA
/////////////////////////////////////////

export const DataTableSchema = z.object({
  id: z.string(),
  n: z.string(),
})

export type DataTable = z.infer<typeof DataTableSchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// COLUMN
//------------------------------------------------------

export const ColumnIncludeSchema: z.ZodType<Prisma.ColumnInclude> = z.object({
  DataTable: z.union([z.boolean(),z.lazy(() => DataTableArgsSchema)]).optional(),
  ColumnReferenceSet: z.union([z.boolean(),z.lazy(() => ColumnReferenceSetArgsSchema)]).optional(),
}).strict()

export const ColumnArgsSchema: z.ZodType<Prisma.ColumnArgs> = z.object({
  select: z.lazy(() => ColumnSelectSchema).optional(),
  include: z.lazy(() => ColumnIncludeSchema).optional(),
}).strict();

export const ColumnSelectSchema: z.ZodType<Prisma.ColumnSelect> = z.object({
  id: z.boolean().optional(),
  n: z.boolean().optional(),
  reference_set_id: z.boolean().optional(),
  table_id: z.boolean().optional(),
  DataTable: z.union([z.boolean(),z.lazy(() => DataTableArgsSchema)]).optional(),
  ColumnReferenceSet: z.union([z.boolean(),z.lazy(() => ColumnReferenceSetArgsSchema)]).optional(),
}).strict()

// COLUMN REFERENCE
//------------------------------------------------------

export const ColumnReferenceIncludeSchema: z.ZodType<Prisma.ColumnReferenceInclude> = z.object({
  ColumnReferenceSet: z.union([z.boolean(),z.lazy(() => ColumnReferenceSetArgsSchema)]).optional(),
}).strict()

export const ColumnReferenceArgsSchema: z.ZodType<Prisma.ColumnReferenceArgs> = z.object({
  select: z.lazy(() => ColumnReferenceSelectSchema).optional(),
  include: z.lazy(() => ColumnReferenceIncludeSchema).optional(),
}).strict();

export const ColumnReferenceSelectSchema: z.ZodType<Prisma.ColumnReferenceSelect> = z.object({
  id: z.boolean().optional(),
  n: z.boolean().optional(),
  reference_set_id: z.boolean().optional(),
  ColumnReferenceSet: z.union([z.boolean(),z.lazy(() => ColumnReferenceSetArgsSchema)]).optional(),
}).strict()

// COLUMN REFERENCE SET
//------------------------------------------------------

export const ColumnReferenceSetIncludeSchema: z.ZodType<Prisma.ColumnReferenceSetInclude> = z.object({
  Column: z.union([z.boolean(),z.lazy(() => ColumnArgsSchema)]).optional(),
  ColumnReference: z.union([z.boolean(),z.lazy(() => ColumnReferenceFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ColumnReferenceSetCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const ColumnReferenceSetArgsSchema: z.ZodType<Prisma.ColumnReferenceSetArgs> = z.object({
  select: z.lazy(() => ColumnReferenceSetSelectSchema).optional(),
  include: z.lazy(() => ColumnReferenceSetIncludeSchema).optional(),
}).strict();

export const ColumnReferenceSetCountOutputTypeArgsSchema: z.ZodType<Prisma.ColumnReferenceSetCountOutputTypeArgs> = z.object({
  select: z.lazy(() => ColumnReferenceSetCountOutputTypeSelectSchema).nullish(),
}).strict();

export const ColumnReferenceSetCountOutputTypeSelectSchema: z.ZodType<Prisma.ColumnReferenceSetCountOutputTypeSelect> = z.object({
  ColumnReference: z.boolean().optional(),
}).strict();

export const ColumnReferenceSetSelectSchema: z.ZodType<Prisma.ColumnReferenceSetSelect> = z.object({
  id: z.boolean().optional(),
  n: z.boolean().optional(),
  Column: z.union([z.boolean(),z.lazy(() => ColumnArgsSchema)]).optional(),
  ColumnReference: z.union([z.boolean(),z.lazy(() => ColumnReferenceFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ColumnReferenceSetCountOutputTypeArgsSchema)]).optional(),
}).strict()

// DATA TABLE
//------------------------------------------------------

export const DataTableIncludeSchema: z.ZodType<Prisma.DataTableInclude> = z.object({
  Column: z.union([z.boolean(),z.lazy(() => ColumnFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => DataTableCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const DataTableArgsSchema: z.ZodType<Prisma.DataTableArgs> = z.object({
  select: z.lazy(() => DataTableSelectSchema).optional(),
  include: z.lazy(() => DataTableIncludeSchema).optional(),
}).strict();

export const DataTableCountOutputTypeArgsSchema: z.ZodType<Prisma.DataTableCountOutputTypeArgs> = z.object({
  select: z.lazy(() => DataTableCountOutputTypeSelectSchema).nullish(),
}).strict();

export const DataTableCountOutputTypeSelectSchema: z.ZodType<Prisma.DataTableCountOutputTypeSelect> = z.object({
  Column: z.boolean().optional(),
}).strict();

export const DataTableSelectSchema: z.ZodType<Prisma.DataTableSelect> = z.object({
  id: z.boolean().optional(),
  n: z.boolean().optional(),
  Column: z.union([z.boolean(),z.lazy(() => ColumnFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => DataTableCountOutputTypeArgsSchema)]).optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const ColumnWhereInputSchema: z.ZodType<Prisma.ColumnWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ColumnWhereInputSchema),z.lazy(() => ColumnWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ColumnWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ColumnWhereInputSchema),z.lazy(() => ColumnWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  n: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  reference_set_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  table_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  DataTable: z.union([ z.lazy(() => DataTableRelationFilterSchema),z.lazy(() => DataTableWhereInputSchema) ]).optional(),
  ColumnReferenceSet: z.union([ z.lazy(() => ColumnReferenceSetRelationFilterSchema),z.lazy(() => ColumnReferenceSetWhereInputSchema) ]).optional(),
}).strict();

export const ColumnOrderByWithRelationInputSchema: z.ZodType<Prisma.ColumnOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  n: z.lazy(() => SortOrderSchema).optional(),
  reference_set_id: z.lazy(() => SortOrderSchema).optional(),
  table_id: z.lazy(() => SortOrderSchema).optional(),
  DataTable: z.lazy(() => DataTableOrderByWithRelationInputSchema).optional(),
  ColumnReferenceSet: z.lazy(() => ColumnReferenceSetOrderByWithRelationInputSchema).optional()
}).strict();

export const ColumnWhereUniqueInputSchema: z.ZodType<Prisma.ColumnWhereUniqueInput> = z.union([
  z.object({
    id: z.string(),
    reference_set_id: z.string()
  }),
  z.object({
    id: z.string(),
  }),
  z.object({
    reference_set_id: z.string(),
  }),
])
.and(z.object({
  id: z.string().optional(),
  reference_set_id: z.string().optional(),
  AND: z.union([ z.lazy(() => ColumnWhereInputSchema),z.lazy(() => ColumnWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ColumnWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ColumnWhereInputSchema),z.lazy(() => ColumnWhereInputSchema).array() ]).optional(),
  n: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  table_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  DataTable: z.union([ z.lazy(() => DataTableRelationFilterSchema),z.lazy(() => DataTableWhereInputSchema) ]).optional(),
  ColumnReferenceSet: z.union([ z.lazy(() => ColumnReferenceSetRelationFilterSchema),z.lazy(() => ColumnReferenceSetWhereInputSchema) ]).optional(),
}).strict());

export const ColumnOrderByWithAggregationInputSchema: z.ZodType<Prisma.ColumnOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  n: z.lazy(() => SortOrderSchema).optional(),
  reference_set_id: z.lazy(() => SortOrderSchema).optional(),
  table_id: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ColumnCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ColumnMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ColumnMinOrderByAggregateInputSchema).optional()
}).strict();

export const ColumnScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ColumnScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ColumnScalarWhereWithAggregatesInputSchema),z.lazy(() => ColumnScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ColumnScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ColumnScalarWhereWithAggregatesInputSchema),z.lazy(() => ColumnScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  n: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  reference_set_id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  table_id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const ColumnReferenceWhereInputSchema: z.ZodType<Prisma.ColumnReferenceWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ColumnReferenceWhereInputSchema),z.lazy(() => ColumnReferenceWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ColumnReferenceWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ColumnReferenceWhereInputSchema),z.lazy(() => ColumnReferenceWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  n: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  reference_set_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  ColumnReferenceSet: z.union([ z.lazy(() => ColumnReferenceSetRelationFilterSchema),z.lazy(() => ColumnReferenceSetWhereInputSchema) ]).optional(),
}).strict();

export const ColumnReferenceOrderByWithRelationInputSchema: z.ZodType<Prisma.ColumnReferenceOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  n: z.lazy(() => SortOrderSchema).optional(),
  reference_set_id: z.lazy(() => SortOrderSchema).optional(),
  ColumnReferenceSet: z.lazy(() => ColumnReferenceSetOrderByWithRelationInputSchema).optional()
}).strict();

export const ColumnReferenceWhereUniqueInputSchema: z.ZodType<Prisma.ColumnReferenceWhereUniqueInput> = z.object({
  id: z.string()
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => ColumnReferenceWhereInputSchema),z.lazy(() => ColumnReferenceWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ColumnReferenceWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ColumnReferenceWhereInputSchema),z.lazy(() => ColumnReferenceWhereInputSchema).array() ]).optional(),
  n: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  reference_set_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  ColumnReferenceSet: z.union([ z.lazy(() => ColumnReferenceSetRelationFilterSchema),z.lazy(() => ColumnReferenceSetWhereInputSchema) ]).optional(),
}).strict());

export const ColumnReferenceOrderByWithAggregationInputSchema: z.ZodType<Prisma.ColumnReferenceOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  n: z.lazy(() => SortOrderSchema).optional(),
  reference_set_id: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ColumnReferenceCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ColumnReferenceMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ColumnReferenceMinOrderByAggregateInputSchema).optional()
}).strict();

export const ColumnReferenceScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ColumnReferenceScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ColumnReferenceScalarWhereWithAggregatesInputSchema),z.lazy(() => ColumnReferenceScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ColumnReferenceScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ColumnReferenceScalarWhereWithAggregatesInputSchema),z.lazy(() => ColumnReferenceScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  n: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  reference_set_id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const ColumnReferenceSetWhereInputSchema: z.ZodType<Prisma.ColumnReferenceSetWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ColumnReferenceSetWhereInputSchema),z.lazy(() => ColumnReferenceSetWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ColumnReferenceSetWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ColumnReferenceSetWhereInputSchema),z.lazy(() => ColumnReferenceSetWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  n: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  Column: z.union([ z.lazy(() => ColumnNullableRelationFilterSchema),z.lazy(() => ColumnWhereInputSchema) ]).optional().nullable(),
  ColumnReference: z.lazy(() => ColumnReferenceListRelationFilterSchema).optional()
}).strict();

export const ColumnReferenceSetOrderByWithRelationInputSchema: z.ZodType<Prisma.ColumnReferenceSetOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  n: z.lazy(() => SortOrderSchema).optional(),
  Column: z.lazy(() => ColumnOrderByWithRelationInputSchema).optional(),
  ColumnReference: z.lazy(() => ColumnReferenceOrderByRelationAggregateInputSchema).optional()
}).strict();

export const ColumnReferenceSetWhereUniqueInputSchema: z.ZodType<Prisma.ColumnReferenceSetWhereUniqueInput> = z.object({
  id: z.string()
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => ColumnReferenceSetWhereInputSchema),z.lazy(() => ColumnReferenceSetWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ColumnReferenceSetWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ColumnReferenceSetWhereInputSchema),z.lazy(() => ColumnReferenceSetWhereInputSchema).array() ]).optional(),
  n: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  Column: z.union([ z.lazy(() => ColumnNullableRelationFilterSchema),z.lazy(() => ColumnWhereInputSchema) ]).optional().nullable(),
  ColumnReference: z.lazy(() => ColumnReferenceListRelationFilterSchema).optional()
}).strict());

export const ColumnReferenceSetOrderByWithAggregationInputSchema: z.ZodType<Prisma.ColumnReferenceSetOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  n: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ColumnReferenceSetCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ColumnReferenceSetMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ColumnReferenceSetMinOrderByAggregateInputSchema).optional()
}).strict();

export const ColumnReferenceSetScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ColumnReferenceSetScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ColumnReferenceSetScalarWhereWithAggregatesInputSchema),z.lazy(() => ColumnReferenceSetScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ColumnReferenceSetScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ColumnReferenceSetScalarWhereWithAggregatesInputSchema),z.lazy(() => ColumnReferenceSetScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  n: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const DataTableWhereInputSchema: z.ZodType<Prisma.DataTableWhereInput> = z.object({
  AND: z.union([ z.lazy(() => DataTableWhereInputSchema),z.lazy(() => DataTableWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => DataTableWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => DataTableWhereInputSchema),z.lazy(() => DataTableWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  n: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  Column: z.lazy(() => ColumnListRelationFilterSchema).optional()
}).strict();

export const DataTableOrderByWithRelationInputSchema: z.ZodType<Prisma.DataTableOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  n: z.lazy(() => SortOrderSchema).optional(),
  Column: z.lazy(() => ColumnOrderByRelationAggregateInputSchema).optional()
}).strict();

export const DataTableWhereUniqueInputSchema: z.ZodType<Prisma.DataTableWhereUniqueInput> = z.object({
  id: z.string()
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => DataTableWhereInputSchema),z.lazy(() => DataTableWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => DataTableWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => DataTableWhereInputSchema),z.lazy(() => DataTableWhereInputSchema).array() ]).optional(),
  n: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  Column: z.lazy(() => ColumnListRelationFilterSchema).optional()
}).strict());

export const DataTableOrderByWithAggregationInputSchema: z.ZodType<Prisma.DataTableOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  n: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => DataTableCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => DataTableMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => DataTableMinOrderByAggregateInputSchema).optional()
}).strict();

export const DataTableScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.DataTableScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => DataTableScalarWhereWithAggregatesInputSchema),z.lazy(() => DataTableScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => DataTableScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => DataTableScalarWhereWithAggregatesInputSchema),z.lazy(() => DataTableScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  n: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const ColumnCreateInputSchema: z.ZodType<Prisma.ColumnCreateInput> = z.object({
  id: z.string(),
  n: z.string(),
  DataTable: z.lazy(() => DataTableCreateNestedOneWithoutColumnInputSchema),
  ColumnReferenceSet: z.lazy(() => ColumnReferenceSetCreateNestedOneWithoutColumnInputSchema)
}).strict();

export const ColumnUncheckedCreateInputSchema: z.ZodType<Prisma.ColumnUncheckedCreateInput> = z.object({
  id: z.string(),
  n: z.string(),
  reference_set_id: z.string(),
  table_id: z.string()
}).strict();

export const ColumnUpdateInputSchema: z.ZodType<Prisma.ColumnUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  n: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  DataTable: z.lazy(() => DataTableUpdateOneRequiredWithoutColumnNestedInputSchema).optional(),
  ColumnReferenceSet: z.lazy(() => ColumnReferenceSetUpdateOneRequiredWithoutColumnNestedInputSchema).optional()
}).strict();

export const ColumnUncheckedUpdateInputSchema: z.ZodType<Prisma.ColumnUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  n: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  reference_set_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  table_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ColumnCreateManyInputSchema: z.ZodType<Prisma.ColumnCreateManyInput> = z.object({
  id: z.string(),
  n: z.string(),
  reference_set_id: z.string(),
  table_id: z.string()
}).strict();

export const ColumnUpdateManyMutationInputSchema: z.ZodType<Prisma.ColumnUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  n: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ColumnUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ColumnUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  n: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  reference_set_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  table_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ColumnReferenceCreateInputSchema: z.ZodType<Prisma.ColumnReferenceCreateInput> = z.object({
  id: z.string(),
  n: z.string(),
  ColumnReferenceSet: z.lazy(() => ColumnReferenceSetCreateNestedOneWithoutColumnReferenceInputSchema)
}).strict();

export const ColumnReferenceUncheckedCreateInputSchema: z.ZodType<Prisma.ColumnReferenceUncheckedCreateInput> = z.object({
  id: z.string(),
  n: z.string(),
  reference_set_id: z.string()
}).strict();

export const ColumnReferenceUpdateInputSchema: z.ZodType<Prisma.ColumnReferenceUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  n: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ColumnReferenceSet: z.lazy(() => ColumnReferenceSetUpdateOneRequiredWithoutColumnReferenceNestedInputSchema).optional()
}).strict();

export const ColumnReferenceUncheckedUpdateInputSchema: z.ZodType<Prisma.ColumnReferenceUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  n: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  reference_set_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ColumnReferenceCreateManyInputSchema: z.ZodType<Prisma.ColumnReferenceCreateManyInput> = z.object({
  id: z.string(),
  n: z.string(),
  reference_set_id: z.string()
}).strict();

export const ColumnReferenceUpdateManyMutationInputSchema: z.ZodType<Prisma.ColumnReferenceUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  n: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ColumnReferenceUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ColumnReferenceUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  n: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  reference_set_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ColumnReferenceSetCreateInputSchema: z.ZodType<Prisma.ColumnReferenceSetCreateInput> = z.object({
  id: z.string(),
  n: z.string(),
  Column: z.lazy(() => ColumnCreateNestedOneWithoutColumnReferenceSetInputSchema).optional(),
  ColumnReference: z.lazy(() => ColumnReferenceCreateNestedManyWithoutColumnReferenceSetInputSchema).optional()
}).strict();

export const ColumnReferenceSetUncheckedCreateInputSchema: z.ZodType<Prisma.ColumnReferenceSetUncheckedCreateInput> = z.object({
  id: z.string(),
  n: z.string(),
  Column: z.lazy(() => ColumnUncheckedCreateNestedOneWithoutColumnReferenceSetInputSchema).optional(),
  ColumnReference: z.lazy(() => ColumnReferenceUncheckedCreateNestedManyWithoutColumnReferenceSetInputSchema).optional()
}).strict();

export const ColumnReferenceSetUpdateInputSchema: z.ZodType<Prisma.ColumnReferenceSetUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  n: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Column: z.lazy(() => ColumnUpdateOneWithoutColumnReferenceSetNestedInputSchema).optional(),
  ColumnReference: z.lazy(() => ColumnReferenceUpdateManyWithoutColumnReferenceSetNestedInputSchema).optional()
}).strict();

export const ColumnReferenceSetUncheckedUpdateInputSchema: z.ZodType<Prisma.ColumnReferenceSetUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  n: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Column: z.lazy(() => ColumnUncheckedUpdateOneWithoutColumnReferenceSetNestedInputSchema).optional(),
  ColumnReference: z.lazy(() => ColumnReferenceUncheckedUpdateManyWithoutColumnReferenceSetNestedInputSchema).optional()
}).strict();

export const ColumnReferenceSetCreateManyInputSchema: z.ZodType<Prisma.ColumnReferenceSetCreateManyInput> = z.object({
  id: z.string(),
  n: z.string()
}).strict();

export const ColumnReferenceSetUpdateManyMutationInputSchema: z.ZodType<Prisma.ColumnReferenceSetUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  n: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ColumnReferenceSetUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ColumnReferenceSetUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  n: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const DataTableCreateInputSchema: z.ZodType<Prisma.DataTableCreateInput> = z.object({
  id: z.string(),
  n: z.string(),
  Column: z.lazy(() => ColumnCreateNestedManyWithoutDataTableInputSchema).optional()
}).strict();

export const DataTableUncheckedCreateInputSchema: z.ZodType<Prisma.DataTableUncheckedCreateInput> = z.object({
  id: z.string(),
  n: z.string(),
  Column: z.lazy(() => ColumnUncheckedCreateNestedManyWithoutDataTableInputSchema).optional()
}).strict();

export const DataTableUpdateInputSchema: z.ZodType<Prisma.DataTableUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  n: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Column: z.lazy(() => ColumnUpdateManyWithoutDataTableNestedInputSchema).optional()
}).strict();

export const DataTableUncheckedUpdateInputSchema: z.ZodType<Prisma.DataTableUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  n: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Column: z.lazy(() => ColumnUncheckedUpdateManyWithoutDataTableNestedInputSchema).optional()
}).strict();

export const DataTableCreateManyInputSchema: z.ZodType<Prisma.DataTableCreateManyInput> = z.object({
  id: z.string(),
  n: z.string()
}).strict();

export const DataTableUpdateManyMutationInputSchema: z.ZodType<Prisma.DataTableUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  n: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const DataTableUncheckedUpdateManyInputSchema: z.ZodType<Prisma.DataTableUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  n: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.object({
  equals: z.union([ z.string(),z.lazy(() => StringFieldRefInputSchema) ]).optional(),
  in: z.union([ z.string().array(),z.lazy(() => ListStringFieldRefInputSchema) ]).optional(),
  notIn: z.union([ z.string().array(),z.lazy(() => ListStringFieldRefInputSchema) ]).optional(),
  lt: z.union([ z.string(),z.lazy(() => StringFieldRefInputSchema) ]).optional(),
  lte: z.union([ z.string(),z.lazy(() => StringFieldRefInputSchema) ]).optional(),
  gt: z.union([ z.string(),z.lazy(() => StringFieldRefInputSchema) ]).optional(),
  gte: z.union([ z.string(),z.lazy(() => StringFieldRefInputSchema) ]).optional(),
  contains: z.union([ z.string(),z.lazy(() => StringFieldRefInputSchema) ]).optional(),
  startsWith: z.union([ z.string(),z.lazy(() => StringFieldRefInputSchema) ]).optional(),
  endsWith: z.union([ z.string(),z.lazy(() => StringFieldRefInputSchema) ]).optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const DataTableRelationFilterSchema: z.ZodType<Prisma.DataTableRelationFilter> = z.object({
  is: z.lazy(() => DataTableWhereInputSchema).optional(),
  isNot: z.lazy(() => DataTableWhereInputSchema).optional()
}).strict();

export const ColumnReferenceSetRelationFilterSchema: z.ZodType<Prisma.ColumnReferenceSetRelationFilter> = z.object({
  is: z.lazy(() => ColumnReferenceSetWhereInputSchema).optional(),
  isNot: z.lazy(() => ColumnReferenceSetWhereInputSchema).optional()
}).strict();

export const ColumnCountOrderByAggregateInputSchema: z.ZodType<Prisma.ColumnCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  n: z.lazy(() => SortOrderSchema).optional(),
  reference_set_id: z.lazy(() => SortOrderSchema).optional(),
  table_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ColumnMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ColumnMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  n: z.lazy(() => SortOrderSchema).optional(),
  reference_set_id: z.lazy(() => SortOrderSchema).optional(),
  table_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ColumnMinOrderByAggregateInputSchema: z.ZodType<Prisma.ColumnMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  n: z.lazy(() => SortOrderSchema).optional(),
  reference_set_id: z.lazy(() => SortOrderSchema).optional(),
  table_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.object({
  equals: z.union([ z.string(),z.lazy(() => StringFieldRefInputSchema) ]).optional(),
  in: z.union([ z.string().array(),z.lazy(() => ListStringFieldRefInputSchema) ]).optional(),
  notIn: z.union([ z.string().array(),z.lazy(() => ListStringFieldRefInputSchema) ]).optional(),
  lt: z.union([ z.string(),z.lazy(() => StringFieldRefInputSchema) ]).optional(),
  lte: z.union([ z.string(),z.lazy(() => StringFieldRefInputSchema) ]).optional(),
  gt: z.union([ z.string(),z.lazy(() => StringFieldRefInputSchema) ]).optional(),
  gte: z.union([ z.string(),z.lazy(() => StringFieldRefInputSchema) ]).optional(),
  contains: z.union([ z.string(),z.lazy(() => StringFieldRefInputSchema) ]).optional(),
  startsWith: z.union([ z.string(),z.lazy(() => StringFieldRefInputSchema) ]).optional(),
  endsWith: z.union([ z.string(),z.lazy(() => StringFieldRefInputSchema) ]).optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const ColumnReferenceCountOrderByAggregateInputSchema: z.ZodType<Prisma.ColumnReferenceCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  n: z.lazy(() => SortOrderSchema).optional(),
  reference_set_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ColumnReferenceMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ColumnReferenceMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  n: z.lazy(() => SortOrderSchema).optional(),
  reference_set_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ColumnReferenceMinOrderByAggregateInputSchema: z.ZodType<Prisma.ColumnReferenceMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  n: z.lazy(() => SortOrderSchema).optional(),
  reference_set_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ColumnNullableRelationFilterSchema: z.ZodType<Prisma.ColumnNullableRelationFilter> = z.object({
  is: z.lazy(() => ColumnWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => ColumnWhereInputSchema).optional().nullable()
}).strict();

export const ColumnReferenceListRelationFilterSchema: z.ZodType<Prisma.ColumnReferenceListRelationFilter> = z.object({
  every: z.lazy(() => ColumnReferenceWhereInputSchema).optional(),
  some: z.lazy(() => ColumnReferenceWhereInputSchema).optional(),
  none: z.lazy(() => ColumnReferenceWhereInputSchema).optional()
}).strict();

export const ColumnReferenceOrderByRelationAggregateInputSchema: z.ZodType<Prisma.ColumnReferenceOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ColumnReferenceSetCountOrderByAggregateInputSchema: z.ZodType<Prisma.ColumnReferenceSetCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  n: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ColumnReferenceSetMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ColumnReferenceSetMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  n: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ColumnReferenceSetMinOrderByAggregateInputSchema: z.ZodType<Prisma.ColumnReferenceSetMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  n: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ColumnListRelationFilterSchema: z.ZodType<Prisma.ColumnListRelationFilter> = z.object({
  every: z.lazy(() => ColumnWhereInputSchema).optional(),
  some: z.lazy(() => ColumnWhereInputSchema).optional(),
  none: z.lazy(() => ColumnWhereInputSchema).optional()
}).strict();

export const ColumnOrderByRelationAggregateInputSchema: z.ZodType<Prisma.ColumnOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DataTableCountOrderByAggregateInputSchema: z.ZodType<Prisma.DataTableCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  n: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DataTableMaxOrderByAggregateInputSchema: z.ZodType<Prisma.DataTableMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  n: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DataTableMinOrderByAggregateInputSchema: z.ZodType<Prisma.DataTableMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  n: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DataTableCreateNestedOneWithoutColumnInputSchema: z.ZodType<Prisma.DataTableCreateNestedOneWithoutColumnInput> = z.object({
  create: z.union([ z.lazy(() => DataTableCreateWithoutColumnInputSchema),z.lazy(() => DataTableUncheckedCreateWithoutColumnInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => DataTableCreateOrConnectWithoutColumnInputSchema).optional(),
  connect: z.lazy(() => DataTableWhereUniqueInputSchema).optional()
}).strict();

export const ColumnReferenceSetCreateNestedOneWithoutColumnInputSchema: z.ZodType<Prisma.ColumnReferenceSetCreateNestedOneWithoutColumnInput> = z.object({
  create: z.union([ z.lazy(() => ColumnReferenceSetCreateWithoutColumnInputSchema),z.lazy(() => ColumnReferenceSetUncheckedCreateWithoutColumnInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ColumnReferenceSetCreateOrConnectWithoutColumnInputSchema).optional(),
  connect: z.lazy(() => ColumnReferenceSetWhereUniqueInputSchema).optional()
}).strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional()
}).strict();

export const DataTableUpdateOneRequiredWithoutColumnNestedInputSchema: z.ZodType<Prisma.DataTableUpdateOneRequiredWithoutColumnNestedInput> = z.object({
  create: z.union([ z.lazy(() => DataTableCreateWithoutColumnInputSchema),z.lazy(() => DataTableUncheckedCreateWithoutColumnInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => DataTableCreateOrConnectWithoutColumnInputSchema).optional(),
  upsert: z.lazy(() => DataTableUpsertWithoutColumnInputSchema).optional(),
  connect: z.lazy(() => DataTableWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => DataTableUpdateToOneWithWhereWithoutColumnInputSchema),z.lazy(() => DataTableUpdateWithoutColumnInputSchema),z.lazy(() => DataTableUncheckedUpdateWithoutColumnInputSchema) ]).optional(),
}).strict();

export const ColumnReferenceSetUpdateOneRequiredWithoutColumnNestedInputSchema: z.ZodType<Prisma.ColumnReferenceSetUpdateOneRequiredWithoutColumnNestedInput> = z.object({
  create: z.union([ z.lazy(() => ColumnReferenceSetCreateWithoutColumnInputSchema),z.lazy(() => ColumnReferenceSetUncheckedCreateWithoutColumnInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ColumnReferenceSetCreateOrConnectWithoutColumnInputSchema).optional(),
  upsert: z.lazy(() => ColumnReferenceSetUpsertWithoutColumnInputSchema).optional(),
  connect: z.lazy(() => ColumnReferenceSetWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ColumnReferenceSetUpdateToOneWithWhereWithoutColumnInputSchema),z.lazy(() => ColumnReferenceSetUpdateWithoutColumnInputSchema),z.lazy(() => ColumnReferenceSetUncheckedUpdateWithoutColumnInputSchema) ]).optional(),
}).strict();

export const ColumnReferenceSetCreateNestedOneWithoutColumnReferenceInputSchema: z.ZodType<Prisma.ColumnReferenceSetCreateNestedOneWithoutColumnReferenceInput> = z.object({
  create: z.union([ z.lazy(() => ColumnReferenceSetCreateWithoutColumnReferenceInputSchema),z.lazy(() => ColumnReferenceSetUncheckedCreateWithoutColumnReferenceInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ColumnReferenceSetCreateOrConnectWithoutColumnReferenceInputSchema).optional(),
  connect: z.lazy(() => ColumnReferenceSetWhereUniqueInputSchema).optional()
}).strict();

export const ColumnReferenceSetUpdateOneRequiredWithoutColumnReferenceNestedInputSchema: z.ZodType<Prisma.ColumnReferenceSetUpdateOneRequiredWithoutColumnReferenceNestedInput> = z.object({
  create: z.union([ z.lazy(() => ColumnReferenceSetCreateWithoutColumnReferenceInputSchema),z.lazy(() => ColumnReferenceSetUncheckedCreateWithoutColumnReferenceInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ColumnReferenceSetCreateOrConnectWithoutColumnReferenceInputSchema).optional(),
  upsert: z.lazy(() => ColumnReferenceSetUpsertWithoutColumnReferenceInputSchema).optional(),
  connect: z.lazy(() => ColumnReferenceSetWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ColumnReferenceSetUpdateToOneWithWhereWithoutColumnReferenceInputSchema),z.lazy(() => ColumnReferenceSetUpdateWithoutColumnReferenceInputSchema),z.lazy(() => ColumnReferenceSetUncheckedUpdateWithoutColumnReferenceInputSchema) ]).optional(),
}).strict();

export const ColumnCreateNestedOneWithoutColumnReferenceSetInputSchema: z.ZodType<Prisma.ColumnCreateNestedOneWithoutColumnReferenceSetInput> = z.object({
  create: z.union([ z.lazy(() => ColumnCreateWithoutColumnReferenceSetInputSchema),z.lazy(() => ColumnUncheckedCreateWithoutColumnReferenceSetInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ColumnCreateOrConnectWithoutColumnReferenceSetInputSchema).optional(),
  connect: z.lazy(() => ColumnWhereUniqueInputSchema).optional()
}).strict();

export const ColumnReferenceCreateNestedManyWithoutColumnReferenceSetInputSchema: z.ZodType<Prisma.ColumnReferenceCreateNestedManyWithoutColumnReferenceSetInput> = z.object({
  create: z.union([ z.lazy(() => ColumnReferenceCreateWithoutColumnReferenceSetInputSchema),z.lazy(() => ColumnReferenceCreateWithoutColumnReferenceSetInputSchema).array(),z.lazy(() => ColumnReferenceUncheckedCreateWithoutColumnReferenceSetInputSchema),z.lazy(() => ColumnReferenceUncheckedCreateWithoutColumnReferenceSetInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ColumnReferenceCreateOrConnectWithoutColumnReferenceSetInputSchema),z.lazy(() => ColumnReferenceCreateOrConnectWithoutColumnReferenceSetInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ColumnReferenceCreateManyColumnReferenceSetInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ColumnReferenceWhereUniqueInputSchema),z.lazy(() => ColumnReferenceWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ColumnUncheckedCreateNestedOneWithoutColumnReferenceSetInputSchema: z.ZodType<Prisma.ColumnUncheckedCreateNestedOneWithoutColumnReferenceSetInput> = z.object({
  create: z.union([ z.lazy(() => ColumnCreateWithoutColumnReferenceSetInputSchema),z.lazy(() => ColumnUncheckedCreateWithoutColumnReferenceSetInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ColumnCreateOrConnectWithoutColumnReferenceSetInputSchema).optional(),
  connect: z.lazy(() => ColumnWhereUniqueInputSchema).optional()
}).strict();

export const ColumnReferenceUncheckedCreateNestedManyWithoutColumnReferenceSetInputSchema: z.ZodType<Prisma.ColumnReferenceUncheckedCreateNestedManyWithoutColumnReferenceSetInput> = z.object({
  create: z.union([ z.lazy(() => ColumnReferenceCreateWithoutColumnReferenceSetInputSchema),z.lazy(() => ColumnReferenceCreateWithoutColumnReferenceSetInputSchema).array(),z.lazy(() => ColumnReferenceUncheckedCreateWithoutColumnReferenceSetInputSchema),z.lazy(() => ColumnReferenceUncheckedCreateWithoutColumnReferenceSetInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ColumnReferenceCreateOrConnectWithoutColumnReferenceSetInputSchema),z.lazy(() => ColumnReferenceCreateOrConnectWithoutColumnReferenceSetInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ColumnReferenceCreateManyColumnReferenceSetInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ColumnReferenceWhereUniqueInputSchema),z.lazy(() => ColumnReferenceWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ColumnUpdateOneWithoutColumnReferenceSetNestedInputSchema: z.ZodType<Prisma.ColumnUpdateOneWithoutColumnReferenceSetNestedInput> = z.object({
  create: z.union([ z.lazy(() => ColumnCreateWithoutColumnReferenceSetInputSchema),z.lazy(() => ColumnUncheckedCreateWithoutColumnReferenceSetInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ColumnCreateOrConnectWithoutColumnReferenceSetInputSchema).optional(),
  upsert: z.lazy(() => ColumnUpsertWithoutColumnReferenceSetInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => ColumnWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => ColumnWhereInputSchema) ]).optional(),
  connect: z.lazy(() => ColumnWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ColumnUpdateToOneWithWhereWithoutColumnReferenceSetInputSchema),z.lazy(() => ColumnUpdateWithoutColumnReferenceSetInputSchema),z.lazy(() => ColumnUncheckedUpdateWithoutColumnReferenceSetInputSchema) ]).optional(),
}).strict();

export const ColumnReferenceUpdateManyWithoutColumnReferenceSetNestedInputSchema: z.ZodType<Prisma.ColumnReferenceUpdateManyWithoutColumnReferenceSetNestedInput> = z.object({
  create: z.union([ z.lazy(() => ColumnReferenceCreateWithoutColumnReferenceSetInputSchema),z.lazy(() => ColumnReferenceCreateWithoutColumnReferenceSetInputSchema).array(),z.lazy(() => ColumnReferenceUncheckedCreateWithoutColumnReferenceSetInputSchema),z.lazy(() => ColumnReferenceUncheckedCreateWithoutColumnReferenceSetInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ColumnReferenceCreateOrConnectWithoutColumnReferenceSetInputSchema),z.lazy(() => ColumnReferenceCreateOrConnectWithoutColumnReferenceSetInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ColumnReferenceUpsertWithWhereUniqueWithoutColumnReferenceSetInputSchema),z.lazy(() => ColumnReferenceUpsertWithWhereUniqueWithoutColumnReferenceSetInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ColumnReferenceCreateManyColumnReferenceSetInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ColumnReferenceWhereUniqueInputSchema),z.lazy(() => ColumnReferenceWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ColumnReferenceWhereUniqueInputSchema),z.lazy(() => ColumnReferenceWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ColumnReferenceWhereUniqueInputSchema),z.lazy(() => ColumnReferenceWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ColumnReferenceWhereUniqueInputSchema),z.lazy(() => ColumnReferenceWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ColumnReferenceUpdateWithWhereUniqueWithoutColumnReferenceSetInputSchema),z.lazy(() => ColumnReferenceUpdateWithWhereUniqueWithoutColumnReferenceSetInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ColumnReferenceUpdateManyWithWhereWithoutColumnReferenceSetInputSchema),z.lazy(() => ColumnReferenceUpdateManyWithWhereWithoutColumnReferenceSetInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ColumnReferenceScalarWhereInputSchema),z.lazy(() => ColumnReferenceScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ColumnUncheckedUpdateOneWithoutColumnReferenceSetNestedInputSchema: z.ZodType<Prisma.ColumnUncheckedUpdateOneWithoutColumnReferenceSetNestedInput> = z.object({
  create: z.union([ z.lazy(() => ColumnCreateWithoutColumnReferenceSetInputSchema),z.lazy(() => ColumnUncheckedCreateWithoutColumnReferenceSetInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ColumnCreateOrConnectWithoutColumnReferenceSetInputSchema).optional(),
  upsert: z.lazy(() => ColumnUpsertWithoutColumnReferenceSetInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => ColumnWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => ColumnWhereInputSchema) ]).optional(),
  connect: z.lazy(() => ColumnWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ColumnUpdateToOneWithWhereWithoutColumnReferenceSetInputSchema),z.lazy(() => ColumnUpdateWithoutColumnReferenceSetInputSchema),z.lazy(() => ColumnUncheckedUpdateWithoutColumnReferenceSetInputSchema) ]).optional(),
}).strict();

export const ColumnReferenceUncheckedUpdateManyWithoutColumnReferenceSetNestedInputSchema: z.ZodType<Prisma.ColumnReferenceUncheckedUpdateManyWithoutColumnReferenceSetNestedInput> = z.object({
  create: z.union([ z.lazy(() => ColumnReferenceCreateWithoutColumnReferenceSetInputSchema),z.lazy(() => ColumnReferenceCreateWithoutColumnReferenceSetInputSchema).array(),z.lazy(() => ColumnReferenceUncheckedCreateWithoutColumnReferenceSetInputSchema),z.lazy(() => ColumnReferenceUncheckedCreateWithoutColumnReferenceSetInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ColumnReferenceCreateOrConnectWithoutColumnReferenceSetInputSchema),z.lazy(() => ColumnReferenceCreateOrConnectWithoutColumnReferenceSetInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ColumnReferenceUpsertWithWhereUniqueWithoutColumnReferenceSetInputSchema),z.lazy(() => ColumnReferenceUpsertWithWhereUniqueWithoutColumnReferenceSetInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ColumnReferenceCreateManyColumnReferenceSetInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ColumnReferenceWhereUniqueInputSchema),z.lazy(() => ColumnReferenceWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ColumnReferenceWhereUniqueInputSchema),z.lazy(() => ColumnReferenceWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ColumnReferenceWhereUniqueInputSchema),z.lazy(() => ColumnReferenceWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ColumnReferenceWhereUniqueInputSchema),z.lazy(() => ColumnReferenceWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ColumnReferenceUpdateWithWhereUniqueWithoutColumnReferenceSetInputSchema),z.lazy(() => ColumnReferenceUpdateWithWhereUniqueWithoutColumnReferenceSetInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ColumnReferenceUpdateManyWithWhereWithoutColumnReferenceSetInputSchema),z.lazy(() => ColumnReferenceUpdateManyWithWhereWithoutColumnReferenceSetInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ColumnReferenceScalarWhereInputSchema),z.lazy(() => ColumnReferenceScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ColumnCreateNestedManyWithoutDataTableInputSchema: z.ZodType<Prisma.ColumnCreateNestedManyWithoutDataTableInput> = z.object({
  create: z.union([ z.lazy(() => ColumnCreateWithoutDataTableInputSchema),z.lazy(() => ColumnCreateWithoutDataTableInputSchema).array(),z.lazy(() => ColumnUncheckedCreateWithoutDataTableInputSchema),z.lazy(() => ColumnUncheckedCreateWithoutDataTableInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ColumnCreateOrConnectWithoutDataTableInputSchema),z.lazy(() => ColumnCreateOrConnectWithoutDataTableInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ColumnCreateManyDataTableInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ColumnWhereUniqueInputSchema),z.lazy(() => ColumnWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ColumnUncheckedCreateNestedManyWithoutDataTableInputSchema: z.ZodType<Prisma.ColumnUncheckedCreateNestedManyWithoutDataTableInput> = z.object({
  create: z.union([ z.lazy(() => ColumnCreateWithoutDataTableInputSchema),z.lazy(() => ColumnCreateWithoutDataTableInputSchema).array(),z.lazy(() => ColumnUncheckedCreateWithoutDataTableInputSchema),z.lazy(() => ColumnUncheckedCreateWithoutDataTableInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ColumnCreateOrConnectWithoutDataTableInputSchema),z.lazy(() => ColumnCreateOrConnectWithoutDataTableInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ColumnCreateManyDataTableInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ColumnWhereUniqueInputSchema),z.lazy(() => ColumnWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ColumnUpdateManyWithoutDataTableNestedInputSchema: z.ZodType<Prisma.ColumnUpdateManyWithoutDataTableNestedInput> = z.object({
  create: z.union([ z.lazy(() => ColumnCreateWithoutDataTableInputSchema),z.lazy(() => ColumnCreateWithoutDataTableInputSchema).array(),z.lazy(() => ColumnUncheckedCreateWithoutDataTableInputSchema),z.lazy(() => ColumnUncheckedCreateWithoutDataTableInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ColumnCreateOrConnectWithoutDataTableInputSchema),z.lazy(() => ColumnCreateOrConnectWithoutDataTableInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ColumnUpsertWithWhereUniqueWithoutDataTableInputSchema),z.lazy(() => ColumnUpsertWithWhereUniqueWithoutDataTableInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ColumnCreateManyDataTableInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ColumnWhereUniqueInputSchema),z.lazy(() => ColumnWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ColumnWhereUniqueInputSchema),z.lazy(() => ColumnWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ColumnWhereUniqueInputSchema),z.lazy(() => ColumnWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ColumnWhereUniqueInputSchema),z.lazy(() => ColumnWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ColumnUpdateWithWhereUniqueWithoutDataTableInputSchema),z.lazy(() => ColumnUpdateWithWhereUniqueWithoutDataTableInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ColumnUpdateManyWithWhereWithoutDataTableInputSchema),z.lazy(() => ColumnUpdateManyWithWhereWithoutDataTableInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ColumnScalarWhereInputSchema),z.lazy(() => ColumnScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ColumnUncheckedUpdateManyWithoutDataTableNestedInputSchema: z.ZodType<Prisma.ColumnUncheckedUpdateManyWithoutDataTableNestedInput> = z.object({
  create: z.union([ z.lazy(() => ColumnCreateWithoutDataTableInputSchema),z.lazy(() => ColumnCreateWithoutDataTableInputSchema).array(),z.lazy(() => ColumnUncheckedCreateWithoutDataTableInputSchema),z.lazy(() => ColumnUncheckedCreateWithoutDataTableInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ColumnCreateOrConnectWithoutDataTableInputSchema),z.lazy(() => ColumnCreateOrConnectWithoutDataTableInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ColumnUpsertWithWhereUniqueWithoutDataTableInputSchema),z.lazy(() => ColumnUpsertWithWhereUniqueWithoutDataTableInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ColumnCreateManyDataTableInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ColumnWhereUniqueInputSchema),z.lazy(() => ColumnWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ColumnWhereUniqueInputSchema),z.lazy(() => ColumnWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ColumnWhereUniqueInputSchema),z.lazy(() => ColumnWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ColumnWhereUniqueInputSchema),z.lazy(() => ColumnWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ColumnUpdateWithWhereUniqueWithoutDataTableInputSchema),z.lazy(() => ColumnUpdateWithWhereUniqueWithoutDataTableInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ColumnUpdateManyWithWhereWithoutDataTableInputSchema),z.lazy(() => ColumnUpdateManyWithWhereWithoutDataTableInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ColumnScalarWhereInputSchema),z.lazy(() => ColumnScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.object({
  equals: z.union([ z.string(),z.lazy(() => StringFieldRefInputSchema) ]).optional(),
  in: z.union([ z.string().array(),z.lazy(() => ListStringFieldRefInputSchema) ]).optional(),
  notIn: z.union([ z.string().array(),z.lazy(() => ListStringFieldRefInputSchema) ]).optional(),
  lt: z.union([ z.string(),z.lazy(() => StringFieldRefInputSchema) ]).optional(),
  lte: z.union([ z.string(),z.lazy(() => StringFieldRefInputSchema) ]).optional(),
  gt: z.union([ z.string(),z.lazy(() => StringFieldRefInputSchema) ]).optional(),
  gte: z.union([ z.string(),z.lazy(() => StringFieldRefInputSchema) ]).optional(),
  contains: z.union([ z.string(),z.lazy(() => StringFieldRefInputSchema) ]).optional(),
  startsWith: z.union([ z.string(),z.lazy(() => StringFieldRefInputSchema) ]).optional(),
  endsWith: z.union([ z.string(),z.lazy(() => StringFieldRefInputSchema) ]).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.object({
  equals: z.union([ z.string(),z.lazy(() => StringFieldRefInputSchema) ]).optional(),
  in: z.union([ z.string().array(),z.lazy(() => ListStringFieldRefInputSchema) ]).optional(),
  notIn: z.union([ z.string().array(),z.lazy(() => ListStringFieldRefInputSchema) ]).optional(),
  lt: z.union([ z.string(),z.lazy(() => StringFieldRefInputSchema) ]).optional(),
  lte: z.union([ z.string(),z.lazy(() => StringFieldRefInputSchema) ]).optional(),
  gt: z.union([ z.string(),z.lazy(() => StringFieldRefInputSchema) ]).optional(),
  gte: z.union([ z.string(),z.lazy(() => StringFieldRefInputSchema) ]).optional(),
  contains: z.union([ z.string(),z.lazy(() => StringFieldRefInputSchema) ]).optional(),
  startsWith: z.union([ z.string(),z.lazy(() => StringFieldRefInputSchema) ]).optional(),
  endsWith: z.union([ z.string(),z.lazy(() => StringFieldRefInputSchema) ]).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.object({
  equals: z.union([ z.number(),z.lazy(() => IntFieldRefInputSchema) ]).optional(),
  in: z.union([ z.number().array(),z.lazy(() => ListIntFieldRefInputSchema) ]).optional(),
  notIn: z.union([ z.number().array(),z.lazy(() => ListIntFieldRefInputSchema) ]).optional(),
  lt: z.union([ z.number(),z.lazy(() => IntFieldRefInputSchema) ]).optional(),
  lte: z.union([ z.number(),z.lazy(() => IntFieldRefInputSchema) ]).optional(),
  gt: z.union([ z.number(),z.lazy(() => IntFieldRefInputSchema) ]).optional(),
  gte: z.union([ z.number(),z.lazy(() => IntFieldRefInputSchema) ]).optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const DataTableCreateWithoutColumnInputSchema: z.ZodType<Prisma.DataTableCreateWithoutColumnInput> = z.object({
  id: z.string(),
  n: z.string()
}).strict();

export const DataTableUncheckedCreateWithoutColumnInputSchema: z.ZodType<Prisma.DataTableUncheckedCreateWithoutColumnInput> = z.object({
  id: z.string(),
  n: z.string()
}).strict();

export const DataTableCreateOrConnectWithoutColumnInputSchema: z.ZodType<Prisma.DataTableCreateOrConnectWithoutColumnInput> = z.object({
  where: z.lazy(() => DataTableWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => DataTableCreateWithoutColumnInputSchema),z.lazy(() => DataTableUncheckedCreateWithoutColumnInputSchema) ]),
}).strict();

export const ColumnReferenceSetCreateWithoutColumnInputSchema: z.ZodType<Prisma.ColumnReferenceSetCreateWithoutColumnInput> = z.object({
  id: z.string(),
  n: z.string(),
  ColumnReference: z.lazy(() => ColumnReferenceCreateNestedManyWithoutColumnReferenceSetInputSchema).optional()
}).strict();

export const ColumnReferenceSetUncheckedCreateWithoutColumnInputSchema: z.ZodType<Prisma.ColumnReferenceSetUncheckedCreateWithoutColumnInput> = z.object({
  id: z.string(),
  n: z.string(),
  ColumnReference: z.lazy(() => ColumnReferenceUncheckedCreateNestedManyWithoutColumnReferenceSetInputSchema).optional()
}).strict();

export const ColumnReferenceSetCreateOrConnectWithoutColumnInputSchema: z.ZodType<Prisma.ColumnReferenceSetCreateOrConnectWithoutColumnInput> = z.object({
  where: z.lazy(() => ColumnReferenceSetWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ColumnReferenceSetCreateWithoutColumnInputSchema),z.lazy(() => ColumnReferenceSetUncheckedCreateWithoutColumnInputSchema) ]),
}).strict();

export const DataTableUpsertWithoutColumnInputSchema: z.ZodType<Prisma.DataTableUpsertWithoutColumnInput> = z.object({
  update: z.union([ z.lazy(() => DataTableUpdateWithoutColumnInputSchema),z.lazy(() => DataTableUncheckedUpdateWithoutColumnInputSchema) ]),
  create: z.union([ z.lazy(() => DataTableCreateWithoutColumnInputSchema),z.lazy(() => DataTableUncheckedCreateWithoutColumnInputSchema) ]),
  where: z.lazy(() => DataTableWhereInputSchema).optional()
}).strict();

export const DataTableUpdateToOneWithWhereWithoutColumnInputSchema: z.ZodType<Prisma.DataTableUpdateToOneWithWhereWithoutColumnInput> = z.object({
  where: z.lazy(() => DataTableWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => DataTableUpdateWithoutColumnInputSchema),z.lazy(() => DataTableUncheckedUpdateWithoutColumnInputSchema) ]),
}).strict();

export const DataTableUpdateWithoutColumnInputSchema: z.ZodType<Prisma.DataTableUpdateWithoutColumnInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  n: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const DataTableUncheckedUpdateWithoutColumnInputSchema: z.ZodType<Prisma.DataTableUncheckedUpdateWithoutColumnInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  n: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ColumnReferenceSetUpsertWithoutColumnInputSchema: z.ZodType<Prisma.ColumnReferenceSetUpsertWithoutColumnInput> = z.object({
  update: z.union([ z.lazy(() => ColumnReferenceSetUpdateWithoutColumnInputSchema),z.lazy(() => ColumnReferenceSetUncheckedUpdateWithoutColumnInputSchema) ]),
  create: z.union([ z.lazy(() => ColumnReferenceSetCreateWithoutColumnInputSchema),z.lazy(() => ColumnReferenceSetUncheckedCreateWithoutColumnInputSchema) ]),
  where: z.lazy(() => ColumnReferenceSetWhereInputSchema).optional()
}).strict();

export const ColumnReferenceSetUpdateToOneWithWhereWithoutColumnInputSchema: z.ZodType<Prisma.ColumnReferenceSetUpdateToOneWithWhereWithoutColumnInput> = z.object({
  where: z.lazy(() => ColumnReferenceSetWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => ColumnReferenceSetUpdateWithoutColumnInputSchema),z.lazy(() => ColumnReferenceSetUncheckedUpdateWithoutColumnInputSchema) ]),
}).strict();

export const ColumnReferenceSetUpdateWithoutColumnInputSchema: z.ZodType<Prisma.ColumnReferenceSetUpdateWithoutColumnInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  n: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ColumnReference: z.lazy(() => ColumnReferenceUpdateManyWithoutColumnReferenceSetNestedInputSchema).optional()
}).strict();

export const ColumnReferenceSetUncheckedUpdateWithoutColumnInputSchema: z.ZodType<Prisma.ColumnReferenceSetUncheckedUpdateWithoutColumnInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  n: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ColumnReference: z.lazy(() => ColumnReferenceUncheckedUpdateManyWithoutColumnReferenceSetNestedInputSchema).optional()
}).strict();

export const ColumnReferenceSetCreateWithoutColumnReferenceInputSchema: z.ZodType<Prisma.ColumnReferenceSetCreateWithoutColumnReferenceInput> = z.object({
  id: z.string(),
  n: z.string(),
  Column: z.lazy(() => ColumnCreateNestedOneWithoutColumnReferenceSetInputSchema).optional()
}).strict();

export const ColumnReferenceSetUncheckedCreateWithoutColumnReferenceInputSchema: z.ZodType<Prisma.ColumnReferenceSetUncheckedCreateWithoutColumnReferenceInput> = z.object({
  id: z.string(),
  n: z.string(),
  Column: z.lazy(() => ColumnUncheckedCreateNestedOneWithoutColumnReferenceSetInputSchema).optional()
}).strict();

export const ColumnReferenceSetCreateOrConnectWithoutColumnReferenceInputSchema: z.ZodType<Prisma.ColumnReferenceSetCreateOrConnectWithoutColumnReferenceInput> = z.object({
  where: z.lazy(() => ColumnReferenceSetWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ColumnReferenceSetCreateWithoutColumnReferenceInputSchema),z.lazy(() => ColumnReferenceSetUncheckedCreateWithoutColumnReferenceInputSchema) ]),
}).strict();

export const ColumnReferenceSetUpsertWithoutColumnReferenceInputSchema: z.ZodType<Prisma.ColumnReferenceSetUpsertWithoutColumnReferenceInput> = z.object({
  update: z.union([ z.lazy(() => ColumnReferenceSetUpdateWithoutColumnReferenceInputSchema),z.lazy(() => ColumnReferenceSetUncheckedUpdateWithoutColumnReferenceInputSchema) ]),
  create: z.union([ z.lazy(() => ColumnReferenceSetCreateWithoutColumnReferenceInputSchema),z.lazy(() => ColumnReferenceSetUncheckedCreateWithoutColumnReferenceInputSchema) ]),
  where: z.lazy(() => ColumnReferenceSetWhereInputSchema).optional()
}).strict();

export const ColumnReferenceSetUpdateToOneWithWhereWithoutColumnReferenceInputSchema: z.ZodType<Prisma.ColumnReferenceSetUpdateToOneWithWhereWithoutColumnReferenceInput> = z.object({
  where: z.lazy(() => ColumnReferenceSetWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => ColumnReferenceSetUpdateWithoutColumnReferenceInputSchema),z.lazy(() => ColumnReferenceSetUncheckedUpdateWithoutColumnReferenceInputSchema) ]),
}).strict();

export const ColumnReferenceSetUpdateWithoutColumnReferenceInputSchema: z.ZodType<Prisma.ColumnReferenceSetUpdateWithoutColumnReferenceInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  n: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Column: z.lazy(() => ColumnUpdateOneWithoutColumnReferenceSetNestedInputSchema).optional()
}).strict();

export const ColumnReferenceSetUncheckedUpdateWithoutColumnReferenceInputSchema: z.ZodType<Prisma.ColumnReferenceSetUncheckedUpdateWithoutColumnReferenceInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  n: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Column: z.lazy(() => ColumnUncheckedUpdateOneWithoutColumnReferenceSetNestedInputSchema).optional()
}).strict();

export const ColumnCreateWithoutColumnReferenceSetInputSchema: z.ZodType<Prisma.ColumnCreateWithoutColumnReferenceSetInput> = z.object({
  id: z.string(),
  n: z.string(),
  DataTable: z.lazy(() => DataTableCreateNestedOneWithoutColumnInputSchema)
}).strict();

export const ColumnUncheckedCreateWithoutColumnReferenceSetInputSchema: z.ZodType<Prisma.ColumnUncheckedCreateWithoutColumnReferenceSetInput> = z.object({
  id: z.string(),
  n: z.string(),
  table_id: z.string()
}).strict();

export const ColumnCreateOrConnectWithoutColumnReferenceSetInputSchema: z.ZodType<Prisma.ColumnCreateOrConnectWithoutColumnReferenceSetInput> = z.object({
  where: z.lazy(() => ColumnWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ColumnCreateWithoutColumnReferenceSetInputSchema),z.lazy(() => ColumnUncheckedCreateWithoutColumnReferenceSetInputSchema) ]),
}).strict();

export const ColumnReferenceCreateWithoutColumnReferenceSetInputSchema: z.ZodType<Prisma.ColumnReferenceCreateWithoutColumnReferenceSetInput> = z.object({
  id: z.string(),
  n: z.string()
}).strict();

export const ColumnReferenceUncheckedCreateWithoutColumnReferenceSetInputSchema: z.ZodType<Prisma.ColumnReferenceUncheckedCreateWithoutColumnReferenceSetInput> = z.object({
  id: z.string(),
  n: z.string()
}).strict();

export const ColumnReferenceCreateOrConnectWithoutColumnReferenceSetInputSchema: z.ZodType<Prisma.ColumnReferenceCreateOrConnectWithoutColumnReferenceSetInput> = z.object({
  where: z.lazy(() => ColumnReferenceWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ColumnReferenceCreateWithoutColumnReferenceSetInputSchema),z.lazy(() => ColumnReferenceUncheckedCreateWithoutColumnReferenceSetInputSchema) ]),
}).strict();

export const ColumnReferenceCreateManyColumnReferenceSetInputEnvelopeSchema: z.ZodType<Prisma.ColumnReferenceCreateManyColumnReferenceSetInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ColumnReferenceCreateManyColumnReferenceSetInputSchema),z.lazy(() => ColumnReferenceCreateManyColumnReferenceSetInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const ColumnUpsertWithoutColumnReferenceSetInputSchema: z.ZodType<Prisma.ColumnUpsertWithoutColumnReferenceSetInput> = z.object({
  update: z.union([ z.lazy(() => ColumnUpdateWithoutColumnReferenceSetInputSchema),z.lazy(() => ColumnUncheckedUpdateWithoutColumnReferenceSetInputSchema) ]),
  create: z.union([ z.lazy(() => ColumnCreateWithoutColumnReferenceSetInputSchema),z.lazy(() => ColumnUncheckedCreateWithoutColumnReferenceSetInputSchema) ]),
  where: z.lazy(() => ColumnWhereInputSchema).optional()
}).strict();

export const ColumnUpdateToOneWithWhereWithoutColumnReferenceSetInputSchema: z.ZodType<Prisma.ColumnUpdateToOneWithWhereWithoutColumnReferenceSetInput> = z.object({
  where: z.lazy(() => ColumnWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => ColumnUpdateWithoutColumnReferenceSetInputSchema),z.lazy(() => ColumnUncheckedUpdateWithoutColumnReferenceSetInputSchema) ]),
}).strict();

export const ColumnUpdateWithoutColumnReferenceSetInputSchema: z.ZodType<Prisma.ColumnUpdateWithoutColumnReferenceSetInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  n: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  DataTable: z.lazy(() => DataTableUpdateOneRequiredWithoutColumnNestedInputSchema).optional()
}).strict();

export const ColumnUncheckedUpdateWithoutColumnReferenceSetInputSchema: z.ZodType<Prisma.ColumnUncheckedUpdateWithoutColumnReferenceSetInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  n: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  table_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ColumnReferenceUpsertWithWhereUniqueWithoutColumnReferenceSetInputSchema: z.ZodType<Prisma.ColumnReferenceUpsertWithWhereUniqueWithoutColumnReferenceSetInput> = z.object({
  where: z.lazy(() => ColumnReferenceWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ColumnReferenceUpdateWithoutColumnReferenceSetInputSchema),z.lazy(() => ColumnReferenceUncheckedUpdateWithoutColumnReferenceSetInputSchema) ]),
  create: z.union([ z.lazy(() => ColumnReferenceCreateWithoutColumnReferenceSetInputSchema),z.lazy(() => ColumnReferenceUncheckedCreateWithoutColumnReferenceSetInputSchema) ]),
}).strict();

export const ColumnReferenceUpdateWithWhereUniqueWithoutColumnReferenceSetInputSchema: z.ZodType<Prisma.ColumnReferenceUpdateWithWhereUniqueWithoutColumnReferenceSetInput> = z.object({
  where: z.lazy(() => ColumnReferenceWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ColumnReferenceUpdateWithoutColumnReferenceSetInputSchema),z.lazy(() => ColumnReferenceUncheckedUpdateWithoutColumnReferenceSetInputSchema) ]),
}).strict();

export const ColumnReferenceUpdateManyWithWhereWithoutColumnReferenceSetInputSchema: z.ZodType<Prisma.ColumnReferenceUpdateManyWithWhereWithoutColumnReferenceSetInput> = z.object({
  where: z.lazy(() => ColumnReferenceScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ColumnReferenceUpdateManyMutationInputSchema),z.lazy(() => ColumnReferenceUncheckedUpdateManyWithoutColumnReferenceSetInputSchema) ]),
}).strict();

export const ColumnReferenceScalarWhereInputSchema: z.ZodType<Prisma.ColumnReferenceScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ColumnReferenceScalarWhereInputSchema),z.lazy(() => ColumnReferenceScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ColumnReferenceScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ColumnReferenceScalarWhereInputSchema),z.lazy(() => ColumnReferenceScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  n: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  reference_set_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const ColumnCreateWithoutDataTableInputSchema: z.ZodType<Prisma.ColumnCreateWithoutDataTableInput> = z.object({
  id: z.string(),
  n: z.string(),
  ColumnReferenceSet: z.lazy(() => ColumnReferenceSetCreateNestedOneWithoutColumnInputSchema)
}).strict();

export const ColumnUncheckedCreateWithoutDataTableInputSchema: z.ZodType<Prisma.ColumnUncheckedCreateWithoutDataTableInput> = z.object({
  id: z.string(),
  n: z.string(),
  reference_set_id: z.string()
}).strict();

export const ColumnCreateOrConnectWithoutDataTableInputSchema: z.ZodType<Prisma.ColumnCreateOrConnectWithoutDataTableInput> = z.object({
  where: z.lazy(() => ColumnWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ColumnCreateWithoutDataTableInputSchema),z.lazy(() => ColumnUncheckedCreateWithoutDataTableInputSchema) ]),
}).strict();

export const ColumnCreateManyDataTableInputEnvelopeSchema: z.ZodType<Prisma.ColumnCreateManyDataTableInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ColumnCreateManyDataTableInputSchema),z.lazy(() => ColumnCreateManyDataTableInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const ColumnUpsertWithWhereUniqueWithoutDataTableInputSchema: z.ZodType<Prisma.ColumnUpsertWithWhereUniqueWithoutDataTableInput> = z.object({
  where: z.lazy(() => ColumnWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ColumnUpdateWithoutDataTableInputSchema),z.lazy(() => ColumnUncheckedUpdateWithoutDataTableInputSchema) ]),
  create: z.union([ z.lazy(() => ColumnCreateWithoutDataTableInputSchema),z.lazy(() => ColumnUncheckedCreateWithoutDataTableInputSchema) ]),
}).strict();

export const ColumnUpdateWithWhereUniqueWithoutDataTableInputSchema: z.ZodType<Prisma.ColumnUpdateWithWhereUniqueWithoutDataTableInput> = z.object({
  where: z.lazy(() => ColumnWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ColumnUpdateWithoutDataTableInputSchema),z.lazy(() => ColumnUncheckedUpdateWithoutDataTableInputSchema) ]),
}).strict();

export const ColumnUpdateManyWithWhereWithoutDataTableInputSchema: z.ZodType<Prisma.ColumnUpdateManyWithWhereWithoutDataTableInput> = z.object({
  where: z.lazy(() => ColumnScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ColumnUpdateManyMutationInputSchema),z.lazy(() => ColumnUncheckedUpdateManyWithoutDataTableInputSchema) ]),
}).strict();

export const ColumnScalarWhereInputSchema: z.ZodType<Prisma.ColumnScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ColumnScalarWhereInputSchema),z.lazy(() => ColumnScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ColumnScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ColumnScalarWhereInputSchema),z.lazy(() => ColumnScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  n: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  reference_set_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  table_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const ColumnReferenceCreateManyColumnReferenceSetInputSchema: z.ZodType<Prisma.ColumnReferenceCreateManyColumnReferenceSetInput> = z.object({
  id: z.string(),
  n: z.string()
}).strict();

export const ColumnReferenceUpdateWithoutColumnReferenceSetInputSchema: z.ZodType<Prisma.ColumnReferenceUpdateWithoutColumnReferenceSetInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  n: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ColumnReferenceUncheckedUpdateWithoutColumnReferenceSetInputSchema: z.ZodType<Prisma.ColumnReferenceUncheckedUpdateWithoutColumnReferenceSetInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  n: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ColumnReferenceUncheckedUpdateManyWithoutColumnReferenceSetInputSchema: z.ZodType<Prisma.ColumnReferenceUncheckedUpdateManyWithoutColumnReferenceSetInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  n: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ColumnCreateManyDataTableInputSchema: z.ZodType<Prisma.ColumnCreateManyDataTableInput> = z.object({
  id: z.string(),
  n: z.string(),
  reference_set_id: z.string()
}).strict();

export const ColumnUpdateWithoutDataTableInputSchema: z.ZodType<Prisma.ColumnUpdateWithoutDataTableInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  n: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ColumnReferenceSet: z.lazy(() => ColumnReferenceSetUpdateOneRequiredWithoutColumnNestedInputSchema).optional()
}).strict();

export const ColumnUncheckedUpdateWithoutDataTableInputSchema: z.ZodType<Prisma.ColumnUncheckedUpdateWithoutDataTableInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  n: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  reference_set_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ColumnUncheckedUpdateManyWithoutDataTableInputSchema: z.ZodType<Prisma.ColumnUncheckedUpdateManyWithoutDataTableInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  n: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  reference_set_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const ColumnFindFirstArgsSchema: z.ZodType<Prisma.ColumnFindFirstArgs> = z.object({
  select: ColumnSelectSchema.optional(),
  include: ColumnIncludeSchema.optional(),
  where: ColumnWhereInputSchema.optional(),
  orderBy: z.union([ ColumnOrderByWithRelationInputSchema.array(),ColumnOrderByWithRelationInputSchema ]).optional(),
  cursor: ColumnWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ColumnScalarFieldEnumSchema,ColumnScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const ColumnFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ColumnFindFirstOrThrowArgs> = z.object({
  select: ColumnSelectSchema.optional(),
  include: ColumnIncludeSchema.optional(),
  where: ColumnWhereInputSchema.optional(),
  orderBy: z.union([ ColumnOrderByWithRelationInputSchema.array(),ColumnOrderByWithRelationInputSchema ]).optional(),
  cursor: ColumnWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ColumnScalarFieldEnumSchema,ColumnScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const ColumnFindManyArgsSchema: z.ZodType<Prisma.ColumnFindManyArgs> = z.object({
  select: ColumnSelectSchema.optional(),
  include: ColumnIncludeSchema.optional(),
  where: ColumnWhereInputSchema.optional(),
  orderBy: z.union([ ColumnOrderByWithRelationInputSchema.array(),ColumnOrderByWithRelationInputSchema ]).optional(),
  cursor: ColumnWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ColumnScalarFieldEnumSchema,ColumnScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const ColumnAggregateArgsSchema: z.ZodType<Prisma.ColumnAggregateArgs> = z.object({
  where: ColumnWhereInputSchema.optional(),
  orderBy: z.union([ ColumnOrderByWithRelationInputSchema.array(),ColumnOrderByWithRelationInputSchema ]).optional(),
  cursor: ColumnWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const ColumnGroupByArgsSchema: z.ZodType<Prisma.ColumnGroupByArgs> = z.object({
  where: ColumnWhereInputSchema.optional(),
  orderBy: z.union([ ColumnOrderByWithAggregationInputSchema.array(),ColumnOrderByWithAggregationInputSchema ]).optional(),
  by: ColumnScalarFieldEnumSchema.array(),
  having: ColumnScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const ColumnFindUniqueArgsSchema: z.ZodType<Prisma.ColumnFindUniqueArgs> = z.object({
  select: ColumnSelectSchema.optional(),
  include: ColumnIncludeSchema.optional(),
  where: ColumnWhereUniqueInputSchema,
}).strict()

export const ColumnFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ColumnFindUniqueOrThrowArgs> = z.object({
  select: ColumnSelectSchema.optional(),
  include: ColumnIncludeSchema.optional(),
  where: ColumnWhereUniqueInputSchema,
}).strict()

export const ColumnReferenceFindFirstArgsSchema: z.ZodType<Prisma.ColumnReferenceFindFirstArgs> = z.object({
  select: ColumnReferenceSelectSchema.optional(),
  include: ColumnReferenceIncludeSchema.optional(),
  where: ColumnReferenceWhereInputSchema.optional(),
  orderBy: z.union([ ColumnReferenceOrderByWithRelationInputSchema.array(),ColumnReferenceOrderByWithRelationInputSchema ]).optional(),
  cursor: ColumnReferenceWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ColumnReferenceScalarFieldEnumSchema,ColumnReferenceScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const ColumnReferenceFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ColumnReferenceFindFirstOrThrowArgs> = z.object({
  select: ColumnReferenceSelectSchema.optional(),
  include: ColumnReferenceIncludeSchema.optional(),
  where: ColumnReferenceWhereInputSchema.optional(),
  orderBy: z.union([ ColumnReferenceOrderByWithRelationInputSchema.array(),ColumnReferenceOrderByWithRelationInputSchema ]).optional(),
  cursor: ColumnReferenceWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ColumnReferenceScalarFieldEnumSchema,ColumnReferenceScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const ColumnReferenceFindManyArgsSchema: z.ZodType<Prisma.ColumnReferenceFindManyArgs> = z.object({
  select: ColumnReferenceSelectSchema.optional(),
  include: ColumnReferenceIncludeSchema.optional(),
  where: ColumnReferenceWhereInputSchema.optional(),
  orderBy: z.union([ ColumnReferenceOrderByWithRelationInputSchema.array(),ColumnReferenceOrderByWithRelationInputSchema ]).optional(),
  cursor: ColumnReferenceWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ColumnReferenceScalarFieldEnumSchema,ColumnReferenceScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const ColumnReferenceAggregateArgsSchema: z.ZodType<Prisma.ColumnReferenceAggregateArgs> = z.object({
  where: ColumnReferenceWhereInputSchema.optional(),
  orderBy: z.union([ ColumnReferenceOrderByWithRelationInputSchema.array(),ColumnReferenceOrderByWithRelationInputSchema ]).optional(),
  cursor: ColumnReferenceWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const ColumnReferenceGroupByArgsSchema: z.ZodType<Prisma.ColumnReferenceGroupByArgs> = z.object({
  where: ColumnReferenceWhereInputSchema.optional(),
  orderBy: z.union([ ColumnReferenceOrderByWithAggregationInputSchema.array(),ColumnReferenceOrderByWithAggregationInputSchema ]).optional(),
  by: ColumnReferenceScalarFieldEnumSchema.array(),
  having: ColumnReferenceScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const ColumnReferenceFindUniqueArgsSchema: z.ZodType<Prisma.ColumnReferenceFindUniqueArgs> = z.object({
  select: ColumnReferenceSelectSchema.optional(),
  include: ColumnReferenceIncludeSchema.optional(),
  where: ColumnReferenceWhereUniqueInputSchema,
}).strict()

export const ColumnReferenceFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ColumnReferenceFindUniqueOrThrowArgs> = z.object({
  select: ColumnReferenceSelectSchema.optional(),
  include: ColumnReferenceIncludeSchema.optional(),
  where: ColumnReferenceWhereUniqueInputSchema,
}).strict()

export const ColumnReferenceSetFindFirstArgsSchema: z.ZodType<Prisma.ColumnReferenceSetFindFirstArgs> = z.object({
  select: ColumnReferenceSetSelectSchema.optional(),
  include: ColumnReferenceSetIncludeSchema.optional(),
  where: ColumnReferenceSetWhereInputSchema.optional(),
  orderBy: z.union([ ColumnReferenceSetOrderByWithRelationInputSchema.array(),ColumnReferenceSetOrderByWithRelationInputSchema ]).optional(),
  cursor: ColumnReferenceSetWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ColumnReferenceSetScalarFieldEnumSchema,ColumnReferenceSetScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const ColumnReferenceSetFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ColumnReferenceSetFindFirstOrThrowArgs> = z.object({
  select: ColumnReferenceSetSelectSchema.optional(),
  include: ColumnReferenceSetIncludeSchema.optional(),
  where: ColumnReferenceSetWhereInputSchema.optional(),
  orderBy: z.union([ ColumnReferenceSetOrderByWithRelationInputSchema.array(),ColumnReferenceSetOrderByWithRelationInputSchema ]).optional(),
  cursor: ColumnReferenceSetWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ColumnReferenceSetScalarFieldEnumSchema,ColumnReferenceSetScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const ColumnReferenceSetFindManyArgsSchema: z.ZodType<Prisma.ColumnReferenceSetFindManyArgs> = z.object({
  select: ColumnReferenceSetSelectSchema.optional(),
  include: ColumnReferenceSetIncludeSchema.optional(),
  where: ColumnReferenceSetWhereInputSchema.optional(),
  orderBy: z.union([ ColumnReferenceSetOrderByWithRelationInputSchema.array(),ColumnReferenceSetOrderByWithRelationInputSchema ]).optional(),
  cursor: ColumnReferenceSetWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ColumnReferenceSetScalarFieldEnumSchema,ColumnReferenceSetScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const ColumnReferenceSetAggregateArgsSchema: z.ZodType<Prisma.ColumnReferenceSetAggregateArgs> = z.object({
  where: ColumnReferenceSetWhereInputSchema.optional(),
  orderBy: z.union([ ColumnReferenceSetOrderByWithRelationInputSchema.array(),ColumnReferenceSetOrderByWithRelationInputSchema ]).optional(),
  cursor: ColumnReferenceSetWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const ColumnReferenceSetGroupByArgsSchema: z.ZodType<Prisma.ColumnReferenceSetGroupByArgs> = z.object({
  where: ColumnReferenceSetWhereInputSchema.optional(),
  orderBy: z.union([ ColumnReferenceSetOrderByWithAggregationInputSchema.array(),ColumnReferenceSetOrderByWithAggregationInputSchema ]).optional(),
  by: ColumnReferenceSetScalarFieldEnumSchema.array(),
  having: ColumnReferenceSetScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const ColumnReferenceSetFindUniqueArgsSchema: z.ZodType<Prisma.ColumnReferenceSetFindUniqueArgs> = z.object({
  select: ColumnReferenceSetSelectSchema.optional(),
  include: ColumnReferenceSetIncludeSchema.optional(),
  where: ColumnReferenceSetWhereUniqueInputSchema,
}).strict()

export const ColumnReferenceSetFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ColumnReferenceSetFindUniqueOrThrowArgs> = z.object({
  select: ColumnReferenceSetSelectSchema.optional(),
  include: ColumnReferenceSetIncludeSchema.optional(),
  where: ColumnReferenceSetWhereUniqueInputSchema,
}).strict()

export const DataTableFindFirstArgsSchema: z.ZodType<Prisma.DataTableFindFirstArgs> = z.object({
  select: DataTableSelectSchema.optional(),
  include: DataTableIncludeSchema.optional(),
  where: DataTableWhereInputSchema.optional(),
  orderBy: z.union([ DataTableOrderByWithRelationInputSchema.array(),DataTableOrderByWithRelationInputSchema ]).optional(),
  cursor: DataTableWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ DataTableScalarFieldEnumSchema,DataTableScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const DataTableFindFirstOrThrowArgsSchema: z.ZodType<Prisma.DataTableFindFirstOrThrowArgs> = z.object({
  select: DataTableSelectSchema.optional(),
  include: DataTableIncludeSchema.optional(),
  where: DataTableWhereInputSchema.optional(),
  orderBy: z.union([ DataTableOrderByWithRelationInputSchema.array(),DataTableOrderByWithRelationInputSchema ]).optional(),
  cursor: DataTableWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ DataTableScalarFieldEnumSchema,DataTableScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const DataTableFindManyArgsSchema: z.ZodType<Prisma.DataTableFindManyArgs> = z.object({
  select: DataTableSelectSchema.optional(),
  include: DataTableIncludeSchema.optional(),
  where: DataTableWhereInputSchema.optional(),
  orderBy: z.union([ DataTableOrderByWithRelationInputSchema.array(),DataTableOrderByWithRelationInputSchema ]).optional(),
  cursor: DataTableWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ DataTableScalarFieldEnumSchema,DataTableScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const DataTableAggregateArgsSchema: z.ZodType<Prisma.DataTableAggregateArgs> = z.object({
  where: DataTableWhereInputSchema.optional(),
  orderBy: z.union([ DataTableOrderByWithRelationInputSchema.array(),DataTableOrderByWithRelationInputSchema ]).optional(),
  cursor: DataTableWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const DataTableGroupByArgsSchema: z.ZodType<Prisma.DataTableGroupByArgs> = z.object({
  where: DataTableWhereInputSchema.optional(),
  orderBy: z.union([ DataTableOrderByWithAggregationInputSchema.array(),DataTableOrderByWithAggregationInputSchema ]).optional(),
  by: DataTableScalarFieldEnumSchema.array(),
  having: DataTableScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const DataTableFindUniqueArgsSchema: z.ZodType<Prisma.DataTableFindUniqueArgs> = z.object({
  select: DataTableSelectSchema.optional(),
  include: DataTableIncludeSchema.optional(),
  where: DataTableWhereUniqueInputSchema,
}).strict()

export const DataTableFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.DataTableFindUniqueOrThrowArgs> = z.object({
  select: DataTableSelectSchema.optional(),
  include: DataTableIncludeSchema.optional(),
  where: DataTableWhereUniqueInputSchema,
}).strict()

export const ColumnCreateArgsSchema: z.ZodType<Prisma.ColumnCreateArgs> = z.object({
  select: ColumnSelectSchema.optional(),
  include: ColumnIncludeSchema.optional(),
  data: z.union([ ColumnCreateInputSchema,ColumnUncheckedCreateInputSchema ]),
}).strict()

export const ColumnUpsertArgsSchema: z.ZodType<Prisma.ColumnUpsertArgs> = z.object({
  select: ColumnSelectSchema.optional(),
  include: ColumnIncludeSchema.optional(),
  where: ColumnWhereUniqueInputSchema,
  create: z.union([ ColumnCreateInputSchema,ColumnUncheckedCreateInputSchema ]),
  update: z.union([ ColumnUpdateInputSchema,ColumnUncheckedUpdateInputSchema ]),
}).strict()

export const ColumnCreateManyArgsSchema: z.ZodType<Prisma.ColumnCreateManyArgs> = z.object({
  data: z.union([ ColumnCreateManyInputSchema,ColumnCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const ColumnDeleteArgsSchema: z.ZodType<Prisma.ColumnDeleteArgs> = z.object({
  select: ColumnSelectSchema.optional(),
  include: ColumnIncludeSchema.optional(),
  where: ColumnWhereUniqueInputSchema,
}).strict()

export const ColumnUpdateArgsSchema: z.ZodType<Prisma.ColumnUpdateArgs> = z.object({
  select: ColumnSelectSchema.optional(),
  include: ColumnIncludeSchema.optional(),
  data: z.union([ ColumnUpdateInputSchema,ColumnUncheckedUpdateInputSchema ]),
  where: ColumnWhereUniqueInputSchema,
}).strict()

export const ColumnUpdateManyArgsSchema: z.ZodType<Prisma.ColumnUpdateManyArgs> = z.object({
  data: z.union([ ColumnUpdateManyMutationInputSchema,ColumnUncheckedUpdateManyInputSchema ]),
  where: ColumnWhereInputSchema.optional(),
}).strict()

export const ColumnDeleteManyArgsSchema: z.ZodType<Prisma.ColumnDeleteManyArgs> = z.object({
  where: ColumnWhereInputSchema.optional(),
}).strict()

export const ColumnReferenceCreateArgsSchema: z.ZodType<Prisma.ColumnReferenceCreateArgs> = z.object({
  select: ColumnReferenceSelectSchema.optional(),
  include: ColumnReferenceIncludeSchema.optional(),
  data: z.union([ ColumnReferenceCreateInputSchema,ColumnReferenceUncheckedCreateInputSchema ]),
}).strict()

export const ColumnReferenceUpsertArgsSchema: z.ZodType<Prisma.ColumnReferenceUpsertArgs> = z.object({
  select: ColumnReferenceSelectSchema.optional(),
  include: ColumnReferenceIncludeSchema.optional(),
  where: ColumnReferenceWhereUniqueInputSchema,
  create: z.union([ ColumnReferenceCreateInputSchema,ColumnReferenceUncheckedCreateInputSchema ]),
  update: z.union([ ColumnReferenceUpdateInputSchema,ColumnReferenceUncheckedUpdateInputSchema ]),
}).strict()

export const ColumnReferenceCreateManyArgsSchema: z.ZodType<Prisma.ColumnReferenceCreateManyArgs> = z.object({
  data: z.union([ ColumnReferenceCreateManyInputSchema,ColumnReferenceCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const ColumnReferenceDeleteArgsSchema: z.ZodType<Prisma.ColumnReferenceDeleteArgs> = z.object({
  select: ColumnReferenceSelectSchema.optional(),
  include: ColumnReferenceIncludeSchema.optional(),
  where: ColumnReferenceWhereUniqueInputSchema,
}).strict()

export const ColumnReferenceUpdateArgsSchema: z.ZodType<Prisma.ColumnReferenceUpdateArgs> = z.object({
  select: ColumnReferenceSelectSchema.optional(),
  include: ColumnReferenceIncludeSchema.optional(),
  data: z.union([ ColumnReferenceUpdateInputSchema,ColumnReferenceUncheckedUpdateInputSchema ]),
  where: ColumnReferenceWhereUniqueInputSchema,
}).strict()

export const ColumnReferenceUpdateManyArgsSchema: z.ZodType<Prisma.ColumnReferenceUpdateManyArgs> = z.object({
  data: z.union([ ColumnReferenceUpdateManyMutationInputSchema,ColumnReferenceUncheckedUpdateManyInputSchema ]),
  where: ColumnReferenceWhereInputSchema.optional(),
}).strict()

export const ColumnReferenceDeleteManyArgsSchema: z.ZodType<Prisma.ColumnReferenceDeleteManyArgs> = z.object({
  where: ColumnReferenceWhereInputSchema.optional(),
}).strict()

export const ColumnReferenceSetCreateArgsSchema: z.ZodType<Prisma.ColumnReferenceSetCreateArgs> = z.object({
  select: ColumnReferenceSetSelectSchema.optional(),
  include: ColumnReferenceSetIncludeSchema.optional(),
  data: z.union([ ColumnReferenceSetCreateInputSchema,ColumnReferenceSetUncheckedCreateInputSchema ]),
}).strict()

export const ColumnReferenceSetUpsertArgsSchema: z.ZodType<Prisma.ColumnReferenceSetUpsertArgs> = z.object({
  select: ColumnReferenceSetSelectSchema.optional(),
  include: ColumnReferenceSetIncludeSchema.optional(),
  where: ColumnReferenceSetWhereUniqueInputSchema,
  create: z.union([ ColumnReferenceSetCreateInputSchema,ColumnReferenceSetUncheckedCreateInputSchema ]),
  update: z.union([ ColumnReferenceSetUpdateInputSchema,ColumnReferenceSetUncheckedUpdateInputSchema ]),
}).strict()

export const ColumnReferenceSetCreateManyArgsSchema: z.ZodType<Prisma.ColumnReferenceSetCreateManyArgs> = z.object({
  data: z.union([ ColumnReferenceSetCreateManyInputSchema,ColumnReferenceSetCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const ColumnReferenceSetDeleteArgsSchema: z.ZodType<Prisma.ColumnReferenceSetDeleteArgs> = z.object({
  select: ColumnReferenceSetSelectSchema.optional(),
  include: ColumnReferenceSetIncludeSchema.optional(),
  where: ColumnReferenceSetWhereUniqueInputSchema,
}).strict()

export const ColumnReferenceSetUpdateArgsSchema: z.ZodType<Prisma.ColumnReferenceSetUpdateArgs> = z.object({
  select: ColumnReferenceSetSelectSchema.optional(),
  include: ColumnReferenceSetIncludeSchema.optional(),
  data: z.union([ ColumnReferenceSetUpdateInputSchema,ColumnReferenceSetUncheckedUpdateInputSchema ]),
  where: ColumnReferenceSetWhereUniqueInputSchema,
}).strict()

export const ColumnReferenceSetUpdateManyArgsSchema: z.ZodType<Prisma.ColumnReferenceSetUpdateManyArgs> = z.object({
  data: z.union([ ColumnReferenceSetUpdateManyMutationInputSchema,ColumnReferenceSetUncheckedUpdateManyInputSchema ]),
  where: ColumnReferenceSetWhereInputSchema.optional(),
}).strict()

export const ColumnReferenceSetDeleteManyArgsSchema: z.ZodType<Prisma.ColumnReferenceSetDeleteManyArgs> = z.object({
  where: ColumnReferenceSetWhereInputSchema.optional(),
}).strict()

export const DataTableCreateArgsSchema: z.ZodType<Prisma.DataTableCreateArgs> = z.object({
  select: DataTableSelectSchema.optional(),
  include: DataTableIncludeSchema.optional(),
  data: z.union([ DataTableCreateInputSchema,DataTableUncheckedCreateInputSchema ]),
}).strict()

export const DataTableUpsertArgsSchema: z.ZodType<Prisma.DataTableUpsertArgs> = z.object({
  select: DataTableSelectSchema.optional(),
  include: DataTableIncludeSchema.optional(),
  where: DataTableWhereUniqueInputSchema,
  create: z.union([ DataTableCreateInputSchema,DataTableUncheckedCreateInputSchema ]),
  update: z.union([ DataTableUpdateInputSchema,DataTableUncheckedUpdateInputSchema ]),
}).strict()

export const DataTableCreateManyArgsSchema: z.ZodType<Prisma.DataTableCreateManyArgs> = z.object({
  data: z.union([ DataTableCreateManyInputSchema,DataTableCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const DataTableDeleteArgsSchema: z.ZodType<Prisma.DataTableDeleteArgs> = z.object({
  select: DataTableSelectSchema.optional(),
  include: DataTableIncludeSchema.optional(),
  where: DataTableWhereUniqueInputSchema,
}).strict()

export const DataTableUpdateArgsSchema: z.ZodType<Prisma.DataTableUpdateArgs> = z.object({
  select: DataTableSelectSchema.optional(),
  include: DataTableIncludeSchema.optional(),
  data: z.union([ DataTableUpdateInputSchema,DataTableUncheckedUpdateInputSchema ]),
  where: DataTableWhereUniqueInputSchema,
}).strict()

export const DataTableUpdateManyArgsSchema: z.ZodType<Prisma.DataTableUpdateManyArgs> = z.object({
  data: z.union([ DataTableUpdateManyMutationInputSchema,DataTableUncheckedUpdateManyInputSchema ]),
  where: DataTableWhereInputSchema.optional(),
}).strict()

export const DataTableDeleteManyArgsSchema: z.ZodType<Prisma.DataTableDeleteManyArgs> = z.object({
  where: DataTableWhereInputSchema.optional(),
}).strict()

interface ColumnGetPayload extends HKT {
  readonly _A?: boolean | null | undefined | Prisma.ColumnArgs
  readonly type: Prisma.ColumnGetPayload<this['_A']>
}

interface ColumnReferenceGetPayload extends HKT {
  readonly _A?: boolean | null | undefined | Prisma.ColumnReferenceArgs
  readonly type: Prisma.ColumnReferenceGetPayload<this['_A']>
}

interface ColumnReferenceSetGetPayload extends HKT {
  readonly _A?: boolean | null | undefined | Prisma.ColumnReferenceSetArgs
  readonly type: Prisma.ColumnReferenceSetGetPayload<this['_A']>
}

interface DataTableGetPayload extends HKT {
  readonly _A?: boolean | null | undefined | Prisma.DataTableArgs
  readonly type: Prisma.DataTableGetPayload<this['_A']>
}

export const tableSchemas = {
  Column: {
    fields: ["id","n","reference_set_id","table_id"],
    relations: [
      new Relation("DataTable", "table_id", "id", "DataTable", "ColumnToDataTable", "one"),
      new Relation("ColumnReferenceSet", "reference_set_id", "id", "ColumnReferenceSet", "ColumnToColumnReferenceSet", "one"),
    ],
    modelSchema: (ColumnCreateInputSchema as any)
      .partial()
      .or((ColumnUncheckedCreateInputSchema as any).partial()),
    createSchema: ColumnCreateArgsSchema,
    createManySchema: ColumnCreateManyArgsSchema,
    findUniqueSchema: ColumnFindUniqueArgsSchema,
    findSchema: ColumnFindFirstArgsSchema,
    updateSchema: ColumnUpdateArgsSchema,
    updateManySchema: ColumnUpdateManyArgsSchema,
    upsertSchema: ColumnUpsertArgsSchema,
    deleteSchema: ColumnDeleteArgsSchema,
    deleteManySchema: ColumnDeleteManyArgsSchema
  } as TableSchema<
    z.infer<typeof ColumnCreateInputSchema>,
    Prisma.ColumnCreateArgs['data'],
    Prisma.ColumnUpdateArgs['data'],
    Prisma.ColumnFindFirstArgs['select'],
    Prisma.ColumnFindFirstArgs['where'],
    Prisma.ColumnFindUniqueArgs['where'],
    Omit<Prisma.ColumnInclude, '_count'>,
    Prisma.ColumnFindFirstArgs['orderBy'],
    Prisma.ColumnScalarFieldEnum,
    ColumnGetPayload
  >,
  ColumnReference: {
    fields: ["id","n","reference_set_id"],
    relations: [
      new Relation("ColumnReferenceSet", "reference_set_id", "id", "ColumnReferenceSet", "ColumnReferenceToColumnReferenceSet", "one"),
    ],
    modelSchema: (ColumnReferenceCreateInputSchema as any)
      .partial()
      .or((ColumnReferenceUncheckedCreateInputSchema as any).partial()),
    createSchema: ColumnReferenceCreateArgsSchema,
    createManySchema: ColumnReferenceCreateManyArgsSchema,
    findUniqueSchema: ColumnReferenceFindUniqueArgsSchema,
    findSchema: ColumnReferenceFindFirstArgsSchema,
    updateSchema: ColumnReferenceUpdateArgsSchema,
    updateManySchema: ColumnReferenceUpdateManyArgsSchema,
    upsertSchema: ColumnReferenceUpsertArgsSchema,
    deleteSchema: ColumnReferenceDeleteArgsSchema,
    deleteManySchema: ColumnReferenceDeleteManyArgsSchema
  } as TableSchema<
    z.infer<typeof ColumnReferenceCreateInputSchema>,
    Prisma.ColumnReferenceCreateArgs['data'],
    Prisma.ColumnReferenceUpdateArgs['data'],
    Prisma.ColumnReferenceFindFirstArgs['select'],
    Prisma.ColumnReferenceFindFirstArgs['where'],
    Prisma.ColumnReferenceFindUniqueArgs['where'],
    Omit<Prisma.ColumnReferenceInclude, '_count'>,
    Prisma.ColumnReferenceFindFirstArgs['orderBy'],
    Prisma.ColumnReferenceScalarFieldEnum,
    ColumnReferenceGetPayload
  >,
  ColumnReferenceSet: {
    fields: ["id","n"],
    relations: [
      new Relation("Column", "", "", "Column", "ColumnToColumnReferenceSet", "one"),
      new Relation("ColumnReference", "", "", "ColumnReference", "ColumnReferenceToColumnReferenceSet", "many"),
    ],
    modelSchema: (ColumnReferenceSetCreateInputSchema as any)
      .partial()
      .or((ColumnReferenceSetUncheckedCreateInputSchema as any).partial()),
    createSchema: ColumnReferenceSetCreateArgsSchema,
    createManySchema: ColumnReferenceSetCreateManyArgsSchema,
    findUniqueSchema: ColumnReferenceSetFindUniqueArgsSchema,
    findSchema: ColumnReferenceSetFindFirstArgsSchema,
    updateSchema: ColumnReferenceSetUpdateArgsSchema,
    updateManySchema: ColumnReferenceSetUpdateManyArgsSchema,
    upsertSchema: ColumnReferenceSetUpsertArgsSchema,
    deleteSchema: ColumnReferenceSetDeleteArgsSchema,
    deleteManySchema: ColumnReferenceSetDeleteManyArgsSchema
  } as TableSchema<
    z.infer<typeof ColumnReferenceSetCreateInputSchema>,
    Prisma.ColumnReferenceSetCreateArgs['data'],
    Prisma.ColumnReferenceSetUpdateArgs['data'],
    Prisma.ColumnReferenceSetFindFirstArgs['select'],
    Prisma.ColumnReferenceSetFindFirstArgs['where'],
    Prisma.ColumnReferenceSetFindUniqueArgs['where'],
    Omit<Prisma.ColumnReferenceSetInclude, '_count'>,
    Prisma.ColumnReferenceSetFindFirstArgs['orderBy'],
    Prisma.ColumnReferenceSetScalarFieldEnum,
    ColumnReferenceSetGetPayload
  >,
  DataTable: {
    fields: ["id","n"],
    relations: [
      new Relation("Column", "", "", "Column", "ColumnToDataTable", "many"),
    ],
    modelSchema: (DataTableCreateInputSchema as any)
      .partial()
      .or((DataTableUncheckedCreateInputSchema as any).partial()),
    createSchema: DataTableCreateArgsSchema,
    createManySchema: DataTableCreateManyArgsSchema,
    findUniqueSchema: DataTableFindUniqueArgsSchema,
    findSchema: DataTableFindFirstArgsSchema,
    updateSchema: DataTableUpdateArgsSchema,
    updateManySchema: DataTableUpdateManyArgsSchema,
    upsertSchema: DataTableUpsertArgsSchema,
    deleteSchema: DataTableDeleteArgsSchema,
    deleteManySchema: DataTableDeleteManyArgsSchema
  } as TableSchema<
    z.infer<typeof DataTableCreateInputSchema>,
    Prisma.DataTableCreateArgs['data'],
    Prisma.DataTableUpdateArgs['data'],
    Prisma.DataTableFindFirstArgs['select'],
    Prisma.DataTableFindFirstArgs['where'],
    Prisma.DataTableFindUniqueArgs['where'],
    Omit<Prisma.DataTableInclude, '_count'>,
    Prisma.DataTableFindFirstArgs['orderBy'],
    Prisma.DataTableScalarFieldEnum,
    DataTableGetPayload
  >,
}

export const schema = new DbSchema(tableSchemas, migrations)
export type Electric = ElectricClient<typeof schema>
