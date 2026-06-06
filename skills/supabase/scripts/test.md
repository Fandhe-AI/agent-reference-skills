# Test

データベーステスト（pgTAP）と Edge Functions テスト（Deno）の実行コマンド。

## pgTAP データベーステストの実行

```sh
supabase test db
```

`supabase/tests/` ディレクトリ内の `.sql` テストファイルを実行する。`supabase start` が起動している状態で実行する。

## テストファイルの新規作成

```sh
supabase test new <test-name>
```

`supabase/tests/<test-name>.sql` にボイラープレートを生成する。

## Edge Functions のユニットテスト実行（Deno）

```sh
deno test supabase/functions/tests/
```

## 特定テストファイルのみ実行

```sh
deno test supabase/functions/tests/<test-file>_test.ts
```

## 環境変数ファイルを指定してテスト実行

```sh
deno test --env=supabase/.env.local supabase/functions/tests/
```

## ネットワークアクセスを許可してテスト実行

```sh
deno test --allow-net supabase/functions/tests/
```

## Edge Functions 統合テスト（ローカルサーバー経由）

```sh
# 事前に以下を起動しておく
supabase start
supabase functions serve --no-verify-jwt

# テスト実行
deno test supabase/functions/tests/
```
