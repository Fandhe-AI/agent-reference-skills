# PostgreSQL

Better Auth は PostgreSQL（強力なオープンソースリレーショナルデータベース管理システム）と統合する。Kysely PostgreSQL ダイアレクトを通じてデータベース操作を行う。

## Signature / Usage

```typescript
import { betterAuth } from "better-auth";
import { Pool } from "pg";

export const auth = betterAuth({
  database: new Pool({
    connectionString: "postgres://user:password@localhost:5432/database",
  }),
});
```

追加の詳細は Kysely の [PostgresDialect ドキュメント](https://kysely-org.github.io/kysely-apidoc/classes/PostgresDialect.html) を参照。

## Notes

- **スキーマ管理**: Better Auth CLI はスキーマ生成とマイグレーションの両方をサポート。

  ```bash
  npx auth@latest migrate
  npx auth@latest generate
  ```

- **Joins（v1.4.0 以降、1.7 で experimental を外れた）**: `/get-session` や `/get-full-organization` などのエンドポイントでパフォーマンスを改善し、データベースレイテンシに応じて 2-3 倍のパフォーマンス改善を提供。設定は `advanced.database.joins`（旧 `experimental.joins` は 1.7 で renamed）。Kysely PostgreSQL ダイアレクトが標準でサポート。

  ```typescript
  export const auth = betterAuth({
    advanced: { database: { joins: true } },
  });
  ```

- **非デフォルトスキーマ（1.7 ドキュメントの推奨は `database.schemaName`）**: PostgreSQL は既定で `public` スキーマを使う。`database.schemaName` で明示するか、PostgreSQL の `search_path` を設定する。両方ある場合は `database.schemaName` が優先され、他の修飾なしクエリは接続の `search_path` に従う。
  - `database.schemaName`（Kysely ダイアレクトまたは Kysely インスタンス）:

    ```typescript
    export const auth = betterAuth({
      database: {
        dialect: new PostgresDialect({
          pool: new Pool({ connectionString: "postgres://user:password@localhost:5432/database" }),
        }),
        type: "postgres",
        schemaName: "auth",
      },
    });
    // Kysely インスタンスの場合: database: { db, type: "postgres", schemaName: "auth" }
    ```

    スキーマはランタイムクエリと CLI マイグレーションの両方に適用される。`npx auth@latest migrate` は必要時にスキーマを作成し他スキーマの同名テーブルを無視する。`npx auth@latest generate` は生成マイグレーションの先頭で `create schema if not exists "auth";` を出力し、以降はスキーマ修飾名（`"auth"."user"`）を使う。Better Auth が使う PostgreSQL ロールにはスキーマとテーブルの作成権限が必要（なければ事前にスキーマ作成と権限付与）。
  - `search_path`（`pg.Pool` を直接渡す場合、または接続上の全ての修飾なしクエリを同じスキーマにしたい場合）。CLI はスキーマが既に存在することを前提とするため、`migrate` の前に作成し接続ロールへ権限付与する。3 つの指定方法を 1 節にまとめたもの:

    ```typescript
    // Pool options
    database: new Pool({
      connectionString: "postgres://user:password@localhost:5432/database",
      options: "-c search_path=auth",
    })
    // 接続文字列: postgres://user:password@localhost:5432/database?options=-c%20search_path%3Dauth
    ```

    ```sql
    ALTER ROLE your_role IN DATABASE your_database SET search_path TO auth;
    ```

    変更後は再接続し、`SHOW search_path` で有効値を確認する。

- **動作の仕組み**: `search_path` 使用時、Better Auth CLI は設定された `search_path` を検出し、マイグレーションで指定スキーマ内のテーブルのみを検査し、他のスキーマを無視して競合を防止。
- **トラブルシューティング**: マイグレーション中に「relation does not exist」エラーが出た場合、スキーマが存在しロールが適切な権限を持っているか確認する。`SHOW search_path;` で Better Auth が使用するスキーマを検証できる。
- PostgreSQL サポートは Kysely アダプター経由で実装される。Kysely がサポートする任意のデータベースが Better Auth と互換。
- パフォーマンス改善については [パフォーマンス最適化ガイド](../guides/optimizing-for-performance.md) を参照。
