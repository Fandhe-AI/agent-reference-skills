# Prisma Adapter

Prisma アダプターは Better Auth と Prisma ORM（型安全なクエリビルダーと直感的なデータモデリングインターフェース）の統合を提供する。

## Signature / Usage

```bash
npm install @better-auth/prisma-adapter
```

```typescript
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "sqlite",
  }),
});
```

## Notes

- **Prisma 7+ の設定**: `schema.prisma` ファイルの `output` パスフィールドが必要。カスタム出力パス（例: `output = "../src/generated/prisma"`）を設定した場合、デフォルトの `@prisma/client` の代わりにカスタムロケーションから Prisma クライアントをインポートする。
- **スキーマ生成**（サポート済み）:

  ```bash
  npx auth@latest generate
  ```

- **スキーママイグレーション（非サポート）**: Prisma アダプターでは Better Auth CLI によるマイグレーションは非サポート。Prisma 自身のマイグレーションツールを使用する。
- **セットアップ構成（1.7 ドキュメント）**: 例は Prisma 7 + PostgreSQL。Prisma 6 以前ではドライバーアダプターは任意で既存の Prisma Client 設定のままでよい。Prisma ORM 8 はクライアント API が異なりアダプター未対応（better-auth/better-auth#9636 で追跡）。`prisma` と `@prisma/client` は npm 上で Prisma 8 RC に解決されるため、以下のとおり Prisma 7 を明示的にインストールする。入門は Prisma v7 の getting-started / PostgreSQL quickstart（`https://www.prisma.io/docs/v7/getting-started`、`https://www.prisma.io/docs/v7/prisma-orm/quickstart/postgresql`）。
  1. Prisma を構成: 新規プロジェクトでは Prisma 7 CLI・Prisma Client・PostgreSQL ドライバーアダプターを先にインストールする。

     ```bash
     npm install -D prisma@7
     npm install @prisma/client@7 @prisma/adapter-pg@7
     ```

     その後 `npx prisma init --datasource-provider postgresql --output ../src/generated/prisma`（`prisma/schema.prisma` / `prisma7.config.ts` / `.env` を作成。Prisma 7.10 より前は設定ファイル名が `prisma.config.ts`。`.env` に `DATABASE_URL`）。既存プロジェクトでは初期化不要。出力パス構成後に `npx prisma generate`。
  2. Prisma client を作成: schema の出力パスから `PrismaClient` を import し PostgreSQL ドライバーアダプターを渡す。

     ```typescript
     import { PrismaPg } from "@prisma/adapter-pg";
     import { PrismaClient } from "../generated/prisma/client";

     const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
     export const prisma = new PrismaClient({ adapter });
     ```

     `PrismaClient` は 1 インスタンスを再利用する（ホットリロードやサーバーレスではフレームワーク固有のライフサイクルパターンが必要な場合あり）。
  3. Better Auth を構成: `prismaAdapter(prisma, { provider: "postgresql" })`。
- スキーマ生成後のマイグレーションは Prisma で: `npx prisma migrate dev --name add-better-auth` → `npx prisma generate`。
- **Joins（v1.4.0 以降、1.7 で experimental を外れた）**: データベース Joins が単一操作で関連データを取得するクエリを最適化し、データベースレイテンシに応じて 2-3 倍のパフォーマンス改善を提供。設定は `advanced.database.joins`（旧 `experimental.joins` は 1.7 で renamed）。

  ```typescript
  export const auth = betterAuth({
    advanced: { database: { joins: true } },
  });
  ```

  要件: Prisma スキーマに `@relation` ディレクティブによる必要なリレーションが含まれていること、または `npx auth@latest generate` で再生成する。

- マイグレーションは Prisma 自身のツールで行う（Better Auth CLI のマイグレーションは Kysely のみ対応）。
- 公式 Prisma + Better Auth 統合ガイド: https://www.prisma.io/docs/guides/betterauth-nextjs
- Source: https://www.better-auth.com/docs/adapters/prisma (better-auth v1.7.23 docs)
