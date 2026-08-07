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

- **実験的 Joins 機能**: `/get-session` や `/get-full-organization` などのエンドポイントでパフォーマンスを改善し、データベースレイテンシに応じて 2-3 倍のパフォーマンス改善を提供。

  ```typescript
  export const auth = betterAuth({
    experimental: { joins: true },
  });
  ```

  Kysely PostgreSQL ダイアレクトは v1.4.0 以降でこの機能をサポート。有効化後のマイグレーション実行を推奨。

- **非デフォルトスキーマ設定**:
  - オプション 1（推奨）: 接続文字列に `options` パラメーターを追加。

    ```
    postgres://user:password@localhost:5432/database?options=-c search_path=auth
    ```

    URL エンコード版: `?options=-c%20search_path%3Dauth`

  - オプション 2: Pool オプションに `options` を指定。

    ```typescript
    database: new Pool({
      host: "localhost",
      port: 5432,
      user: "postgres",
      password: "password",
      database: "my-db",
      options: "-c search_path=auth",
    })
    ```

  - オプション 3: ユーザーデフォルトスキーマを設定。

    ```sql
    ALTER USER your_user SET search_path TO auth;
    ```

  - カスタムスキーマの前提条件:

    ```sql
    CREATE SCHEMA IF NOT EXISTS auth;
    GRANT ALL PRIVILEGES ON SCHEMA auth TO your_user;
    GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA auth TO your_user;
    ALTER DEFAULT PRIVILEGES IN SCHEMA auth GRANT ALL ON TABLES TO your_user;
    ```

- **動作の仕組み**: Better Auth CLI は設定された `search_path` を自動検出する。マイグレーション時、指定スキーマ内のテーブルのみを検査し、他のスキーマを無視して競合を防止。新しいテーブルはすべて指定スキーマに作成される。
- **トラブルシューティング**: マイグレーション中に「relation does not exist」エラーが出た場合、スキーマが存在しユーザーが適切な権限を持っているか確認する（前提条件を参照）。`SHOW search_path;` で Better Auth が使用するスキーマを検証でき、カスタムスキーマ（例: `auth`）が最初の値として返されるべき。
- PostgreSQL サポートは Kysely アダプター経由で実装される。Kysely がサポートする任意のデータベースが Better Auth と互換。
- パフォーマンス改善については [パフォーマンス最適化ガイド](/docs/guides/optimizing-for-performance) を参照。
