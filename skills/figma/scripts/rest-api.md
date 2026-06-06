# REST API

Figma REST API の curl 呼び出し例。認証ヘッダー付きでコピペ実行できる形式。

## 認証ヘッダーの設定

```sh
# パーソナルアクセストークン（個人スクリプト・ローカル開発向け）
# Figma 設定 → Security → Personal access tokens で生成
export FIGMA_TOKEN="<your-personal-access-token>"
```

すべてのリクエストに `X-Figma-Token: <token>` ヘッダーを付与する。OAuth 2 Bearer トークンの場合は `Authorization: Bearer <token>` を使用する。

## ファイルの取得

```sh
curl -H "X-Figma-Token: $FIGMA_TOKEN" \
  "https://api.figma.com/v1/files/<file_key>"
```

```sh
# 特定ノードのみ取得
curl -H "X-Figma-Token: $FIGMA_TOKEN" \
  "https://api.figma.com/v1/files/<file_key>/nodes?ids=<node_id>"
```

```sh
# ツリーの深さを制限して取得
curl -H "X-Figma-Token: $FIGMA_TOKEN" \
  "https://api.figma.com/v1/files/<file_key>?depth=2"
```

`<file_key>` は Figma ファイル URL `figma.com/file/<key>/...` の `<key>` 部分。

## ファイルメタデータの取得

```sh
curl -H "X-Figma-Token: $FIGMA_TOKEN" \
  "https://api.figma.com/v1/files/<file_key>/meta"
```

ドキュメント本体を含まない軽量なメタデータ（作成者・サムネイル URL 等）を返す。スコープ: `file_metadata:read`。

## 画像エクスポート（レンダリング URL の取得）

```sh
# PNG でエクスポート
curl -H "X-Figma-Token: $FIGMA_TOKEN" \
  "https://api.figma.com/v1/images/<file_key>?ids=<node_id>&format=png"
```

```sh
# SVG・倍率指定でエクスポート
curl -H "X-Figma-Token: $FIGMA_TOKEN" \
  "https://api.figma.com/v1/images/<file_key>?ids=<node_id>&format=svg&scale=2"
```

```sh
# PDF でエクスポート
curl -H "X-Figma-Token: $FIGMA_TOKEN" \
  "https://api.figma.com/v1/images/<file_key>?ids=<node_id>&format=pdf"
```

レスポンスに含まれる画像 URL は 30 日で期限切れになる。複数ノードは `ids` をカンマ区切りで指定。

## 画像フィル URL の取得

```sh
curl -H "X-Figma-Token: $FIGMA_TOKEN" \
  "https://api.figma.com/v1/files/<file_key>/images"
```

ファイル内のすべての画像フィルのダウンロード URL を返す（14 日で期限切れ）。

## コメントの取得

```sh
curl -H "X-Figma-Token: $FIGMA_TOKEN" \
  "https://api.figma.com/v1/files/<file_key>/comments"
```

```sh
# Markdown 形式で取得
curl -H "X-Figma-Token: $FIGMA_TOKEN" \
  "https://api.figma.com/v1/files/<file_key>/comments?as_md=true"
```

スコープ: `file_comments:read`。

## コメントの投稿

```sh
curl -X POST \
  -H "X-Figma-Token: $FIGMA_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"message": "コメント本文"}' \
  "https://api.figma.com/v1/files/<file_key>/comments"
```

スコープ: `file_comments:write`。

## コメントの削除

> **警告**: 削除したコメントは復元できません。

```sh
curl -X DELETE \
  -H "X-Figma-Token: $FIGMA_TOKEN" \
  "https://api.figma.com/v1/files/<file_key>/comments/<comment_id>"
```

スコープ: `file_comments:write`。

## チームコンポーネントの取得

```sh
curl -H "X-Figma-Token: $FIGMA_TOKEN" \
  "https://api.figma.com/v1/teams/<team_id>/components"
```

スコープ: `team_library_content:read`。

## ファイルバージョン一覧の取得

```sh
curl -H "X-Figma-Token: $FIGMA_TOKEN" \
  "https://api.figma.com/v1/files/<file_key>/versions"
```

## 自分のユーザー情報の取得

```sh
curl -H "X-Figma-Token: $FIGMA_TOKEN" \
  "https://api.figma.com/v1/me"
```

## Webhook の作成

```sh
curl -X POST \
  -H "X-Figma-Token: $FIGMA_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "event_type": "FILE_VERSION_UPDATE",
    "context": "file",
    "context_id": "<file_key>",
    "endpoint": "https://example.com/webhook",
    "passcode": "my-secret"
  }' \
  "https://api.figma.com/v2/webhooks"
```

スコープ: `webhooks:write`。作成時に `PING` イベントがエンドポイントに送信される。

## Webhook の削除

> **警告**: 削除した Webhook は復元できません。

```sh
curl -X DELETE \
  -H "X-Figma-Token: $FIGMA_TOKEN" \
  "https://api.figma.com/v2/webhooks/<webhook_id>"
```
