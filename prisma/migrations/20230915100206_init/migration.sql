CREATE TABLE "DataTable" (
    "id" UUID NOT NULL,
    "n" TEXT NOT NULL,

    CONSTRAINT "DataTable_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Column" (
    "id" UUID NOT NULL,
    "n" TEXT NOT NULL,
    "reference_set_id" UUID NOT NULL,
    "table_id" UUID NOT NULL,

    CONSTRAINT "Column_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ColumnReferenceSet" (
    "id" UUID NOT NULL,
    "n" TEXT NOT NULL,

    CONSTRAINT "ColumnReferenceSet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ColumnReference" (
    "id" UUID NOT NULL,
    "n" TEXT NOT NULL,
    "reference_set_id" UUID NOT NULL,

    CONSTRAINT "ColumnReference_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Column_reference_set_id_key" ON "Column"("reference_set_id");

-- AddForeignKey
ALTER TABLE "Column" ADD CONSTRAINT "Column_reference_set_id_fkey" FOREIGN KEY ("reference_set_id") REFERENCES "ColumnReferenceSet"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Column" ADD CONSTRAINT "DataTable_id_fkey" FOREIGN KEY ("table_id") REFERENCES "DataTable"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ColumnReference" ADD CONSTRAINT "ColumnReference_reference_set_id_fkey" FOREIGN KEY ("reference_set_id") REFERENCES "ColumnReferenceSet"("id") ON DELETE CASCADE ON UPDATE CASCADE;
