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
