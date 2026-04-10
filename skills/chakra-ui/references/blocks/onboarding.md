# Onboarding

Components for onboarding new users to your platform.

> **Note:** Blocks require `CHAKRA_PRO_API_KEY` environment variable. If not set, block features are unavailable.

## Group

application

## When to Use

- 新規ユーザー向けのオンボーディングフローを構築するとき
- チェックリスト形式のセットアップガイドが必要なとき
- 画像や動画付きのウェルカム画面を作るとき
- ワークスペース作成・初期設定ウィザードが必要なとき
- ステップバイステップの初回設定フローを実装するとき

## MCP Parameters

Tool: `get_component_templates`

| Parameter | Type | Description |
|-----------|------|-------------|
| `category` | `string` | 固定値: `"onboarding"` |
| `id` | `string` | 取得するバリアントの ID |

## Variants

| ID | Name | Access | Description |
|----|------|--------|-------------|
| `onboarding-simple-01` | Onboarding Simple 01 | paid | シンプルなウェルカムメッセージ＋開始ボタンの1ステップ構成 |
| `onboarding-simple-02` | Onboarding Simple 02 | paid | ステップインジケーター付きのシンプルなオンボーディングフロー |
| `onboarding-simple-03` | Onboarding Simple 03 | paid | プログレスバー＋入力フォームのステップ式オンボーディング |
| `onboarding-with-checklist` | Onboarding With Checklist | paid | チェックリスト形式のセットアップガイド＋進捗表示 |
| `onboarding-with-image-01` | Onboarding With Image 01 | paid | 2カラム（説明テキスト+画像）のオンボーディング画面 |
| `onboarding-with-image-02` | Onboarding With Image 02 | paid | 画像付きのステップ案内＋ナビゲーションボタン構成 |
| `onboarding-with-image-03` | Onboarding With Image 03 | paid | フルワイド画像背景＋中央揃えテキストのウェルカム画面 |
| `onboarding-with-image-04` | Onboarding With Image 04 | paid | カード内画像＋ステッパー付きのオンボーディングフロー |
| `onboarding-with-video` | Onboarding With Video | paid | 動画プレーヤー埋め込みのオンボーディング画面 |
| `onboarding-workspace-01` | Onboarding Workspace 01 | paid | ワークスペース名入力＋ロゴアップロードの初期設定画面 |
| `onboarding-workspace-02` | Onboarding Workspace 02 | paid | チームメンバー招待フォーム付きワークスペースセットアップ |
| `onboarding-workspace-03` | Onboarding Workspace 03 | paid | ロール選択＋利用目的のワークスペース設定ステップ |
| `onboarding-workspace-04` | Onboarding Workspace 04 | paid | プラン選択付きワークスペースオンボーディング画面 |
| `onboarding-workspace-05` | Onboarding Workspace 05 | paid | 連携サービス選択＋完了画面付きワークスペースセットアップ |
