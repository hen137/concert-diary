import type { TableExpressionOrList } from 'kysely';
import type { DB } from '../src/types/database.js';

import { db } from './database.js';

export async function wipe_table(table: TableExpressionOrList<DB, never>) {
    await db.deleteFrom(table).execute();
}

// export async function wipe_db() {

// }