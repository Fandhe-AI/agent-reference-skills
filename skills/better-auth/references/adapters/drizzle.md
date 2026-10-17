# Drizzle ORM Adapter

Drizzle ORM アダプターは Better Auth と Drizzle ORM（MySQL, PostgreSQL, SQLite などをサポートする TypeScript ORM）の統合を提供する。

## Signature / Usage

```bash
npm install @better-auth/drizzle-adapter
```

```typescript
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "@better-auth/drizzle-adapter";
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
| `schemaName` | `string` | — | PostgreSQL のカスタムスキーマ名前空間（`pgSchema` で生成） |

## Notes

- **Joins (v1.4.0+、1.7 で experimental を外れた)**: マルチテーブルクエリで 2-3 倍のパフォーマンス改善。設定は `advanced.database.joins`（旧 `experimental.joins` は 1.7 で renamed）。

  ```typescript
  export const auth = betterAuth({
    advanced: { database: { joins: true } },
  });
  ```

  Drizzle スキーマで `relation()` 関数によるリレーション定義が必要（`npx auth@latest generate` で生成可）。各リレーションをアダプタースキーマオブジェクトへ明示的に渡す。同一テーブルへ複数の外部キーがある場合、各リレーションペアに一致する `relationName` が必要（CLI が自動生成、旧 CLI のスキーマは再生成するか両側に同名を追加）。`relationName` の接頭辞はテーブル名に従う（`usePlural: true` なら複数形 `tests_userId`、そうでなければ単数形 `test_userId`）。同じ外部キーに単数形と複数形のエイリアス（`user` と `users` など）を併存させない。`usePlural: true` のとき、多対一リレーションのキーは単数形になる（Drizzle スキーマ生成器、1.7 で変更。既定の `usePlural: false` は変更なし。再生成し、旧の複数形キーを読むコードを更新する）。

- **日付カラム**: CLI が生成するスキーマは Drizzle の date mode（PostgreSQL / MySQL は `timestamp()`、SQLite は `integer({ mode: "timestamp_ms" })`）で日付を保存。文字列カラム（`timestamp({ mode: "string" })`、MySQL `datetime({ mode: "string" })`、SQLite `text()`）も動作する。文字列カラムには UTC で書き込む（ISO 8601 `2026-01-16T16:50:54.888Z`、MySQL は `2026-01-16 16:50:54.888`）。タイムゾーンなしの値は UTC として読み取る。PostgreSQL の `timestamp({ mode: "string", withTimezone: true })` は絶対時刻を保存し返却値にオフセットを含む。

- **カスタムスキーマ名前空間（PostgreSQL）**:

  ```typescript
  export const auth = betterAuth({
    database: drizzleAdapter(db, {
      provider: "pg",
      schemaName: "auth",
    }),
  });
  ```

  `npx auth@latest generate` は `pgSchema("auth")` を使うスキーマ（`authSchema.table("user", {...})`）を生成する。`schemaName` は下記 relations-v2 アダプターでも使える。

- **Drizzle Relations v2**: 既定のアダプターは Relations v1。v2 は `@better-auth/drizzle-adapter/relations-v2` を使う。

  ```typescript
  import { drizzleAdapter } from "@better-auth/drizzle-adapter/relations-v2";
  import * as schema from "./auth-schema.ts";

  database: drizzleAdapter(db, { provider: "sqlite", schema })
  ```

  その後 `npx auth@latest generate` で再生成する（v2 への移行でマイグレーションは不要。リレーション定義のみ変わる）。生成された auth リレーションを既存の Drizzle 設定でアプリのリレーションの後にマージ: `drizzle({ client, relations: { ...relations, ...authRelations } })`。`defineRelationsPart` は部分リレーション定義で、完全な `defineRelations` エントリの後に spread する。

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
