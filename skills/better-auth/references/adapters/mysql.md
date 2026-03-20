# MySQL

MySQL は広く使われるオープンソースリレーショナルデータベース管理システム（RDBMS）で、Web アプリケーションに適している。Better Auth は Kysely アダプターを通じて MySQL との直接統合を提供する。

## セットアップ

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

## スキーマ管理

Better Auth CLI は設定とプラグインに基づいた自動スキーマ生成とマイグレーションを提供:

```bash
npx auth@latest generate    # スキーマ生成
npx auth@latest migrate     # スキーママイグレーション
```

MySQL では両操作が完全にサポートされている。

## データベース Joins（実験的）

複数テーブルにまたがる関連データフェッチ時のパフォーマンスを改善し、データベースレイテンシに応じて 2-3 倍のパフォーマンス改善を提供。

```typescript
import { betterAuth } from "better-auth";

export const auth = betterAuth({
  experimental: { joins: true },
});
```

Kysely MySQL ダイアレクトは v1.4.0 以降でネイティブに Joins をサポート。この機能を有効にした後、マイグレーションの実行が必要な場合がある。

## 注意点

- MySQL 統合は Kysely アダプターを通じて動作する — Kysely がサポートする任意のデータベースが互換
- パフォーマンス最適化のガイダンスは [パフォーマンス最適化ガイド](/docs/guides/optimizing-for-performance) を参照
- `timezone: "Z"` の設定で一貫したタイムゾーン値を確保することが重要
