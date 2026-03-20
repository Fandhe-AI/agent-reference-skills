# Supabase CLI: 検査コマンド

## 概要

`supabase inspect db` コマンド群は、データベースのパフォーマンスや状態を診断するためのツール。リンク済みのリモートプロジェクトに対して実行する。

## supabase inspect db サブコマンド一覧

| サブコマンド | 説明 |
|-------------|------|
| `bloat` | テーブル・インデックスの肥大化を検出 |
| `blocking` | ブロッキングクエリを表示 |
| `calls` | 関数/プロシージャの呼び出し回数 |
| `cache-hit` | キャッシュヒット率を表示 |
| `db-stats` | データベースの統計情報 |
| `index-sizes` | インデックスサイズ |
| `index-usage` | インデックス使用率 |
| `locks` | 現在のロック一覧 |
| `long-running-queries` | 長時間実行中のクエリ |
| `outliers` | 実行時間の外れ値クエリ |
| `replication-slots` | レプリケーションスロット |
| `role-connections` | ロールごとの接続数 |
| `seq-scans` | シーケンシャルスキャンの多いテーブル |
| `table-index-sizes` | テーブルとインデックスのサイズ |
| `table-record-counts` | テーブルのレコード数 |
| `table-sizes` | テーブルサイズ |
| `total-index-size` | インデックスの合計サイズ |
| `total-table-size` | テーブルの合計サイズ |
| `unused-indexes` | 未使用インデックス |
| `vacuum-stats` | VACUUM 統計 |

## 各コマンドの詳細

### bloat — テーブル/インデックスの肥大化

```bash
supabase inspect db bloat
```

UPDATE/DELETE によりテーブルやインデックスに蓄積された無駄な領域を検出する。

#### 出力例

```
 TYPE  │   SCHEMA   │       NAME       │ BLOAT │ WASTE
───────┼────────────┼──────────────────┼───────┼────────
 table │ public     │ users            │ 1.2   │ 45 MB
 index │ public     │ users_email_idx  │ 1.5   │ 12 MB
```

### blocking — ブロッキングクエリ

```bash
supabase inspect db blocking
```

他のクエリをブロックしているクエリを表示する。

#### 出力例

```
 BLOCKED_PID │ BLOCKING_PID │         BLOCKED_QUERY          │        BLOCKING_QUERY
─────────────┼──────────────┼────────────────────────────────┼──────────────────────────
       12345 │        12344 │ UPDATE users SET name = 'test' │ ALTER TABLE users ADD ...
```

### calls — 関数呼び出し回数

```bash
supabase inspect db calls
```

`pg_stat_statements` から関数・クエリの呼び出し回数を表示する。

#### 出力例

```
               QUERY                │ TOTAL CALLS │ TOTAL TIME
────────────────────────────────────┼─────────────┼────────────
 SELECT * FROM users WHERE id = $1  │      150234 │ 45.2s
 INSERT INTO posts (title) VALUES   │       89012 │ 23.1s
```

### db-stats — データベース統計

```bash
supabase inspect db db-stats
```

### cache-hit — キャッシュヒット率

```bash
supabase inspect db cache-hit
```

#### 出力例

```
       NAME       │         RATIO
──────────────────┼────────────────
 index hit rate   │ 0.9985
 table hit rate   │ 0.9972
```

推奨値: 0.99 以上。これ以下の場合は `shared_buffers` の増加を検討。

### index-sizes — インデックスサイズ

```bash
supabase inspect db index-sizes
```

#### 出力例

```
         NAME          │  SIZE
────────────────────────┼────────
 users_pkey             │ 12 MB
 users_email_idx        │ 8 MB
 posts_user_id_idx      │ 45 MB
```

### index-usage — インデックス使用率

```bash
supabase inspect db index-usage
```

#### 出力例

