# Drains

Drains（ログ・トレース・Web Analytics・Speed Insights を外部エンドポイントへ転送）の一覧・作成・更新・一時停止・削除

`vercel login` またはトークンで認証し、現在のチームを使う（別のチームは `--scope`）。サブコマンドなしの `vercel drains` は一覧表示。全サブコマンドが `--json` に対応する。`<drain>` には `list` で表示された drain ID を渡す。

## 一覧

```sh
vercel drains
vercel drains list --scope my-team
```

プロジェクトで絞り込み、JSON 形式で出力（`drains` と `pagination`）。

```sh
vercel drains list --project my-app --json
```

次のページを取得（`pagination.next` のカーソルを `--next` に渡す。最後のページでは `null`）。

```sh
vercel drains list --limit 10 --json
vercel drains list --limit 10 --next your_next_cursor_here --json
```

## 詳細確認

テキスト出力はエンドポイントのホストのみ表示（パスとクエリは `--show-full-url`）。JSON 出力にはクレデンシャルを含みうる完全な URL が入る（署名シークレットは含まれず、配信ヘッダー値はマスクされる）。

```sh
vercel drains inspect drn_example
vercel drains inspect drn_example --json
```

## 作成

カスタム HTTP エンドポイント向けに作成。`--name` / `--type` / `--url` が必須。`--type` は `logs` / `traces` / `analytics` / `speed-insights`、`--encoding` のデフォルトは `json`（`logs` / `analytics` / `speed-insights` は `json` / `ndjson`、`traces` は `json` / `proto`）。

```sh
vercel drains create --name app-logs --type logs --url https://example.com/drain
```

プロジェクト・環境・ソースで絞り込み（`--environment` と `--source` はログのみ）。

```sh
vercel drains create --name production-logs --type logs --url https://example.com/drain --project my-app,my-api --environment production --source lambda
```

トレースの 10% を Protobuf エンコードで OTLP HTTP エンドポイントへ送信。

```sh
vercel drains create --name app-traces --type traces --url https://example.com/v1/traces --encoding proto --sample-rate 10
```

署名シークレット（`x-vercel-signature` ヘッダー用）は `--secret` で渡す。`-` を指定すると stdin から読むため、コマンドライン引数に残さずに済む。配信ヘッダーは `--header "Name: value"`（繰り返し可）。エンドポイントの認証と署名は [securing drains](https://vercel.com/docs/drains/security) を参照。

## 更新

drain ID と変更するオプションを 1 つ以上渡す（`--type` 以外の作成オプションが使える。`--header` / `--project` / `--source` / `--environment` は追加ではなく置き換え）。

```sh
vercel drains update drn_example --url https://example.com/new-drain
vercel drains update drn_example --sample-rate 100
```

全プロジェクトのデータを再び送る（`--project` とは併用不可）。

```sh
vercel drains update drn_example --all
```

## 一時停止・再開

一時停止中に生成されたデータは送信されず、再開しても取り戻せない。`pause` は確認を求めるため、スクリプトや `--json` では `--yes`（`-y`）を付ける。`resume` は確認不要。

```sh
vercel drains pause drn_example
vercel drains resume drn_example
```

```sh
vercel drains pause drn_example --yes --json
```

## 削除

> **警告**: 削除は永続的で、取り消せない。

```sh
vercel drains delete drn_example
```

スクリプトや JSON 出力では `--yes`（`-y`）で確認を省略する。

```sh
vercel drains delete drn_example --yes --json
```

## Notes

- Source: https://vercel.com/docs/cli/drains (fetched 2026-11-14)
- `create` が不明な結果で失敗した場合は、再試行前に `vercel drains list` で既に作成されていないか確認する。
