# MySQL

MySQL は広く使われるオープンソースリレーショナルデータベース管理システム（RDBMS）で、Web アプリケーションに適している。Better Auth は Kysely アダプターを通じて MySQL との直接統合を提供する。

## Signature / Usage

MySQL がインストール・設定済みであることを確認し、以下のコードで Better Auth に接続:

```typescript
import { betterAuth } from "better-auth";
import { createPool } from "mysql2/promise";

export const auth = betterAuth({
  database: createPool({
    host: "localhost",
    user: "root",
    password: "password",
    database: "database",
    timezone: "Z", // 一貫したタイムゾーン値を確保するために重要
  }),
});
```

MySQL ダイアレクトオプションの詳細は Kysely の [MySQLDialect ドキュメント](https://kysely-org.github.io/kysely-apidoc/classes/MysqlDialect.html) を参照。

## Notes

- **スキーマ管理**: Better Auth CLI は設定とプラグインに基づいた自動スキーマ生成とマイグレーションを提供。MySQL では両操作が完全にサポートされている。

  ```bash
  npx auth@latest generate    # スキーマ生成
  npx auth@latest migrate     # スキーママイグレーション
  ```

- **データベース Joins（1.7 で experimental を外れた）**: 複数テーブルにまたがる関連データフェッチ時のパフォーマンスを改善し、データベースレイテンシに応じて 2-3 倍のパフォーマンス改善を提供。設定は `experimental: { joins: true }` から `advanced: { database: { joins: true } }` へ移った（旧設定は 1.7 で renamed）。

  ```typescript
  import { betterAuth } from "better-auth";

  export const auth = betterAuth({
    advanced: { database: { joins: true } },
  });
  ```

  Kysely MySQL ダイアレクトは v1.4.0 以降でネイティブに Joins をサポート。1.7 のドキュメントでは、旧版にあった migration 警告の Callout は削除されている。

- MySQL 統合は Kysely アダプターを通じて動作する — Kysely がサポートする任意のデータベースが互換。
- `timezone: "Z"` の設定で一貫したタイムゾーン値を確保することが重要。
- パフォーマンス最適化のガイダンスは [パフォーマンス最適化ガイド](../guides/optimizing-for-performance.md) を参照。
