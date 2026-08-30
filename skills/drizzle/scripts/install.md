---
source: https://orm.drizzle.team/docs/get-started-postgresql
---

# install

> **警告**: 無印 `npm i drizzle-orm` は現行安定版 v0.45.2 がインストールされ、本スキルが記述する `1.0.0-rc.5` 系のコマンド・設定オプションとは一致しない。本スキルの内容に従う場合は必ず `@rc` タグを付けてインストールする。

Package installation commands for `drizzle-orm` / `drizzle-kit` (1.0.0-rc.5) with each PostgreSQL driver.

## node-postgres

```sh
npm i drizzle-orm@rc pg
npm i -D drizzle-kit@rc @types/pg
```

```ts
// Make sure to install the 'pg' package
import { drizzle } from 'drizzle-orm/node-postgres';

const db = drizzle(process.env.DATABASE_URL);

const result = await db.execute('select 1');
```

## postgres.js

```sh
npm i drizzle-orm@rc postgres
npm i -D drizzle-kit@rc
```

```ts
import { drizzle } from 'drizzle-orm/postgres-js';

const db = drizzle(process.env.DATABASE_URL);

const result = await db.execute('select 1');
```

## Neon serverless driver

```sh
npm i drizzle-orm@rc @neondatabase/serverless
npm i -D drizzle-kit@rc
```

```ts
// Make sure to install the '@neondatabase/serverless' package
import { drizzle } from 'drizzle-orm/neon-http';

const db = drizzle(process.env.DATABASE_URL);

const result = await db.execute('select 1');
```

## Vercel Postgres

```sh
npm i drizzle-orm@rc @vercel/postgres
npm i -D drizzle-kit@rc
```

```ts
import { drizzle } from 'drizzle-orm/vercel-postgres';

const db = drizzle();

const result = await db.execute('select 1');
```
