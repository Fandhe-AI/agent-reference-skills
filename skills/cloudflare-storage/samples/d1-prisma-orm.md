---
source: https://developers.cloudflare.com/d1/tutorials/d1-and-prisma-orm/
---

# Query D1 using Prisma ORM

Query a D1 binding from a Worker with Prisma Client and the `@prisma/adapter-d1` driver adapter.

```prisma
generator client {
  provider        = "prisma-client-js"
  output          = "../src/generated/prisma"
  previewFeatures = ["driverAdapters"]
}
```

Adapted (not in the official docs): the `datasource` block is what `npx prisma init --datasource-provider sqlite` generates; shown so `prisma migrate diff --to-schema` has a provider; see Notes.

```prisma
datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}
```

```prisma
model User {
  id    Int     @id @default(autoincrement())
  email String  @unique
  name  String?
}
```

```sh
npx wrangler d1 migrations create prisma-demo-db create_user_table
```

```sh
npx prisma migrate diff --from-empty --to-schema ./prisma/schema.prisma --script --output migrations/0001_create_user_table.sql
```

```sh
# For the local database
npx wrangler d1 migrations apply prisma-demo-db --local
```

```sh
npx prisma generate
```

```ts
import { PrismaClient } from './generated/prisma/';
import { PrismaD1 } from '@prisma/adapter-d1';

export interface Env {
	DB: D1Database;
}

export default {
	async fetch(request, env, ctx): Promise<Response> {
		const adapter = new PrismaD1(env.DB);
		const prisma = new PrismaClient({ adapter });

		const users = await prisma.user.findMany();
		const result = JSON.stringify(users);
		return new Response(result);
	},
} satisfies ExportedHandler<Env>;
```

## Notes

- Prisma ORM API itself: see https://www.prisma.io/docs. Prisma Migrate (`migrate dev` / `db push`) does not support D1 in this tutorial; use `wrangler d1 migrations` and `prisma migrate diff` to generate SQL.
- Install `prisma` (dev) plus `@prisma/client` and `@prisma/adapter-d1`; the Wrangler config needs a `d1_databases` binding named `DB` and `nodejs_compat`. The driver adapter feature is Preview in the tutorial.
- Adapted from the official docs: the tutorial runs `npx prisma init --datasource-provider sqlite` (creating `prisma/schema.prisma` with the `datasource db` block and a `.env`) but does not show the block; it is included here so the shown commands are self-contained. The `.env` value is not used at runtime because D1 is reached via the binding; gitignore `.env`.
- Apply migrations to the deployed database with `--remote`.
- Related: [D1 README](../references/d1/README.md), [local-development](../references/d1/local-development.md).
