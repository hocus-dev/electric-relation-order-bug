DO $$ 
DECLARE 
    schema_exists BOOLEAN;
BEGIN
    SELECT EXISTS (
        SELECT 1
        FROM information_schema.schemata
        WHERE schema_name = 'electric'
    ) INTO schema_exists;

    IF schema_exists THEN
        CALL electric.electrify('public."Items"');
    END IF;
END $$;
