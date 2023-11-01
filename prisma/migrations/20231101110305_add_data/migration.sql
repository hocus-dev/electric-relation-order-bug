-- Enable UUID generation functions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

INSERT INTO "DataTable" ("id", "n")
SELECT '8736175c-183f-4def-a4e8-3d29c3d1a2d0', 'DataTable'
FROM generate_series(1, 1);

-- Insert dummy data into ColumnReferenceSet
INSERT INTO "ColumnReferenceSet" ("id", "n")
SELECT uuid_generate_v4(), 'ColumnReferenceSet'
FROM generate_series(1, 3);

-- Insert dummy data into ColumnReference
WITH reference_sets AS (
  SELECT "id" FROM "ColumnReferenceSet"
)
INSERT INTO "ColumnReference" ("id", "reference_set_id", "n")
SELECT uuid_generate_v4(), rs."id", 'ColumnReference'
FROM reference_sets rs, generate_series(1, 3);

-- Insert dummy data into Column
WITH reference_sets AS (
  SELECT "id" FROM "ColumnReferenceSet"
)
INSERT INTO "Column" ("id", "reference_set_id", "n", "table_id")
SELECT uuid_generate_v4(), rs."id", 'Column', '8736175c-183f-4def-a4e8-3d29c3d1a2d0'
FROM reference_sets rs;
