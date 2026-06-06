# Dev Server

Inngest Dev Server（`inngest-cli`）のローカル起動と設定。

## Dev Server の起動（npx）

```sh
npx inngest-cli@latest dev
```

Dev Server UI は `http://localhost:8288` で確認できる。

## Dev Server の起動（npx）— アプリ URL を指定

```sh
npx --ignore-scripts=false inngest-cli@latest dev -u http://localhost:3000/api/inngest
```

## Dev Server の起動（inngest-cli インストール済みの場合）

```sh
inngest dev -u http://localhost:3000/api/inngest
```

## Dev Server の起動（Docker）

```sh
docker run -p 8288:8288 -p 8289:8289 inngest/inngest \
  inngest dev -u http://host.docker.internal:3000/api/inngest
```

## App Auto-discovery を無効化して起動

```sh
npx --ignore-scripts=false inngest-cli@latest dev --no-discovery \
  -u http://localhost:3000/api/inngest
```

## アプリを Dev Server に接続した状態で Next.js 開発サーバーを起動

```sh
INNGEST_DEV=1 npm run dev
```

`INNGEST_DEV=1` を `.env.local` に記載しておくとインライン指定が不要になる。

## SDK のデバッグエンドポイント確認

```sh
curl -s http://localhost:3000/api/inngest | jq
```

## Dev Server の主なオプション

| フラグ | デフォルト | 説明 |
| --- | --- | --- |
| `-u` / `--sdk-url` | `http://localhost:3000/api/inngest` | アプリのサーブ URL（複数指定可） |
| `-p` / `--port` | `8288` | Dev Server のポート番号 |
| `--host` | `http://localhost` | Dev Server のホスト |
| `--no-discovery` | `false` | App Auto-discovery の無効化 |
| `--no-poll` | `false` | ポーリングの無効化 |
| `--config` | — | 設定ファイルのパス |
