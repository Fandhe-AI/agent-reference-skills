# Inspect

リモートデータベースのパフォーマンス診断・検査コマンド。リンク済みプロジェクトに対して実行する。

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

## キャッシュヒット率の確認

```sh
supabase inspect db cache-hit
```

推奨値は 0.99 以上。

## インデックス使用率の確認

```sh
supabase inspect db index-usage
```

## 未使用インデックスの確認

```sh
supabase inspect db unused-indexes
```

## シーケンシャルスキャンの多いテーブルを確認

```sh
supabase inspect db seq-scans
```

## テーブルサイズの確認

```sh
supabase inspect db table-sizes
```

## インデックスサイズの確認

```sh
supabase inspect db index-sizes
```

## テーブルのレコード数確認

```sh
supabase inspect db table-record-counts
```

## VACUUM 統計の確認

```sh
supabase inspect db vacuum-stats
```

## アクティブなロックの確認

```sh
supabase inspect db locks
```

## ロール別接続数の確認

```sh
supabase inspect db role-connections
```

## データベース統計情報の確認

```sh
supabase inspect db db-stats
```

## レプリケーションスロットの確認

```sh
supabase inspect db replication-slots
```

## クエリ呼び出し回数の確認

```sh
supabase inspect db calls
```
