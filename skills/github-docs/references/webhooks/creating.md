# Webhook 作成

## リポジトリ Webhook の作成（UI）

### 前提条件

- リポジトリの Owner または Admin 権限が必要

### 手順

1. リポジトリの **Settings** に移動
2. 左サイドバーから **Webhooks** を選択
3. **Add webhook** をクリック
4. 設定項目を入力（下記参照）
5. **Add webhook** をクリックして保存

### 設定項目

| 項目 | 説明 | 必須 |
|------|------|------|
| **Payload URL** | ペイロードを配信するエンドポイント URL | Yes |
| **Content type** | `application/json` または `application/x-www-form-urlencoded` | Yes |
| **Secret** | HMAC-SHA256 署名検証用の秘密文字列（高エントロピーなランダム文字列を推奨） | No（推奨） |
| **SSL verification** | SSL 証明書の検証（有効化を強く推奨） | Yes |
| **Events** | 受信するイベントの選択 | Yes |
| **Active** | Webhook の有効/無効 | Yes |

### Content Type の違い

- **`application/json`**: ペイロードが POST ボディとして直接送信される
- **`application/x-www-form-urlencoded`**: ペイロードが `payload` フォームパラメータとして送信される

### イベント選択

- **Just the push event**: push イベントのみ（デフォルト）
- **Send me everything**: すべてのイベント
- **Let me select individual events**: 個別のイベントを選択

## Organization Webhook の作成（UI）

### 前提条件

- Organization の Owner 権限が必要

### 手順

1. プロフィールメニューから Organization の **Settings** にアクセス
2. **Webhooks** セクションに移動
3. **Add webhook** をクリック
4. 設定を入力（リポジトリ Webhook と同様の項目）
5. **Add webhook** をクリック

## GitHub App Webhook の設定

### 手順

1. **Developer settings** > **GitHub Apps** から App を編集
2. **Webhook** セクションで **Active** チェックボックスを有効化
3. **Webhook URL** を入力
4. （推奨）**Webhook secret** を設定
5. **Permissions & events** に移動し、必要な権限を選択
6. 対象イベントをサブスクライブ
7. 変更を保存

### 注意事項

- GitHub App は 1 つの Webhook のみ持てる
- 利用可能なイベントは選択した権限に依存する
- 権限を設定してからイベントを選択すること

## Marketplace / Sponsors Webhook

- **Marketplace**: App の所有者またはマネージャーがリスティング管理画面から作成
- **Sponsors**: スポンサーされるアカウントの所有者がダッシュボードから作成

## API による Webhook の作成

### リポジトリ Webhook

```
POST /repos/{owner}/{repo}/hooks
```

```json
{
  "name": "web",
  "active": true,
  "events": ["push", "pull_request"],
  "config": {
    "url": "https://example.com/webhook",
    "content_type": "json",
    "secret": "your-secret-token",
    "insecure_ssl": "0"
  }
}
```

### Organization Webhook

```
POST /orgs/{org}/hooks
```

## Webhook の確認

Webhook 作成後、GitHub は `ping` イベントを送信して正常にセットアップされたことを確認する。

## 公式ドキュメント

- [Creating webhooks](https://docs.github.com/en/webhooks/using-webhooks/creating-webhooks)
