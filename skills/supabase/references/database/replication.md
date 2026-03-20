# レプリケーション

PostgreSQL 論理レプリケーションの設定と監視。

## 概要

Supabase は PostgreSQL の論理レプリケーション（Logical Replication）をサポートし、他の PostgreSQL データベースやサービスとのデータ同期が可能。パブリケーションとサブスクリプションの仕組みで動作する。

## コード例

```sql
-- パブリケーション作成（送信元）
create publication my_publication for table public.todos;

-- 全テーブルのパブリケーション
create publication my_publication for all tables;

-- フィルタ付きパブリケーション
create publication my_publication for table public.todos
where (is_complete = false);

-- パブリケーション確認
select * from pg_publication;
select * from pg_publication_tables;

-- サブスクリプション作成（受信先）
create subscription my_subscription
connection 'host=... dbname=... user=... password=...'
publication my_publication;

-- レプリケーション状態確認
select * from pg_stat_replication;
select * from pg_stat_subscription;
```

## 注意点

- Supabase の Realtime 機能も内部的に論理レプリケーションを使用している
- `supabase_realtime` パブリケーションは Realtime 用（手動で管理しない）
- レプリケーションスロットの未使用分は WAL の肥大化を招く
- 大量のテーブルのレプリケーションはパフォーマンスに影響する
- Pro プラン以上でリードレプリカが利用可能

## 関連

- [./connections.md](./connections.md) — 接続管理
- [../realtime/postgres-changes.md](../realtime/postgres-changes.md) — Realtime Postgres Changes
