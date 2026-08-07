# Tokens

個人アクセストークンの一覧・発行・失効

## トークンの一覧表示

デフォルトサブコマンド（`vercel tokens` のみでも同じ）。

```sh
vercel tokens ls
```

JSON 形式で出力。

```sh
vercel tokens ls --format json
```

## トークンの発行

名前を指定して発行。平文の値は一度だけ表示される。

```sh
vercel tokens add "CI deploy"
```

特定プロジェクトに限定したトークンを発行。

```sh
vercel tokens add "Preview deploy bot" --project prj_abc123
```

CI/CD 環境では発行したトークンを `VERCEL_TOKEN` に設定して使用する（`auth.md` 参照）。

## トークンの失効

> **警告**: 失効させたトークンは即座に使用不能になり元に戻せない。事前に `vercel tokens ls` で ID を確認する。

```sh
vercel tokens rm tok_abc123
```
