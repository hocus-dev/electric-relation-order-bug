export default [
  {
    "statements": [
      "CREATE TABLE \"DataTable\" (\n  \"id\" TEXT NOT NULL,\n  \"n\" TEXT NOT NULL,\n  CONSTRAINT \"DataTable_pkey\" PRIMARY KEY (\"id\")\n) WITHOUT ROWID;\n",
      "CREATE TABLE \"ColumnReference\" (\n  \"id\" TEXT NOT NULL,\n  \"n\" TEXT NOT NULL,\n  \"reference_set_id\" TEXT NOT NULL,\n  CONSTRAINT \"ColumnReference_reference_set_id_fkey\" FOREIGN KEY (\"reference_set_id\") REFERENCES \"ColumnReferenceSet\" (\"id\") ON DELETE CASCADE ON UPDATE CASCADE,\n  CONSTRAINT \"ColumnReference_pkey\" PRIMARY KEY (\"id\")\n) WITHOUT ROWID;\n",
      "CREATE TABLE \"ColumnReferenceSet\" (\n  \"id\" TEXT NOT NULL,\n  \"n\" TEXT NOT NULL,\n  CONSTRAINT \"ColumnReferenceSet_pkey\" PRIMARY KEY (\"id\")\n) WITHOUT ROWID;\n",
      "CREATE TABLE \"Column\" (\n  \"id\" TEXT NOT NULL,\n  \"n\" TEXT NOT NULL,\n  \"reference_set_id\" TEXT NOT NULL,\n  \"table_id\" TEXT NOT NULL,\n  CONSTRAINT \"Column_reference_set_id_fkey\" FOREIGN KEY (\"reference_set_id\") REFERENCES \"ColumnReferenceSet\" (\"id\") ON DELETE CASCADE ON UPDATE CASCADE,\n  CONSTRAINT \"DataTable_id_fkey\" FOREIGN KEY (\"table_id\") REFERENCES \"DataTable\" (\"id\") ON DELETE CASCADE ON UPDATE CASCADE,\n  CONSTRAINT \"Column_pkey\" PRIMARY KEY (\"id\")\n) WITHOUT ROWID;\n",
      "CREATE UNIQUE INDEX \"Column_reference_set_id_key\" ON \"Column\" (\"reference_set_id\" ASC);\n",
      "\n    -- Toggles for turning the triggers on and off\n    INSERT OR IGNORE INTO _electric_trigger_settings(tablename,flag) VALUES ('main.DataTable', 1);\n    ",
      "\n    /* Triggers for table DataTable */\n  \n    -- ensures primary key is immutable\n    DROP TRIGGER IF EXISTS update_ensure_main_DataTable_primarykey;\n    ",
      "\n    CREATE TRIGGER update_ensure_main_DataTable_primarykey\n      BEFORE UPDATE ON main.DataTable\n    BEGIN\n      SELECT\n        CASE\n          WHEN old.id != new.id THEN\n\t\tRAISE (ABORT, 'cannot change the value of column id as it belongs to the primary key')\n        END;\n    END;\n    ",
      "\n    -- Triggers that add INSERT, UPDATE, DELETE operation to the _opslog table\n    DROP TRIGGER IF EXISTS insert_main_DataTable_into_oplog;\n    ",
      "\n    CREATE TRIGGER insert_main_DataTable_into_oplog\n       AFTER INSERT ON main.DataTable\n       WHEN 1 == (SELECT flag from _electric_trigger_settings WHERE tablename == 'main.DataTable')\n    BEGIN\n      INSERT INTO _electric_oplog (namespace, tablename, optype, primaryKey, newRow, oldRow, timestamp)\n      VALUES ('main', 'DataTable', 'INSERT', json_object('id', new.id), json_object('id', new.id, 'n', new.n), NULL, NULL);\n    END;\n    ",
      "\n    DROP TRIGGER IF EXISTS update_main_DataTable_into_oplog;\n    ",
      "\n    CREATE TRIGGER update_main_DataTable_into_oplog\n       AFTER UPDATE ON main.DataTable\n       WHEN 1 == (SELECT flag from _electric_trigger_settings WHERE tablename == 'main.DataTable')\n    BEGIN\n      INSERT INTO _electric_oplog (namespace, tablename, optype, primaryKey, newRow, oldRow, timestamp)\n      VALUES ('main', 'DataTable', 'UPDATE', json_object('id', new.id), json_object('id', new.id, 'n', new.n), json_object('id', old.id, 'n', old.n), NULL);\n    END;\n    ",
      "\n    DROP TRIGGER IF EXISTS delete_main_DataTable_into_oplog;\n    ",
      "\n    CREATE TRIGGER delete_main_DataTable_into_oplog\n       AFTER DELETE ON main.DataTable\n       WHEN 1 == (SELECT flag from _electric_trigger_settings WHERE tablename == 'main.DataTable')\n    BEGIN\n      INSERT INTO _electric_oplog (namespace, tablename, optype, primaryKey, newRow, oldRow, timestamp)\n      VALUES ('main', 'DataTable', 'DELETE', json_object('id', old.id), NULL, json_object('id', old.id, 'n', old.n), NULL);\n    END;\n    ",
      "\n    -- Toggles for turning the triggers on and off\n    INSERT OR IGNORE INTO _electric_trigger_settings(tablename,flag) VALUES ('main.ColumnReference', 1);\n    ",
      "\n    /* Triggers for table ColumnReference */\n  \n    -- ensures primary key is immutable\n    DROP TRIGGER IF EXISTS update_ensure_main_ColumnReference_primarykey;\n    ",
      "\n    CREATE TRIGGER update_ensure_main_ColumnReference_primarykey\n      BEFORE UPDATE ON main.ColumnReference\n    BEGIN\n      SELECT\n        CASE\n          WHEN old.id != new.id THEN\n\t\tRAISE (ABORT, 'cannot change the value of column id as it belongs to the primary key')\n        END;\n    END;\n    ",
      "\n    -- Triggers that add INSERT, UPDATE, DELETE operation to the _opslog table\n    DROP TRIGGER IF EXISTS insert_main_ColumnReference_into_oplog;\n    ",
      "\n    CREATE TRIGGER insert_main_ColumnReference_into_oplog\n       AFTER INSERT ON main.ColumnReference\n       WHEN 1 == (SELECT flag from _electric_trigger_settings WHERE tablename == 'main.ColumnReference')\n    BEGIN\n      INSERT INTO _electric_oplog (namespace, tablename, optype, primaryKey, newRow, oldRow, timestamp)\n      VALUES ('main', 'ColumnReference', 'INSERT', json_object('id', new.id), json_object('id', new.id, 'n', new.n, 'reference_set_id', new.reference_set_id), NULL, NULL);\n    END;\n    ",
      "\n    DROP TRIGGER IF EXISTS update_main_ColumnReference_into_oplog;\n    ",
      "\n    CREATE TRIGGER update_main_ColumnReference_into_oplog\n       AFTER UPDATE ON main.ColumnReference\n       WHEN 1 == (SELECT flag from _electric_trigger_settings WHERE tablename == 'main.ColumnReference')\n    BEGIN\n      INSERT INTO _electric_oplog (namespace, tablename, optype, primaryKey, newRow, oldRow, timestamp)\n      VALUES ('main', 'ColumnReference', 'UPDATE', json_object('id', new.id), json_object('id', new.id, 'n', new.n, 'reference_set_id', new.reference_set_id), json_object('id', old.id, 'n', old.n, 'reference_set_id', old.reference_set_id), NULL);\n    END;\n    ",
      "\n    DROP TRIGGER IF EXISTS delete_main_ColumnReference_into_oplog;\n    ",
      "\n    CREATE TRIGGER delete_main_ColumnReference_into_oplog\n       AFTER DELETE ON main.ColumnReference\n       WHEN 1 == (SELECT flag from _electric_trigger_settings WHERE tablename == 'main.ColumnReference')\n    BEGIN\n      INSERT INTO _electric_oplog (namespace, tablename, optype, primaryKey, newRow, oldRow, timestamp)\n      VALUES ('main', 'ColumnReference', 'DELETE', json_object('id', old.id), NULL, json_object('id', old.id, 'n', old.n, 'reference_set_id', old.reference_set_id), NULL);\n    END;\n    ",
      "-- Triggers for foreign key compensations\n      DROP TRIGGER IF EXISTS compensation_insert_main_ColumnReference_reference_set_id_into_oplog;",
      "\n      CREATE TRIGGER compensation_insert_main_ColumnReference_reference_set_id_into_oplog\n        AFTER INSERT ON main.ColumnReference\n        WHEN 1 == (SELECT flag from _electric_trigger_settings WHERE tablename == 'main.ColumnReferenceSet') AND\n             1 == (SELECT value from _electric_meta WHERE key == 'compensations')\n      BEGIN\n        INSERT INTO _electric_oplog (namespace, tablename, optype, primaryKey, newRow, oldRow, timestamp)\n        SELECT 'main', 'ColumnReferenceSet', 'UPDATE', json_object('id', id), json_object('id', id), NULL, NULL\n        FROM main.ColumnReferenceSet WHERE id = new.reference_set_id;\n      END;\n      ",
      "DROP TRIGGER IF EXISTS compensation_update_main_ColumnReference_reference_set_id_into_oplog;",
      "\n      CREATE TRIGGER compensation_update_main_ColumnReference_reference_set_id_into_oplog\n         AFTER UPDATE ON main.ColumnReference\n         WHEN 1 == (SELECT flag from _electric_trigger_settings WHERE tablename == 'main.ColumnReferenceSet') AND\n              1 == (SELECT value from _electric_meta WHERE key == 'compensations')\n      BEGIN\n        INSERT INTO _electric_oplog (namespace, tablename, optype, primaryKey, newRow, oldRow, timestamp)\n        SELECT 'main', 'ColumnReferenceSet', 'UPDATE', json_object('id', id), json_object('id', id), NULL, NULL\n        FROM main.ColumnReferenceSet WHERE id = new.reference_set_id;\n      END;\n      ",
      "\n    -- Toggles for turning the triggers on and off\n    INSERT OR IGNORE INTO _electric_trigger_settings(tablename,flag) VALUES ('main.ColumnReferenceSet', 1);\n    ",
      "\n    /* Triggers for table ColumnReferenceSet */\n  \n    -- ensures primary key is immutable\n    DROP TRIGGER IF EXISTS update_ensure_main_ColumnReferenceSet_primarykey;\n    ",
      "\n    CREATE TRIGGER update_ensure_main_ColumnReferenceSet_primarykey\n      BEFORE UPDATE ON main.ColumnReferenceSet\n    BEGIN\n      SELECT\n        CASE\n          WHEN old.id != new.id THEN\n\t\tRAISE (ABORT, 'cannot change the value of column id as it belongs to the primary key')\n        END;\n    END;\n    ",
      "\n    -- Triggers that add INSERT, UPDATE, DELETE operation to the _opslog table\n    DROP TRIGGER IF EXISTS insert_main_ColumnReferenceSet_into_oplog;\n    ",
      "\n    CREATE TRIGGER insert_main_ColumnReferenceSet_into_oplog\n       AFTER INSERT ON main.ColumnReferenceSet\n       WHEN 1 == (SELECT flag from _electric_trigger_settings WHERE tablename == 'main.ColumnReferenceSet')\n    BEGIN\n      INSERT INTO _electric_oplog (namespace, tablename, optype, primaryKey, newRow, oldRow, timestamp)\n      VALUES ('main', 'ColumnReferenceSet', 'INSERT', json_object('id', new.id), json_object('id', new.id, 'n', new.n), NULL, NULL);\n    END;\n    ",
      "\n    DROP TRIGGER IF EXISTS update_main_ColumnReferenceSet_into_oplog;\n    ",
      "\n    CREATE TRIGGER update_main_ColumnReferenceSet_into_oplog\n       AFTER UPDATE ON main.ColumnReferenceSet\n       WHEN 1 == (SELECT flag from _electric_trigger_settings WHERE tablename == 'main.ColumnReferenceSet')\n    BEGIN\n      INSERT INTO _electric_oplog (namespace, tablename, optype, primaryKey, newRow, oldRow, timestamp)\n      VALUES ('main', 'ColumnReferenceSet', 'UPDATE', json_object('id', new.id), json_object('id', new.id, 'n', new.n), json_object('id', old.id, 'n', old.n), NULL);\n    END;\n    ",
      "\n    DROP TRIGGER IF EXISTS delete_main_ColumnReferenceSet_into_oplog;\n    ",
      "\n    CREATE TRIGGER delete_main_ColumnReferenceSet_into_oplog\n       AFTER DELETE ON main.ColumnReferenceSet\n       WHEN 1 == (SELECT flag from _electric_trigger_settings WHERE tablename == 'main.ColumnReferenceSet')\n    BEGIN\n      INSERT INTO _electric_oplog (namespace, tablename, optype, primaryKey, newRow, oldRow, timestamp)\n      VALUES ('main', 'ColumnReferenceSet', 'DELETE', json_object('id', old.id), NULL, json_object('id', old.id, 'n', old.n), NULL);\n    END;\n    ",
      "\n    -- Toggles for turning the triggers on and off\n    INSERT OR IGNORE INTO _electric_trigger_settings(tablename,flag) VALUES ('main.Column', 1);\n    ",
      "\n    /* Triggers for table Column */\n  \n    -- ensures primary key is immutable\n    DROP TRIGGER IF EXISTS update_ensure_main_Column_primarykey;\n    ",
      "\n    CREATE TRIGGER update_ensure_main_Column_primarykey\n      BEFORE UPDATE ON main.Column\n    BEGIN\n      SELECT\n        CASE\n          WHEN old.id != new.id THEN\n\t\tRAISE (ABORT, 'cannot change the value of column id as it belongs to the primary key')\n        END;\n    END;\n    ",
      "\n    -- Triggers that add INSERT, UPDATE, DELETE operation to the _opslog table\n    DROP TRIGGER IF EXISTS insert_main_Column_into_oplog;\n    ",
      "\n    CREATE TRIGGER insert_main_Column_into_oplog\n       AFTER INSERT ON main.Column\n       WHEN 1 == (SELECT flag from _electric_trigger_settings WHERE tablename == 'main.Column')\n    BEGIN\n      INSERT INTO _electric_oplog (namespace, tablename, optype, primaryKey, newRow, oldRow, timestamp)\n      VALUES ('main', 'Column', 'INSERT', json_object('id', new.id), json_object('id', new.id, 'n', new.n, 'reference_set_id', new.reference_set_id, 'table_id', new.table_id), NULL, NULL);\n    END;\n    ",
      "\n    DROP TRIGGER IF EXISTS update_main_Column_into_oplog;\n    ",
      "\n    CREATE TRIGGER update_main_Column_into_oplog\n       AFTER UPDATE ON main.Column\n       WHEN 1 == (SELECT flag from _electric_trigger_settings WHERE tablename == 'main.Column')\n    BEGIN\n      INSERT INTO _electric_oplog (namespace, tablename, optype, primaryKey, newRow, oldRow, timestamp)\n      VALUES ('main', 'Column', 'UPDATE', json_object('id', new.id), json_object('id', new.id, 'n', new.n, 'reference_set_id', new.reference_set_id, 'table_id', new.table_id), json_object('id', old.id, 'n', old.n, 'reference_set_id', old.reference_set_id, 'table_id', old.table_id), NULL);\n    END;\n    ",
      "\n    DROP TRIGGER IF EXISTS delete_main_Column_into_oplog;\n    ",
      "\n    CREATE TRIGGER delete_main_Column_into_oplog\n       AFTER DELETE ON main.Column\n       WHEN 1 == (SELECT flag from _electric_trigger_settings WHERE tablename == 'main.Column')\n    BEGIN\n      INSERT INTO _electric_oplog (namespace, tablename, optype, primaryKey, newRow, oldRow, timestamp)\n      VALUES ('main', 'Column', 'DELETE', json_object('id', old.id), NULL, json_object('id', old.id, 'n', old.n, 'reference_set_id', old.reference_set_id, 'table_id', old.table_id), NULL);\n    END;\n    ",
      "-- Triggers for foreign key compensations\n      DROP TRIGGER IF EXISTS compensation_insert_main_Column_reference_set_id_into_oplog;",
      "\n      CREATE TRIGGER compensation_insert_main_Column_reference_set_id_into_oplog\n        AFTER INSERT ON main.Column\n        WHEN 1 == (SELECT flag from _electric_trigger_settings WHERE tablename == 'main.ColumnReferenceSet') AND\n             1 == (SELECT value from _electric_meta WHERE key == 'compensations')\n      BEGIN\n        INSERT INTO _electric_oplog (namespace, tablename, optype, primaryKey, newRow, oldRow, timestamp)\n        SELECT 'main', 'ColumnReferenceSet', 'UPDATE', json_object('id', id), json_object('id', id), NULL, NULL\n        FROM main.ColumnReferenceSet WHERE id = new.reference_set_id;\n      END;\n      ",
      "DROP TRIGGER IF EXISTS compensation_update_main_Column_reference_set_id_into_oplog;",
      "\n      CREATE TRIGGER compensation_update_main_Column_reference_set_id_into_oplog\n         AFTER UPDATE ON main.Column\n         WHEN 1 == (SELECT flag from _electric_trigger_settings WHERE tablename == 'main.ColumnReferenceSet') AND\n              1 == (SELECT value from _electric_meta WHERE key == 'compensations')\n      BEGIN\n        INSERT INTO _electric_oplog (namespace, tablename, optype, primaryKey, newRow, oldRow, timestamp)\n        SELECT 'main', 'ColumnReferenceSet', 'UPDATE', json_object('id', id), json_object('id', id), NULL, NULL\n        FROM main.ColumnReferenceSet WHERE id = new.reference_set_id;\n      END;\n      ",
      "-- Triggers for foreign key compensations\n      DROP TRIGGER IF EXISTS compensation_insert_main_Column_table_id_into_oplog;",
      "\n      CREATE TRIGGER compensation_insert_main_Column_table_id_into_oplog\n        AFTER INSERT ON main.Column\n        WHEN 1 == (SELECT flag from _electric_trigger_settings WHERE tablename == 'main.DataTable') AND\n             1 == (SELECT value from _electric_meta WHERE key == 'compensations')\n      BEGIN\n        INSERT INTO _electric_oplog (namespace, tablename, optype, primaryKey, newRow, oldRow, timestamp)\n        SELECT 'main', 'DataTable', 'UPDATE', json_object('id', id), json_object('id', id), NULL, NULL\n        FROM main.DataTable WHERE id = new.table_id;\n      END;\n      ",
      "DROP TRIGGER IF EXISTS compensation_update_main_Column_table_id_into_oplog;",
      "\n      CREATE TRIGGER compensation_update_main_Column_table_id_into_oplog\n         AFTER UPDATE ON main.Column\n         WHEN 1 == (SELECT flag from _electric_trigger_settings WHERE tablename == 'main.DataTable') AND\n              1 == (SELECT value from _electric_meta WHERE key == 'compensations')\n      BEGIN\n        INSERT INTO _electric_oplog (namespace, tablename, optype, primaryKey, newRow, oldRow, timestamp)\n        SELECT 'main', 'DataTable', 'UPDATE', json_object('id', id), json_object('id', id), NULL, NULL\n        FROM main.DataTable WHERE id = new.table_id;\n      END;\n      "
    ],
    "version": "20231101120458_499"
  }
]