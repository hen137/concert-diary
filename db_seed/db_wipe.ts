import fs from "fs/promises";
import { sql } from "kysely";
import { db } from "./database.js";
import { tables } from "./utils/utils.js";
import { exit } from "process";

// delete all tables
for (const table of tables) {
  console.log(`Dropping table ${table}...`);
  await db.schema.dropTable(table).ifExists().cascade().execute();
}

// create tables from sql files

const dir = "./sql/tables";

// execution order:
const sqlFiles = [
  "type_tables.sql",
  "primary_tables.sql",
  "user_tables.sql",
  "event_tables.sql",
  "review_tables.sql",
  "relationship_tables.sql",
];

for (const file of sqlFiles) {
  try {
    console.log(`Reading SQL from ${dir}/${file}...`);
    const sqlText = await fs.readFile(`${dir}/${file}`, "utf-8");
    await sql`${sql.raw(sqlText)}`.execute(db); // bcuz this method is prone to injection attacks, should only be used in dev environments
  } catch (error) {
    console.error(`Error executing ${dir}/${file}:`, error);
    exit(1);
  }
}

db.destroy();
