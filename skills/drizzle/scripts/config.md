---
source: https://orm.drizzle.team/docs/drizzle-config-file
---

# config

Representative `drizzle.config.ts` patterns for Drizzle Kit (`dialect`, `schema`, `out`, `dbCredentials`).

## 最小構成

```ts
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/schema.ts",
  out: "./drizzle",
});
```

## dialect 別の指定

```ts
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql", // または "mysql" / "sqlite" / "turso" / "singlestore" / "gel"
});
```

## マイグレーション出力先（out）のカスタマイズ

```ts
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/schema/*",
  out: "./drizzle",
});
```

## dbCredentials — 接続文字列

```ts
import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  dialect: "postgresql",
  dbCredentials: {
    url: "postgres://user:password@host:port/db",
  }
});
```

## dbCredentials — 接続パラメータ

```ts
import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  dialect: "postgresql",
  dbCredentials: {
    host: "host",
    port: 5432,
    user: "user",
    password: "password",
    database: "dbname",
    ssl: true, // boolean | "require" | "allow" | "prefer" | "verify-full" | node:tls options
  }
});
```

## driver 例外（AWS Data API / PGLite）

```ts
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/schema.ts",
  driver: "aws-data-api",
  dbCredentials: {
    database: "database",
    resourceArn: "resourceArn",
    secretArn: "secretArn",
  },
});
```

```ts
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/schema.ts",
  driver: "pglite",
  dbCredentials: {
    url: "./database/", // または ":memory:"
  },
});
```

## 拡張構成（migrations table / introspect / tablesFilter 等）

```ts
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./drizzle",
  dialect: "postgresql",
  schema: "./src/schema.ts",

  driver: "pglite",
  dbCredentials: {
    url: "./database/",
  },

  extensionsFilters: ["postgis"],
  schemaFilter: "public",
  tablesFilter: "*",

  introspect: {
    casing: "camel",
  },

  migrations: {
    table: "__drizzle_migrations__",
    schema: "drizzle",
  },

  entities: {
    roles: {
      provider: '',
      exclude: [],
      include: []
    }
  },

  breakpoints: true,
  verbose: true,
});
```

## 複数 config ファイルの使い分け

```sh
drizzle-kit generate --config=drizzle-dev.config.ts
drizzle-kit generate --config=drizzle-prod.config.ts
```

## Notes

- `migrations.table` / `migrations.schema` はデフォルト `__drizzle_migrations` / `drizzle`
- `entities.roles` はデフォルト `false`（drizzle-kit はロールを管理しない）。`push` / `pull` 対象に含める場合のみ `true` または詳細オブジェクトを指定する
