# MS SQL Server

MS SQL Server は Microsoft のエンタープライズグレードリレーショナルデータベースシステムで、堅牢なセキュリティとスケーラビリティ機能を持つデータストレージ、管理、分析向けに設計されている。Better Auth は Kysely アダプターを通じて MS SQL と統合する。

## セットアップ

```typescript
import { betterAuth } from "better-auth";
import { MssqlDialect } from "kysely";
import * as Tedious from "tedious";
import * as Tarn from "tarn";

const dialect = new MssqlDialect({
  tarn: {
    ...Tarn,
    options: {
      min: 0,
      max: 10,
    },
  },
  tedious: {
    ...Tedious,
    connectionFactory: () =>
      new Tedious.Connection({
        authentication: {
          options: {
            password: "password",
            userName: "username",
          },
          type: "default",
        },
        options: {
          database: "some_db",
          port: 1433,
          trustServerCertificate: true,
        },
        server: "localhost",
      }),
  },
  TYPES: {
    ...Tedious.TYPES,
    DateTime: Tedious.TYPES.DateTime2,
  },
});

export const auth = betterAuth({
  database: {
    dialect,
    type: "mssql",
  },
});
```

## 設定詳細

**接続プール設定:**
- `min: 0` — 最小プール接続数
- `max: 10` — 最大プール接続数
- ポート: 1433（MS SQL デフォルトポート）

**型マッピング:**
DateTime フィールドは適切なタイムスタンプ処理のため `DateTime2` にマップされる。

## スキーマ管理

### マイグレーションサポート

```bash
npx auth@latest migrate     # サポート済み
npx auth@latest generate    # サポート済み
```

Better Auth CLI は設定と有効なプラグインに基づいてデータベーススキーマの生成とマイグレーションを処理する。

## パフォーマンス機能

### データベース Joins（実験的）

特定のエンドポイントで 2-3 倍のパフォーマンス改善:

```typescript
export const auth = betterAuth({
  experimental: { joins: true },
});
```

**利用条件:** Kysely MS SQL ダイアレクト v1.4.0 以降が必要。有効化後のマイグレーション実行が必要な場合がある。

**影響を受けるエンドポイント:**
- `/get-session`
- `/get-full-organization`
- その他のデータフェッチエンドポイント

## 注意点

- 実装は Kysely の MS SQL ダイアレクトに依存。Kysely がサポートする任意のデータベースが Better Auth と互換
- 追加のパフォーマンスガイダンスは「パフォーマンス最適化」ドキュメントを参照
- Kysely の公式ドキュメントで詳細な [MssqlDialect 設定オプション](https://kysely-org.github.io/kysely-apidoc/classes/MssqlDialect.html) を参照
