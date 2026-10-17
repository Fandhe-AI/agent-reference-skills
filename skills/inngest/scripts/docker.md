# Docker

Docker image・Standalone container・Docker Compose による Dev Server の実行。

## Docker image の取得

```sh
docker pull inngest/inngest
```

`inngest/inngest` イメージは Docker Hub で配布されている。利用可能な版は GitHub releases で確認できる。

## Standalone Docker container での起動

```sh
docker run -p 8288:8288 -p 8289:8289 \
  inngest/inngest \
  inngest dev -u http://host.docker.internal:3000/api/inngest
```

ポート `8288`（Dev Server UI）と `8289`（`connect()` 用）を公開し、`-u` でアプリの `serve()` URL を渡す。例はアプリがホスト上のポート `3000` で動作する前提。`host.docker.internal` はコンテナからホスト上のアプリへ到達するための名前で、Docker ネットワークの都合に応じて別のホスト名に置き換える。UI は `http://localhost:8288` で開く。

## Dev Server のポートを変更した場合

Dev Server を別ポートで動かす場合は、アプリ側で `INNGEST_BASE_URL` を実際のポートに合わせて設定する（デフォルトは `http://localhost:8288`）。

## Docker Compose での構成

```yaml
services:
  app:
    build: ./app
    environment:
      - INNGEST_DEV=1
      - INNGEST_BASE_URL=http://inngest:8288
    ports:
      - '3000:3000'
  inngest:
    image: inngest/inngest
    command: 'inngest dev -u http://app:3000/api/inngest'
    ports:
      - '8288:8288'
      - '8289:8289'
```

`docker-compose.yaml` の例。アプリが `./app` からビルドされ、`/api/inngest` で `serve()` エンドポイントを公開する前提。

- `INNGEST_DEV=1`: SDK を Dev Server へ接続する dev モードにする（署名検証も無効化される）。SDK はデフォルトで本番（Cloud）へ送信する
- `INNGEST_BASE_URL=http://inngest:8288`: SDK に Dev Server の場所を伝える
- `command`: Docker ネットワーク内のアプリ（`app` サービス、ポート `3000`）の場所を Dev Server に伝える
- `ports`: `8288` で UI をホストへ公開し、`8289` は `connect()` 用に公開する

## 出典

- https://www.inngest.com/docs-markdown/local-development/docker （取得日 2026-10-16）
