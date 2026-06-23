# CLI Commands

Stripe CLI のよく使うコマンド集。

## 認証

```sh
stripe login
```

ブラウザ経由でアカウントと接続し、制限付き API キーを生成する。キーは `~/.config/stripe/config.toml` に保存される（有効期限 90 日）。

## API キーを指定してログイン

```sh
stripe login --api-key <YOUR_SECRET_KEY>
```

## プロジェクト別ログイン

```sh
stripe login --project-name=<project>
```

## ログアウト

```sh
stripe logout
```

## 全プロジェクトからログアウト

```sh
stripe logout --all
```

## Webhook イベントのローカル転送

```sh
stripe listen --forward-to localhost:4242/webhooks
```

## 特定イベントのみ転送

```sh
stripe listen --events payment_intent.created,customer.created,charge.succeeded --forward-to localhost:4242/webhooks
```

## 登録済みエンドポイントの設定をロードして転送

```sh
stripe listen --load-from-webhooks-api --forward-to localhost:4242
```

## テストイベントのトリガー

```sh
stripe trigger checkout.session.completed
```

## テストイベントのトリガー（パラメーターのオーバーライド）

```sh
stripe trigger payment_intent.succeeded --override payment_intent:amount=9999
```

## API リクエストログのリアルタイム表示

```sh
stripe logs tail
```

## ログフィルタリング（HTTP メソッド）

```sh
stripe logs tail --filter-http-method POST
```

## ログフィルタリング（ステータスコード種別）

```sh
stripe logs tail --filter-status-code-type 4XX
```

## Fixtures ファイルによる一括 API リクエスト

```sh
stripe fixtures ./fixtures.json
```

fixtures.json は複数の API リクエストをまとめて実行できる。レスポンス変数を `${name:id}` で参照可能。

## Fixtures のパラメーターオーバーライド

```sh
stripe fixtures ./fixtures.json --override plan:product.name=NewName
```

## GET リクエスト

```sh
stripe get /v1/charges --limit 50
```

## POST リクエスト

```sh
stripe post /v1/payment_intents -d amount=2000 -d currency=usd
```

## DELETE リクエスト

> **警告**: DELETE リクエストはリソースを削除する。本番環境では `--live` フラグ使用時に注意すること。

```sh
stripe delete /v1/customers/cus_9s6XKzkNRiz8i3
```

## カスタマーの作成

```sh
stripe customers create --email=billing@example.com --name="Jenny Rosen"
```

## カスタマーの一覧取得

```sh
stripe customers list --limit 50
```

## カスタマーの取得

```sh
stripe customers retrieve cus_9s6XKzkNRiz8i3
```

## カスタマーの更新

```sh
stripe customers update cus_9s6XKzkNRiz8i3 -d "metadata[key]=value"
```

## イベントの再送信

```sh
stripe events resend evt_1PH9HU2eZvKYlo2CrSrLx8y1
```

## 特定の Webhook エンドポイントへ再送信

```sh
stripe events resend evt_1PH9HU2eZvKYlo2CrSrLx8y1 --webhook-endpoint=we_123456
```

## Dashboard をブラウザで開く

```sh
stripe open dashboard
```

## API リファレンスを開く

```sh
stripe open api
```

## Stripe Samples の一覧表示

```sh
stripe samples list
```

## Stripe Samples のローカルコピー作成

```sh
stripe samples create accept-a-payment
```

## 設定の確認

```sh
stripe config --list
```

## シェル補完のセットアップ（zsh）

```sh
stripe completion --shell zsh
```

## シェル補完のセットアップ（bash）

```sh
stripe completion --shell bash
```

## バージョン確認

```sh
stripe version
```

## コマンドのヘルプ表示

```sh
stripe help <command>
```

## グローバルフラグ

| フラグ | 説明 |
| --- | --- |
| `--api-key <key>` | 使用する API キーを指定 |
| `--live` | テストモードではなく本番モードでリクエスト |
| `--project-name <name>` | プロジェクト設定を指定 |
| `--log-level <level>` | ログレベル（`debug`, `info`, `warn`, `error`） |
| `--color <setting>` | カラー出力（`on`, `off`, `auto`） |
| `-s, --show-headers` | レスポンスヘッダーを表示 |
| `-c, --confirm` | 確認プロンプトをスキップ |

## 環境変数

| 変数 | 説明 |
| --- | --- |
| `STRIPE_API_KEY` | 使用する API キー |
| `STRIPE_DEVICE_NAME` | Dashboard に表示されるデバイス名 |
| `STRIPE_CLI_TELEMETRY_OPTOUT` | `1` または `true` でテレメトリーを無効化 |
| `XDG_CONFIG_HOME` | 設定ファイルの場所を上書き |
