# Tokens

個人アクセストークンの一覧・発行・失効

## トークンの一覧表示

デフォルトサブコマンド（`vercel tokens` のみでも同じ）。

```sh
vercel tokens list
```

JSON 形式で出力。

```sh
vercel tokens list --json
```

## トークンの発行

名前を指定して発行。平文の値は一度だけ表示される（スクリプトでは `--json` を付けて `bearerToken` フィールドを読む）。発行には classic personal access token での認証が必要（`vercel login` の OAuth セッションと project スコープのトークンでは発行できない）。

```sh
vercel tokens create "CI deploy"
```

特定プロジェクトに限定したトークンを発行（そのプロジェクトのチームにスコープされたトークンで認証する。`--project` にはプロジェクト ID を渡す）。

```sh
vercel tokens create "Preview deploy bot" --project prj_abc123
```

CI/CD 環境では発行したトークンを `VERCEL_TOKEN` に設定して使用する（`auth.md` 参照）。

## トークンの失効

> **警告**: 失効させたトークンは即座に使用不能になり元に戻せない。事前に `vercel tokens list` で ID を確認する。

```sh
vercel tokens revoke tok_abc123
```
