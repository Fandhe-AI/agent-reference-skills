# Functions

Edge Functions の作成・ローカル実行・デプロイ管理コマンド。

## Edge Function の新規作成

```sh
supabase functions new <function-name>
```

`supabase/functions/<function-name>/index.ts` を生成する。ケバブケース推奨。

## Edge Functions のローカル実行

```sh
supabase functions serve
```

ホットリロード対応。`supabase start` が起動している状態で実行する。

## JWT 検証を無効化してローカル実行（開発時）

```sh
supabase functions serve --no-verify-jwt
```

## 環境変数ファイルを指定してローカル実行

```sh
supabase functions serve --env-file ./supabase/.env.local
```

## デバッグモードでローカル実行

```sh
supabase functions serve --inspect-mode brk
```

## 特定の Edge Function をデプロイ

```sh
supabase functions deploy <function-name>
```

## 全 Edge Functions をデプロイ

```sh
supabase functions deploy
```

## JWT 検証を無効化してデプロイ

```sh
supabase functions deploy <function-name> --no-verify-jwt
```

Webhook 受信など、認証ヘッダーが不要な関数に使用する。

## Import Map を指定してデプロイ

```sh
supabase functions deploy <function-name> --import-map ./supabase/functions/import_map.json
```

## デプロイ済み Edge Functions の一覧表示

```sh
supabase functions list
```

## Edge Function のソースコードをダウンロード

```sh
supabase functions download <function-name>
```

## Edge Function の削除

```sh
supabase functions delete <function-name>
```

> **警告**: リモートの Edge Function が即時削除される。この操作は元に戻せない。

## ローカル実行中の関数へのリクエスト（JWT 検証無効時）

```sh
curl -X POST http://127.0.0.1:54321/functions/v1/<function-name> \
  -H "Content-Type: application/json" \
  -d '{"key": "value"}'
```

## ローカル実行中の関数へのリクエスト（JWT 検証有効時）

```sh
curl -X POST http://127.0.0.1:54321/functions/v1/<function-name> \
  -H "Authorization: Bearer <anon-key>" \
  -H "Content-Type: application/json" \
  -d '{"key": "value"}'
```
