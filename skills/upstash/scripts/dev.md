# Dev

QStash / Workflow のローカル開発サーバーとトンネルのコマンド集。

## 開発サーバーの自動起動（JavaScript SDK）

```sh
# .env
QSTASH_DEV=true
```

`@upstash/qstash` / `@upstash/workflow` が `qstash` バイナリを初回に自動ダウンロードして接続する。デフォルトはポート `8080`（`QSTASH_DEV_PORT` で変更）。`NODE_ENV=production` とブラウザ / edge ランタイムでは no-op。開発サーバーは完全にインメモリで、再起動でデータがリセットされる。

## Next.js edge routes での開発サーバー起動

```typescript
// instrumentation.ts
import { registerQStashDev } from "@upstash/qstash/nextjs";

export const register = () => registerQStashDev();
```

edge ランタイムからは開発サーバーを spawn できず到達確認のみ行うため、`instrumentation.ts` で事前に起動する。

## 開発サーバーの手動起動（@upstash/qstash-cli）

```sh
npx @upstash/qstash-cli dev
```

Python / Go など JavaScript SDK 以外から使う場合の手段。起動後、Upstash Console の QStash / Workflow タブで local mode を有効化すると、ローカルサーバーでメッセージやワークフロー実行を監視できる。

## ポートの指定

```sh
# 別ポートで起動
npx @upstash/qstash-cli dev -port=8081

# ログサーバーのポートも指定
npx @upstash/qstash-cli dev -port=8081 -log-port=9000
```

`-port`（env `QSTASH_DEV_PORT`、デフォルト 8080）、`-log-port`（env `QSTASH_DEV_LOG_PORT`、デフォルトは port + 1）、`-quota`（env `QSTASH_DEV_QUOTA`、デフォルト `payg`。`payg` / `pro`）。

## Docker での起動

```sh
docker pull public.ecr.aws/upstash/qstash:latest
docker run -p 8080:8080 public.ecr.aws/upstash/qstash:latest qstash dev
```

## ダウンロードしたバイナリでの起動

```sh
./qstash dev
```

バイナリは https://artifacts.upstash.com/#qstash/versions/ から取得する。

## ローカルサーバー向けの環境変数

```sh
QSTASH_URL="http://127.0.0.1:8080"
QSTASH_TOKEN="<開発サーバーの起動時出力に表示される値>"
QSTASH_CURRENT_SIGNING_KEY="<同上>"
QSTASH_NEXT_SIGNING_KEY="<同上>"
```

手動起動時は、起動時に表示される値（または公式ドキュメントのテストユーザー資格情報）で環境変数を差し替える。

> **警告**: 開発サーバーは Development Server License により開発・テスト専用で、本番環境での使用は認められていない。

## localtunnel によるローカル公開

```sh
npx localtunnel --port 3000
```

`3000` はアプリのポートに置き換える。表示された公開 URL を QStash の宛先に使う。リマインダー画面が出る場合は `Upstash-Forward-bypass-tunnel-reminder` ヘッダーに任意の値を設定する。

## ngrok によるローカル公開

```sh
ngrok config add-authtoken XXX
ngrok http 3000
```

アカウント作成後に authtoken を登録し、アプリのポートへトンネルを張る。`Forwarding` の URL の末尾に API パスを付けて宛先にする。デバッグは http://127.0.0.1:4040 で確認できる。

> **警告**: トンネルはローカルアプリをインターネットへ公開する。開発中のみ使用し、署名検証を有効にしたうえで不要になったら停止すること。

## トンネル経由の QStash 公開リクエスト

```sh
curl -XPOST \
    -H 'Authorization: Bearer XXX' \
    -H "Content-type: application/json" \
    -d '{ "hello": "world" }' \
    'https://qstash.upstash.io/v2/publish/https://<FORWARDING_HOST>/api/webhooks'
```

`XXX` は QStash トークン、`<FORWARDING_HOST>` は ngrok の Forwarding ホストに置き換える。トンネルより開発サーバーの利用が公式の推奨。
