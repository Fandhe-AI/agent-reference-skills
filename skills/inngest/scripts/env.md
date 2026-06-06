# Environment Variables

Inngest SDK および inngest-cli で使用する環境変数一覧。

## ローカル開発

| 変数名 | 説明 |
| --- | --- |
| `INNGEST_DEV` | `1` を設定するとローカル Dev Server に接続する |
| `INNGEST_BASE_URL` | Dev Server の URL（デフォルト: `http://localhost:8288`） |
| `INNGEST_EVENT_KEY` | イベントキー。ローカル開発ではダミー値で可 |

## 本番環境（Inngest Cloud）

| 変数名 | 説明 |
| --- | --- |
| `INNGEST_SIGNING_KEY` | Inngest との通信に使用する署名キー |
| `INNGEST_SIGNING_KEY_FALLBACK` | キーローテーション時のフォールバックキー |
| `INNGEST_EVENT_KEY` | アプリからイベントを送信するためのイベントキー |

## サーブハンドラー

| 変数名 | 説明 |
| --- | --- |
| `INNGEST_SERVE_ORIGIN` | アプリのドメイン（例: `https://myapp.com`）。カスタムドメイン利用時に設定 |
| `INNGEST_SERVE_PATH` | サーブハンドラーのパス（推奨: `/api/inngest`） |
| `INNGEST_STREAMING` | ストリーミングレスポンスの有効化 |

## .env.local への記載例（Next.js）

```sh
INNGEST_DEV=1
INNGEST_EVENT_KEY=your-local-dummy-key
```

## 本番環境への設定例（シェル）

```sh
export INNGEST_SIGNING_KEY=signkey-prod-...
export INNGEST_EVENT_KEY=...
```
