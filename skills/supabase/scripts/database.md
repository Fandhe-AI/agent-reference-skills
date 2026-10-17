# Database

データベースのマイグレーション・スキーマ管理・検査コマンド。

## マイグレーションファイルの新規作成

```sh
supabase migration new <name>
```

`supabase/migrations/<timestamp>_<name>.sql` を生成する。

## 未適用マイグレーションをローカルに適用

```sh
supabase migration up
```

## マイグレーション一覧の確認（ローカル vs リモート）

```sh
supabase migration list
```

## マイグレーション履歴テーブルからマイグレーションファイルを取得

```sh
supabase migration fetch
```

リモートのマイグレーション履歴テーブルからファイルを取得する（フラグは `supabase migration fetch --help` で確認）。

## マイグレーションのロールバック

```sh
supabase migration down
```

## 複数件のロールバック

```sh
supabase migration down --count 3
```

## マイグレーション履歴の修復

```sh
supabase migration repair --status applied --version <timestamp>
```

## マイグレーションの統合

```sh
supabase migration squash
```

> **警告**: 統合後はロールバックが困難になる。チーム開発では他メンバーと調整の上で実行すること。

## スキーマ差分の表示

```sh
supabase db diff
```

## スキーマ差分をマイグレーションファイルとして保存

```sh
supabase db diff -f <migration-name>
```

## リモートとのスキーマ差分を表示

```sh
supabase db diff --linked
```

## リモートからスキーマをマイグレーションとして取得

```sh
supabase db pull
```

## リモートスキーマを宣言型スキーマのツリーとして取得

> **警告**: pg-delta を有効化していないプロジェクト（legacy `migra` エンジン）では実行しない。`[db.migrations].schema_paths` が書き出したツリーを指すようになり、次回の `db diff` が依存順序を解決できず失敗する。

```sh
supabase db pull --declarative
```

マイグレーションは作成せず、`supabase/schemas`（`experimental.pgdelta.declarative_schema_path` で変更可）のスキーマファイルを置き換える。

## 宣言型スキーマから新規マイグレーションを生成

```sh
supabase db schema declarative sync -f <name> --no-apply
```

宣言型スキーマファイルとマイグレーション履歴を比較して生成する（ライブ DB は読まない）。`--experimental` フラグまたは `config.toml` の `[experimental.pgdelta] enabled = true` が必要。

## 既存 DB から宣言型スキーマを生成

> **警告**: `--overwrite` は確認なしで既存の宣言型スキーマファイルを上書きする。

```sh
supabase db schema declarative generate --linked --overwrite
```

`--experimental` フラグまたは `[experimental.pgdelta] enabled = true` が必要。スクリプトでは対象（`--local` / `--linked` / `--db-url`）を明示する。

## ローカルのマイグレーションをリモートに適用

```sh
supabase db push
```

## リモート適用前の確認（ドライラン）

```sh
supabase db push --dry-run
```

## シードデータも含めてリモートに適用

```sh
supabase db push --include-seed
```

## ローカルデータベースのリセット

```sh
supabase db reset
```

全マイグレーションを最初から再適用し、`seed.sql` を実行する。

## リモートデータベースのスキーマをダンプ

```sh
supabase db dump -f schema.sql
```

## データのみダンプ

```sh
supabase db dump --data-only -f data.sql
```

## データベーススキーマのリント

```sh
supabase db lint
```

## 特定スキーマのリント

```sh
supabase db lint --schema public
```

## エラーのみ表示してリント

```sh
supabase db lint --level error
```
