# Deploy

Inngest アプリの本番環境へのデプロイと同期。

## アプリの手動同期（REST API）

> **警告**: 本番環境に反映されます。コードの最新バージョンがホスティング先にデプロイ済みであることを確認してから実行してください。

```sh
curl -X POST "https://api.inngest.com/v2/apps/$APP_ID/syncs" \
  -H "Authorization: Bearer $INNGEST_API_KEY" \
  -d "{\"url\": \"$APP_URL\"}"
```

- `$INNGEST_API_KEY`: Inngest ダッシュボードで取得した API キー
- `$APP_URL`: アプリの Inngest エンドポイント（例: `https://my-app.com/api/inngest`）
- `$APP_ID`: `Inngest` クライアントの `id` に設定した値

## Vercel へのデプロイ

Inngest 公式 Vercel インテグレーションを使用することで自動的に同期される。追加の CLI コマンドは不要。

設定が必要な環境変数（Vercel プロジェクト設定に追加）:

```sh
# Inngest ダッシュボードから取得して設定する
INNGEST_SIGNING_KEY=signkey-prod-...
INNGEST_EVENT_KEY=...
# カスタムドメインを使用する場合のみ設定
INNGEST_SERVE_ORIGIN=https://your-custom-domain.com
```