```
       TABLE       │  PERCENT OF TIMES INDEX USED  │  ROWS IN TABLE
────────────────────┼──────────────────────────────┼────────────────
 users              │ 99                            │ 150000
 posts              │ 85                            │ 890000
 logs               │ 12                            │ 5000000
```

### locks — 現在のロック

```bash
supabase inspect db locks
```

アクティブなロックを一覧表示する。

### long-running-queries — 長時間実行クエリ

```bash
supabase inspect db long-running-queries
```

#### 出力例

```
  PID  │ DURATION │         QUERY
───────┼──────────┼──────────────────────────
 12345 │ 00:15:32 │ SELECT * FROM large_table
 12346 │ 00:05:18 │ CREATE INDEX CONCURRENTLY
```

### outliers — 外れ値クエリ

```bash
supabase inspect db outliers
```

実行時間が特に長いクエリを表示する。パフォーマンスチューニングの対象を特定するのに有用。

#### 出力例

```
                    QUERY                     │ TOTAL TIME │  CALLS  │ AVG TIME
──────────────────────────────────────────────┼────────────┼─────────┼──────────
 SELECT * FROM users WHERE email LIKE '%@%'   │ 120.5s     │   5,234 │ 23.04ms
 SELECT u.*, p.* FROM users u JOIN posts p    │  89.2s     │  12,456 │  7.16ms
```

### replication-slots — レプリケーションスロット

```bash
supabase inspect db replication-slots
```

Realtime やロジカルレプリケーション用のスロット状態を表示する。

### role-connections — ロールごとの接続数

```bash
supabase inspect db role-connections
```

#### 出力例

```
    ROLE     │ CONNECTIONS │ MAX CONNECTIONS
─────────────┼─────────────┼────────────────
 postgres     │          5  │            100
 authenticator│         12  │            100
 supabase_admin│         2  │            100
```

### seq-scans — シーケンシャルスキャン

```bash
supabase inspect db seq-scans
```

シーケンシャルスキャンの多いテーブルを表示。インデックス追加の候補を特定。

### table-sizes — テーブルサイズ

```bash
supabase inspect db table-sizes
```

#### 出力例

```
       NAME       │   SIZE
──────────────────┼─────────
 posts             │ 1.2 GB
 users             │ 256 MB
 comments          │ 128 MB
```

### table-record-counts — レコード数

```bash
supabase inspect db table-record-counts
```

### unused-indexes — 未使用インデックス

```bash
supabase inspect db unused-indexes
```

スキャン回数が0のインデックスを表示。不要なインデックスの削除候補。

### vacuum-stats — VACUUM 統計

```bash
supabase inspect db vacuum-stats
```

各テーブルの VACUUM 実行状態を表示する。

#### 出力例

```
       TABLE       │ LAST VACUUM │ LAST AUTOVACUUM │ DEAD ROWS │ LIVE ROWS
────────────────────┼─────────────┼─────────────────┼───────────┼───────────
 users              │ 2024-01-15  │ 2024-01-15      │       120 │    150000
 posts              │ 2024-01-14  │ 2024-01-15      │      5600 │    890000
```

## supabase inspect report

全ての inspect サブコマンドの結果をまとめた総合レポートを生成する。

```bash
supabase inspect report
```

### フラグ

| フラグ | 説明 |
|-------|------|
| `--output-dir <path>` | レポート出力先ディレクトリ |

### 使用例

```bash
# 標準出力にレポート表示
supabase inspect report

# ファイルに出力
supabase inspect report --output-dir ./reports
```

## 共通フラグ

全ての `inspect` コマンドで使用可能。

| フラグ | 説明 |
|-------|------|
| `--linked` | リンク済みプロジェクトに対して実行 |
| `--db-url <url>` | DB 接続URLを直接指定 |
| `--password <password>` | DB パスワード |

## 関連

- [クエリ最適化](../database/query-optimization.md) — インデックス・パフォーマンス
- [パフォーマンス](../platform/performance.md) — プラットフォーム最適化
- [ログ](../telemetry/logs.md) — ログ監視
