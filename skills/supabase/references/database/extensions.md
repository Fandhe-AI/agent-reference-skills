# PostgreSQL Extensions

Supabase で利用可能な主要 PostgreSQL Extensions。

## 概要

Supabase はダッシュボードまたは SQL で PostgreSQL Extensions を有効化できる。各プロジェクトで多数の Extension がプリインストールされている。

## Extension の有効化

```sql
-- Extension の有効化
create extension if not exists "uuid-ossp" with schema extensions;

-- Extension の無効化
drop extension if exists "uuid-ossp";

-- 利用可能な Extension 一覧
select * from pg_available_extensions order by name;
```

## 主要 Extension 一覧

| Extension | 説明 | カテゴリ |
|-----------|------|---------|
| `pgvector` | ベクトル型・類似検索 | AI |
| `pg_graphql` | GraphQL エンジン | API |
| `http` | HTTP リクエスト送信 | ネットワーク |
| `pg_net` | 非同期 HTTP リクエスト | ネットワーク |
| `pg_cron` | ジョブスケジューリング | スケジュール |
| `pgmq` | メッセージキュー | キュー |
| `pg_stat_statements` | クエリ統計 | モニタリング |
| `index_advisor` | インデックス推奨 | パフォーマンス |
| `hypopg` | 仮想インデックス | パフォーマンス |
| `postgis` | 地理空間データ | GIS |
| `pgroonga` | 多言語全文検索 | 検索 |
| `pg_jsonschema` | JSON Schema バリデーション | バリデーション |
| `pgjwt` | JWT 生成・検証 | 認証 |
| `pgsodium` | 暗号化（Vault 基盤） | セキュリティ |
| `pgaudit` | 監査ログ | セキュリティ |
| `uuid-ossp` | UUID 生成 | ユーティリティ |
| `plv8` | JavaScript で関数を記述 | 言語 |
| `postgres_fdw` | 外部データラッパー | 連携 |
| `wrappers` | Supabase 外部データラッパー | 連携 |
| `pgtap` | テストフレームワーク | テスト |
| `plpgsql_check` | PL/pgSQL リンター | 開発 |
| `rum` | RUM インデックス（全文検索用） | インデックス |
| `timescaledb` | 時系列データ | 時系列 |
| `pg_hashids` | hashids 生成 | ユーティリティ |
| `pg_repack` | テーブル再編成 | メンテナンス |
| `pg_plan_filter` | クエリプラン制御 | パフォーマンス |

## 注意点

- Extension は `extensions` スキーマにインストールすることを推奨
- 一部の Extension はスーパーユーザー権限が必要（Supabase が事前インストール）
- Extension のバージョンは PostgreSQL のバージョンに依存する
- `pg_net` と `pg_cron` は Supabase プラットフォーム上でのみ利用可能
- ダッシュボードの Database → Extensions から GUI で管理可能

## 関連

- [./vault.md](./vault.md) — Vault（pgsodium）
- [./full-text-search.md](./full-text-search.md) — 全文検索（pgroonga, rum）
- [./query-optimization.md](./query-optimization.md) — パフォーマンス（pg_stat_statements, index_advisor）
- [../ai/overview.md](../ai/overview.md) — AI（pgvector）
- [../cron-and-queues/cron.md](../cron-and-queues/cron.md) — Cron（pg_cron）
