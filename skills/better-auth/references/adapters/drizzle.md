# Drizzle ORM Adapter

Drizzle ORM アダプターは Better Auth と Drizzle ORM（MySQL, PostgreSQL, SQLite などをサポートする TypeScript ORM）の統合を提供する。

## インストール

```bash
npm install @better-auth/drizzle-adapter
```

## セットアップ

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

## スキーマ生成

Better Auth CLI で必要なデータベーススキーマを生成:

```bash
npx auth@latest generate
```

その後、Drizzle Kit でマイグレーションを適用:

```bash
npx drizzle-kit generate
npx drizzle-kit migrate
```

## 設定オプション

| Option | Type | Description |
|--------|------|-------------|
| `provider` | `"sqlite" \| "pg" \| "mysql"` | データベースタイプ |
| `schema` | `object` | カスタムテーブルスキーママッピング |
| `usePlural` | `boolean` | 全テーブル名を自動複数形化 |

## 高度な機能

### 実験的 Joins (v1.4.0+)

マルチテーブルクエリで 2-3 倍のパフォーマンス改善:

```typescript
export const auth = betterAuth({
  experimental: { joins: true },
});
```

Drizzle スキーマで `relation()` 関数によるリレーション定義が必要。

## カスタマイズ

### テーブル名の変更

```typescript
database: drizzleAdapter(db, {
  provider: "sqlite",
  schema: {
    ...schema,
    user: schema.users,
  },
})
```

### フィールド名の変更

```typescript
// Drizzle スキーマ内
email: varchar("email_address", { length: 255 }).notNull().unique()
```

### 複数形名の使用

```typescript
database: drizzleAdapter(db, {
  usePlural: true,
})
```

## 注意点

- セットアップ前に Drizzle のインストールと設定を確認
- Joins 機能ではリレーションをアダプタースキーマを通じて明示的に渡す必要がある
- データベース Joins はデータベースレイテンシに応じて 2-3 倍のパフォーマンス改善を提供
- 追加のガイダンスは [Drizzle ドキュメント](https://orm.drizzle.team/docs/overview/) を参照
