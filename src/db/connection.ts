// db.ts
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from '@src/db/schema';
import { Pool } from 'pg';

const globalForDb = globalThis as unknown as {
    pool?: Pool;
    db?: ReturnType<typeof drizzle>;
};

export const pool = globalForDb.pool ?? new Pool({
    connectionString: process.env.DATABASE_URL
});

pool.on('error', (err, client) => {
    console.error('Unexpected error on idle client', err)
})

export const db = globalForDb.db ?? drizzle({ client: pool, schema });

if (!globalForDb.pool) globalForDb.pool = pool;
if (!globalForDb.db) globalForDb.db = db;
