# Drizzle ORM Adapter

Drizzle ORM アダプターは Better Auth と Drizzle ORM（MySQL, PostgreSQL, SQLite などをサポートする TypeScript ORM）の統合を提供する。

## Signature / Usage

```bash
npm install @better-auth/drizzle-adapter
```

```typescript
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "./database.ts";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "sqlite", // or "pg" or "mysql"
  }),
  // ... 残りの設定
});
```

スキーマ生成後、Drizzle Kit でマイグレーションを適用:

```bash
npx auth@latest generate
npx drizzle-kit generate
npx drizzle-kit migrate
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `provider` | `"sqlite" \| "pg" \| "mysql"` | — | データベースタイプ |
| `schema` | `object` | — | カスタムテーブルスキーママッピング |
| `usePlural` | `boolean` | `false` | 全テーブル名を自動複数形化 |

## Notes

- **実験的 Joins (v1.4.0+)**: マルチテーブルクエリで 2-3 倍のパフォーマンス改善。

  ```typescript
  export const auth = betterAuth({
    experimental: { joins: true },
  });
  ```

  Drizzle スキーマで `relation()` 関数によるリレーション定義が必要。Joins 機能ではリレーションをアダプタースキーマを通じて明示的に渡す必要がある。

- **テーブル名の変更**:

  ```typescript
  database: drizzleAdapter(db, {
    provider: "sqlite",
    schema: {
      ...schema,
      user: schema.users,
    },
  })
  ```

- **フィールド名の変更**（Drizzle スキーマ内）:

  ```typescript
  email: varchar("email_address", { length: 255 }).notNull().unique()
  ```

- **複数形名の使用**:

  ```typescript
  database: drizzleAdapter(db, {
    usePlural: true,
  })
  ```

- セットアップ前に Drizzle のインストールと設定を確認。追加のガイダンスは [Drizzle ドキュメント](https://orm.drizzle.team/docs/overview/) を参照。
