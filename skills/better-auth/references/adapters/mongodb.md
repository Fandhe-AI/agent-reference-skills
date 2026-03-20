# MongoDB Adapter

MongoDB アダプターは Better Auth と MongoDB（人気の NoSQL データベース）の統合を提供する。柔軟なスキーマ処理とスケーラブルな認証インフラを MongoDB ベースのアプリケーションに提供。

## インストール

```bash
npm install @better-auth/mongo-adapter
```

## セットアップ

```typescript
import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const client = new MongoClient("mongodb://localhost:27017/database");
const db = client.db();

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    // オプション: client を提供しない場合、データベーストランザクションは有効にならない
    client,
  }),
});
```

## 設定オプション

**mongodbAdapter(db, options)**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `db` | MongoDB Database | Yes | MongoDB データベースインスタンス |
| `options.client` | MongoClient | No | MongoDB クライアントインスタンス — 提供するとトランザクションが有効 |

## 主要機能

**スキーマ管理**: MongoDB ではスキーマ生成やマイグレーションは不要。アダプターがコレクションの作成と管理を自動的に処理する。

**データベース Joins**（実験的、v1.4.0+）: 関連データフェッチのクエリパフォーマンスを改善:

```typescript
export const auth = betterAuth({
  experimental: { joins: true },
});
```

データベースレイテンシに応じて 2-3 倍のパフォーマンス改善が見られる。

## 注意点

- MongoDB はスキーママイグレーションの明示的設定なしで事前設定されている
- データベーストランザクションにはアダプター設定に MongoDB クライアントを渡す必要がある
- パフォーマンス最適化のガイダンスはパフォーマンス最適化ドキュメントを参照
