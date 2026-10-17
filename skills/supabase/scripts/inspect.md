# Inspect

リモートデータベースのパフォーマンス診断・検査コマンド。リンク済みプロジェクトに対して実行する。対象 CLI v2.121.0。

## 総合診断レポートの生成

```sh
supabase inspect report
```

## 診断レポートをディレクトリに出力

```sh
supabase inspect report --output-dir ./reports
```

## テーブル/インデックスの肥大化を検出

```sh
supabase inspect db bloat
```

## ブロッキングクエリの表示

```sh
supabase inspect db blocking
```

## 長時間実行中のクエリを表示

```sh
supabase inspect db long-running-queries
```

## 実行時間の外れ値クエリを表示

```sh
supabase inspect db outliers
```

## データベース統計（キャッシュヒット率・合計サイズ・WAL サイズ）の確認

```sh
supabase inspect db db-stats
```

旧 `inspect db cache-hit` の後継。

## インデックス統計（合計サイズ・使用率・スキャン回数・未使用判定）の確認

```sh
supabase inspect db index-stats
```

旧 `inspect db index-usage` / `unused-indexes` / `seq-scans` / `index-sizes` の後継。

## テーブル統計（テーブルサイズ・インデックスサイズ・推定行数）の確認

```sh
supabase inspect db table-stats
```

旧 `inspect db table-sizes` / `table-record-counts` の後継。

## ロール統計の確認

```sh
supabase inspect db role-stats
```

旧 `inspect db role-connections` の後継。

## テーブルの読み書き比率（トラフィックプロファイル）の確認

```sh
supabase inspect db traffic-profile
```

ブロック I/O に基づき各テーブルを Read-Heavy / Write-Heavy / Balanced / Read-Only / Write-Only に分類する。公式 docs では両方の活動があったテーブルのみ表示とあるが、同じ出力例に Read-Only / Write-Only の行も含まれる（上流 docs の記述が矛盾。v2.121.0 時点）。

## VACUUM 統計の確認

```sh
supabase inspect db vacuum-stats
```

## アクティブなロックの確認

```sh
supabase inspect db locks
```

## レプリケーションスロットの確認

```sh
supabase inspect db replication-slots
```

## クエリ呼び出し回数の確認

```sh
supabase inspect db calls
```

## 非推奨コマンド（旧名）

> **注記**: 以下は CLI v2.121.0 で deprecated。新コマンドへ置き換えること。`table-index-sizes` / `total-table-sizes` / `total-index-size` は CLI ソース上「removed in v3」と記載されている。

```sh
# 非推奨: inspect db db-stats を使う
supabase inspect db cache-hit

# 非推奨: inspect db index-stats を使う
supabase inspect db index-usage
supabase inspect db unused-indexes
supabase inspect db seq-scans
supabase inspect db index-sizes

# 非推奨: inspect db table-stats を使う
supabase inspect db table-sizes
supabase inspect db table-record-counts

# 非推奨: inspect db role-stats を使う
supabase inspect db role-connections
```
