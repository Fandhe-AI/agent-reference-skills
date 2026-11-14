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
- Source: https://www.better-auth.com/docs/adapters/mongo (better-auth v1.7.23 docs)

### Indexes

アダプターは SQL データベースがマイグレーションで得るインデックスを作成する。

- `unique` を付けた全フィールド（`user.email`、`session.token` など）にユニークインデックス。同時リクエストによる同一メールのユーザー重複を防ぐ。
- `index` を付けた全フィールドにインデックス。

ビルドは auth インスタンスがアダプターを作成した時点で開始し、リクエストはビルドを待たない。ユニーク性はビルド完了後に強制される。インデックス名は SQL マイグレーションに準拠（例: `user_email_uidx`、`session_userId_idx`）。任意のユニークフィールドは部分インデックスになり、未設定や `null` の文書が多数あってもよい。プラグインが宣言するテーブルレベルの `indexes` は、そのコレクションへの最初の書き込み前に作成される。スキップされるもの:

- JSON フィールドと配列フィールド。
- 単一フィールドのテーブルインデックスで既にカバーされているフィールド（`unique` フィールドではそのテーブルインデックスもユニークであること）。
- `disableMigrations` のテーブル。

フィールドインデックスを作成できない場合、インデックス名と理由を含むエラーをログに出し、そのインデックスなしでリクエストを処理し続ける。ビルドを成功させるためにデータを変更することはない。主な理由:

- **コレクションに重複値が既にある。** 重複を除くまでそのフィールドのユニーク性は強制されない。それまで起動のたびにビルドが再実行され、コレクション全体をスキャンする。対処:
  1. ログのコレクションとフィールドで、読み取り専用クエリで重複を探す。

     ```ts
     const duplicates = await db
       .collection("user")
       .aggregate([
         { $match: { email: { $ne: null } } },
         { $group: { _id: "$email", ids: { $push: "$_id" }, count: { $sum: 1 } } },
         { $match: { count: { $gt: 1 } } },
       ])
       .toArray();
     ```

  2. 値ごとに残すユーザーを決める。重複は別々のサインアップに属する場合があるため、先に `emailVerified` と紐づくアカウントを確認する。
  3. 削除するユーザーごとに、`userId` がそのユーザー ID の `session` と `account` ドキュメントも削除または移動する。MongoDB は自動では削除しない。
  4. アプリケーションを再起動してインデックスをビルドする。
- **データベースユーザーにインデックス作成権限がない。** `createIndex` アクションを付与するか、同等のインデックスを自分で作成する。アダプターは名前が異なる同等インデックスも受け入れる。
- **同じキーまたは名前で別オプションの既存インデックスがある。** そのインデックスを削除してから再起動する。

ネットワークエラーやレプリカセットの選出後は、後続のリクエストで再試行する。
