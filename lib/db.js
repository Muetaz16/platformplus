import 'dotenv/config';
import postgres from '@prisma/orm-postgres/runtime';
import contractJson from '../src/prisma/contract.json' with { type: 'json' };

/** @type {import('@prisma/orm-postgres/runtime').PostgresRuntime<import('../src/prisma/contract.d.ts').Contract>} */
export const db = postgres({
  contractJson,
  url: process.env.DATABASE_URL,
});
