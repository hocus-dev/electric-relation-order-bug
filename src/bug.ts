import Database from "better-sqlite3";
import { uuidv7 } from "uuidv7";
import jwt from "jsonwebtoken";
import { electrify } from "electric-sql/node";
import { schema as sqliteSchema } from "./generated/client"

const main = async () => {
    console.log("Welcome to bug repro")
    const conn = new Database(
        `/tmp/${uuidv7()}.sqlite`,
    );
    conn.pragma("journal_mode = WAL");
    const electric = await electrify(conn, sqliteSchema, {
        auth: {
            token: jwt.sign(
                { user_id: "1337", iat: 1694879837, exp: 9694879837 },
                "11111111111111111111111111111111",
            ),
        },
        debug: true,
        url: "ws://localhost:5133",
    });

    const shape = await electric.db.DataTable.sync({ include: { Column: { include: { ColumnReferenceSet: { include: { ColumnReference: true } } } } } })
    await shape.synced;
}

void main();
export const a = 2;
