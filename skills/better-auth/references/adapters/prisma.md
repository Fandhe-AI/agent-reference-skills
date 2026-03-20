# Prisma Adapter

Prisma アダプターは Better Auth と Prisma ORM（型安全なクエリビルダーと直感的なデータモデリングインターフェース）の統合を提供する。

## インストール

```bash
npm install @better-auth/prisma-adapter
```

## セットアップ

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

## Prisma 7+ の設定

Prisma バージョン 7 以降では、`schema.prisma` ファイルの `output` パスフィールドが必要。カスタム出力パス（例: `output = "../src/generated/prisma"`）を設定した場合、デフォルトの `@prisma/client` の代わりにカスタムロケーションから Prisma クライアントをインポートする。

## スキーマ生成 & マイグレーション

### スキーマ生成（サポート済み）

```bash
npx auth@latest generate
```

### スキーママイグレーション（非サポート）

Prisma アダプターでは Better Auth CLI によるマイグレーションは非サポート。Prisma 自身のマイグレーションツールを使用する。

## 実験的 Joins 機能

v1.4.0 以降で利用可能。データベース Joins が単一操作で関連データを取得するクエリを最適化し、データベースレイテンシに応じて 2-3 倍のパフォーマンス改善を提供。

```typescript
export const auth = betterAuth({
  experimental: { joins: true },
});
```

**要件:** Prisma スキーマに `@relation` ディレクティブによる必要なリレーションが含まれていること、または `npx auth@latest generate` で再生成する。

## 注意点

- Prisma 7+ ではカスタム出力パスの設定が必要
- マイグレーションは Prisma 自身のツールで行う（Better Auth CLI のマイグレーションは Kysely のみ対応）
- Joins 機能にはリレーション定義が必要
- 公式 Prisma + Better Auth 統合ガイド: https://www.prisma.io/docs/guides/betterauth-nextjs
