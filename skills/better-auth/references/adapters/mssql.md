# MS SQL Server

MS SQL Server は Microsoft のエンタープライズグレードリレーショナルデータベースシステムで、堅牢なセキュリティとスケーラビリティ機能を持つデータストレージ、管理、分析向けに設計されている。Better Auth は Kysely アダプターを通じて MS SQL と統合する。

## Signature / Usage

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

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `tarn.options.min` | number | — | 接続プールの最小接続数 |
| `tarn.options.max` | number | — | 接続プールの最大接続数 |
| `tedious.connectionFactory().options.port` | number | `1433` | MS SQL デフォルトポート |
| `TYPES.DateTime` | Tedious type | — | `DateTime2` にマップして適切なタイムスタンプ処理を行う |

## Notes

- **スキーマ管理**: `npx auth@latest migrate`（サポート済み）/ `npx auth@latest generate`（サポート済み）。Better Auth CLI は設定と有効なプラグインに基づいてデータベーススキーマの生成とマイグレーションを処理する。
- **データベース Joins（実験的）**: 影響を受けるエンドポイント `/get-session`、`/get-full-organization`、その他のデータフェッチエンドポイントで 2-3 倍のパフォーマンス改善。

  ```typescript
  export const auth = betterAuth({
    experimental: { joins: true },
  });
  ```

  利用条件: Kysely MS SQL ダイアレクト v1.4.0 以降が必要。有効化後のマイグレーション実行が必要な場合がある。
- 実装は Kysely の MS SQL ダイアレクトに依存。Kysely がサポートする任意のデータベースが Better Auth と互換。
- 追加のパフォーマンスガイダンスは「パフォーマンス最適化」ドキュメントを参照。Kysely の公式ドキュメントで詳細な [MssqlDialect 設定オプション](https://kysely-org.github.io/kysely-apidoc/classes/MssqlDialect.html) を参照。
