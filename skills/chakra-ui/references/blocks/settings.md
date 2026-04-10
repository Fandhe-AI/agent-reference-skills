# Settings

Components for managing user account settings and preferences.

> **Note:** Blocks require `CHAKRA_PRO_API_KEY` environment variable. If not set, block features are unavailable.

## Group

application

## When to Use

- ユーザー設定画面を構築するとき（プロフィール、外観、言語、通知、プライバシーなど）
- API キー管理ページが必要なとき
- 請求・課金設定、シート管理、利用量表示を作るとき
- 監査ログ、セッション管理、ロール管理ページが必要なとき
- チーム管理（メンバー招待・権限設定）画面を作るとき
- Webhook 設定画面、データエクスポート画面が必要なとき
- 認証設定（2FA・SSO）画面を構築するとき

## MCP Parameters

Tool: `get_component_templates`

| Parameter | Type | Description |
|-----------|------|-------------|
| `category` | `string` | 固定値: `"settings"` |
| `id` | `string` | 取得するバリアントの ID |

## Variants

| ID | Name | Access | Description |
|----|------|--------|-------------|
| `setting-accessibility` | Setting Accessibility | paid | Switch付きアクセシビリティ設定一覧＋キーボードショートカット有効化 |
| `setting-api-key-01` | Setting Api Key 01 | paid | APIキーテーブル＋作成ダイアログ＋取り消しボタン付き管理画面 |
| `setting-api-key-02` | Setting Api Key 02 | paid | APIキーテーブル＋件数表示＋小さめ追加ボタンのコンパクト管理画面 |
| `setting-api-key-empty-state` | Setting Api Key Empty State | paid | Card内の空状態表示＋アイコン＋作成ダイアログ付きAPIキー初期画面 |
| `setting-appearance` | Setting Appearance | paid | テーマ（Light/Dark/System）RadioCard＋サイドバー位置＋Switch設定 |
| `setting-audit-log` | Setting Audit Log | paid | カテゴリBadge＋ユーザーAvatar付き監査ログテーブル＋フィルター＋CSV出力 |
| `setting-authentication` | Setting Authentication | paid | Email/Google/Apple認証カード一覧＋接続状態＋パスワード変更ボタン |
| `setting-billing` | Setting Billing | paid | Stat概要＋プランカード比較＋請求書テーブルの課金管理画面 |
| `setting-billing-seats` | Setting Billing Seats | paid | プラン情報DataList＋シート数Progress＋請求書テーブルの課金管理 |
| `setting-billing-usage` | Setting Billing Usage | paid | 現在プランCard＋使用量プログレスバー（API/Storage/Bandwidth） |
| `setting-copy-api-key-01` | Setting Copy Api Key 01 | paid | Card形式のAPIキー表示＋Clipboard入力＋コピーボタン＋注意事項 |
| `setting-copy-api-key-02` | Setting Copy Api Key 02 | paid | Card形式のAPIキー表示＋Textarea＋コピーアイコンボタン付き |
| `setting-export-data` | Setting Export Data | paid | Checkbox付きエクスポート対象選択＋フォーマット選択＋エクスポート履歴テーブル |
| `setting-language` | Setting Language | paid | 言語・タイムゾーン・日付/時刻形式のNativeSelect設定フォーム |
| `setting-notification` | Setting Notification | paid | 通知方法（Email/Slack/Mobile）Switch＋製品/アクティビティ更新の頻度設定 |
| `setting-notification-checkbox` | Setting Notification Checkbox | paid | divideY区切りの通知項目リスト＋Slack/Emailチャネル別Checkbox |
| `setting-notification-social` | Setting Notification Social | paid | デスクトップ通知Switch＋RadioGroup＋SNS通知種別（メンション/リプライ等）Switch |
| `setting-privacy` | Setting Privacy | paid | プライバシー設定Switch一覧＋データ共有設定Switch一覧の2セクション構成 |
| `setting-profile` | Setting Profile | paid | FormSection区切りのプロフィール＋パスワード＋危険ゾーン（アカウント削除） |
| `setting-profile-minimal` | Setting Profile Minimal | paid | 横並びField（写真/名前/場所/Bio/SNS）のミニマルプロフィール編集 |
| `setting-profile-with-theme` | Setting Profile With Theme | paid | プロフィール編集＋テーマ選択（RadioCard）＋危険ゾーンの統合設定 |
| `setting-roles` | Setting Roles | paid | ロール一覧カード＋権限数表示＋ロール作成ボタン付き権限管理 |
| `setting-sessions` | Setting Sessions | paid | デバイス別アクティブセッション一覧カード＋一括取り消しボタン |
| `setting-team-01` | Setting Team 01 | paid | Avatar＋ロールBadge付きチームメンバーテーブル＋アクションメニュー |
| `setting-team-02` | Setting Team 02 | paid | 招待フォーム＋Separator＋メンバーリスト（Avatar/Badge/ステータス） |
| `setting-team-03` | Setting Team 03 | paid | 検索＋フィルター＋招待ボタン付きメンバーテーブル＋アクションメニュー |
| `setting-webhooks` | Setting Webhooks | paid | Webhookエンドポイントテーブル＋追加ボタン＋署名シークレット表示 |
