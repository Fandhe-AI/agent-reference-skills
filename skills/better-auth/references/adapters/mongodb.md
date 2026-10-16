# MongoDB Adapter

MongoDB アダプターは Better Auth と MongoDB（人気の NoSQL データベース）の統合を提供する。柔軟なスキーマ処理とスケーラブルな認証インフラを MongoDB ベースのアプリケーションに提供。

## Signature / Usage

```bash
npm install @better-auth/mongo-adapter
```

```typescript
import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const client = new MongoClient("mongodb://localhost:27017/database");
const db = client.db();

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    // オプション: client を提供しない場合、データベーストランザクションは有効にならない
    client,
  }),
});
```

## Options / Props

**mongodbAdapter(db, options)**

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| `db` | MongoDB Database | Yes | MongoDB データベースインスタンス |
| `options.client` | MongoClient | No | MongoDB クライアントインスタンス — 提供するとトランザクションが有効 |

## Notes

- **スキーマ管理**: MongoDB ではスキーマ生成やマイグレーションは不要。アダプターがコレクションの作成と管理を自動的に処理する。MongoDB はスキーママイグレーションの明示的設定なしで事前設定されている。
- **データベース Joins**（v1.4.0+、1.7 で experimental を外れた）: 関連データフェッチのクエリパフォーマンスを改善。データベースレイテンシに応じて 2-3 倍のパフォーマンス改善が見られる。設定は `advanced.database.joins`（旧 `experimental.joins` は 1.7 で renamed）。

  ```typescript
  export const auth = betterAuth({
    advanced: { database: { joins: true } },
  });
  ```

- **レプリカセットまたはシャーディングクラスター**: アダプターに `client` を渡すと既定でトランザクションを使う（レプリカセット / シャーディングクラスター用の接続文字列を使う）。2 つのリクエストが同じドキュメントへ同時に書き込むと MongoDB は片方のトランザクションを書き込み競合で中止しアプリケーションにリトライを要求する。アダプターはそのトランザクションを最大 120 秒リトライするため、高競合下のリクエストは失敗せず時間がかかることがある。上限を下げるには `MongoClient` の `timeoutMS` を設定する（その client の他の全操作にも適用される）。リトライは操作全体を再実行し、`before` database hook とトランザクションを受け取るプラグインコールバックも再実行される。メール送信や他サービス呼び出しはコミット後に 1 回だけ実行される `after` hook で行う。
- **スタンドアロンサーバー**: スタンドアロンの MongoDB サーバーはトランザクションをサポートしない。`client` オプションなしで `db` を渡す: `mongodbAdapter(db)`。トランザクションなしでは、後の書き込みが失敗しても先の書き込みが残る場合がある。レプリカセットやシャーディングクラスターへ移行したら `client` を渡してトランザクションを有効にする。
- パフォーマンス最適化のガイダンスはパフォーマンス最適化ドキュメントを参照。
