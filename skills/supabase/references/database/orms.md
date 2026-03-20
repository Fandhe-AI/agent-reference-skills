# ORM 連携

Prisma、Drizzle、postgres.js との連携方法。

## 概要

Supabase は標準 PostgreSQL であるため、任意の ORM やデータベースクライアントを使用できる。接続には Supavisor（接続プーラー）を経由するのが推奨。

## Drizzle ORM

```typescript
// drizzle.config.ts
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/db/schema.ts',
  out: './supabase/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!, // Supavisor Transaction モード
  },
});

// src/db/schema.ts
import { pgTable, bigint, text, boolean, timestamp, uuid } from 'drizzle-orm/pg-core';

export const todos = pgTable('todos', {
  id: bigint('id', { mode: 'number' }).primaryKey().generatedAlwaysAsIdentity(),
  title: text('title').notNull(),
  isComplete: boolean('is_complete').default(false),
  userId: uuid('user_id'),
  insertedAt: timestamp('inserted_at', { withTimezone: true }).defaultNow(),
});

// クエリ
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

const client = postgres(process.env.DATABASE_URL!);
const db = drizzle(client);

const result = await db.select().from(todos).where(eq(todos.isComplete, false));
```

## Prisma

```prisma
// prisma/schema.prisma
datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")    // Supavisor Transaction モード
  directUrl = env("DIRECT_URL")      // マイグレーション用直接接続
}

model Todo {
  id         BigInt   @id @default(autoincrement())
  title      String
  isComplete Boolean  @default(false) @map("is_complete")
  userId     String?  @map("user_id") @db.Uuid
  insertedAt DateTime @default(now()) @map("inserted_at") @db.Timestamptz

  @@map("todos")
}
```

```typescript
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const todos = await prisma.todo.findMany({
  where: { isComplete: false },
});
```

## postgres.js

```typescript
import postgres from 'postgres';

const sql = postgres(process.env.DATABASE_URL!);

const todos = await sql`
  select * from todos where is_complete = false
`;
```

## 接続文字列

```
# Supavisor Transaction モード（ORM 用）
DATABASE_URL=postgresql://postgres.[REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres?pgbouncer=true

# 直接接続（マイグレーション用）
DIRECT_URL=postgresql://postgres:[PASSWORD]@db.[REF].supabase.co:5432/postgres
```

## 注意点

- ORM のマイグレーションには直接接続（`DIRECT_URL`）を使用する
- アプリの実行時は Supavisor（`DATABASE_URL`）を使用する
- Prisma は `directUrl` パラメータでマイグレーション用接続を分離できる
- Supavisor Transaction モードでは Prepared Statement を使わない設定が必要
- supabase-js と ORM の併用は可能（用途に応じて使い分ける）

## 関連

- [./connections.md](./connections.md) — 接続管理
- [./tables.md](./tables.md) — テーブル操作
