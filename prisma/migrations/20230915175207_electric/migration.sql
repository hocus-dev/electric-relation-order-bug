DO $$ 
DECLARE 
    schema_exists BOOLEAN;
BEGIN
    CALL electric.electrify('public."DataTable"');
    CALL electric.electrify('public."ColumnReference"');
    CALL electric.electrify('public."ColumnReferenceSet"');
    CALL electric.electrify('public."Column"');
END $$;
