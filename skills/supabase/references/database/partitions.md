# テーブルパーティション

大規模テーブルのパーティショニング戦略。

## 概要

PostgreSQL のテーブルパーティショニングにより、大規模テーブルを小さなパーティションに分割し、クエリパフォーマンスを向上させる。レンジ、リスト、ハッシュの 3 種類のパーティション方式がある。

## コード例

```sql
-- レンジパーティション（日付ベース）
create table public.logs (
  id bigint generated always as identity,
  created_at timestamptz not null,
  message text
) partition by range (created_at);

create table public.logs_2024_01 partition of public.logs
  for values from ('2024-01-01') to ('2024-02-01');
create table public.logs_2024_02 partition of public.logs
  for values from ('2024-02-01') to ('2024-03-01');

-- リストパーティション（カテゴリベース）
create table public.events (
  id bigint generated always as identity,
  region text not null,
  data jsonb
) partition by list (region);

create table public.events_us partition of public.events
  for values in ('us-east', 'us-west');
create table public.events_eu partition of public.events
  for values in ('eu-west', 'eu-central');

-- ハッシュパーティション
create table public.records (
  id bigint generated always as identity,
  data text
) partition by hash (id);

create table public.records_0 partition of public.records
  for values with (modulus 4, remainder 0);
create table public.records_1 partition of public.records
  for values with (modulus 4, remainder 1);
```

## パーティション方式の選択

| 方式 | ユースケース |
|------|-------------|
| Range | 時系列データ、日付ベースのアーカイブ |
| List | カテゴリ、リージョン、テナント |
| Hash | 均等分散が必要な場合 |

## 注意点

- パーティションキーは主キーに含める必要がある
- `pg_partman` Extension で自動パーティション管理が可能
- Data API はパーティションテーブルを通常のテーブルと同様に扱える
- パーティション数が多すぎるとプランニング時間が増加する
- デフォルトパーティションの作成を推奨（未分類データのキャッチ用）

## 関連

- [./tables.md](./tables.md) — テーブル操作
- [./extensions.md](./extensions.md) — pg_partman Extension
- [./query-optimization.md](./query-optimization.md) — パフォーマンス
