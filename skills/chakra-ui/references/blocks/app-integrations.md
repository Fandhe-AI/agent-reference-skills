# Integrations

Components for managing third-party app integrations and connected services.

> **Note:** Blocks require `CHAKRA_PRO_API_KEY` environment variable. If not set, block features are unavailable.

## Group

application

## When to Use

- サードパーティ連携の一覧・管理画面を構築するとき
- Slack, GitHub, Jira など外部サービスとの接続設定 UI が必要なとき
- インテグレーションのオン/オフ切り替え画面を作るとき
- 連携アプリのカード形式一覧や詳細設定画面が必要なとき

## MCP Parameters

Tool: `get_component_templates`

| Parameter | Type | Description |
|-----------|------|-------------|
| `category` | `string` | 固定値: `"app-integrations"` |
| `id` | `string` | 取得するバリアントの ID |

## Variants

| ID | Name | Access | Description |
|----|------|--------|-------------|
| `setting-integrations-01` | Setting Integrations 01 | paid | カード形式の連携アプリ一覧＋接続/切断トグル付き |
| `setting-integrations-02` | Setting Integrations 02 | paid | アイコン＋説明付きの連携サービスリスト＋接続ボタン |
| `setting-integrations-03` | Setting Integrations 03 | paid | グリッド配置の連携アプリカード＋ステータスBadge |
| `setting-integrations-04` | Setting Integrations 04 | paid | カテゴリ分類付きの連携サービス一覧レイアウト |
| `setting-integrations-05` | Setting Integrations 05 | paid | Switch付きの連携アプリ管理リスト構成 |
| `setting-integrations-06` | Setting Integrations 06 | paid | 詳細設定パネル付きの連携サービス管理画面 |
| `setting-integrations-07` | Setting Integrations 07 | paid | 検索フィルター付きの連携アプリ一覧レイアウト |
| `setting-integrations-08` | Setting Integrations 08 | paid | タブ切替（All/Active/Available）の連携管理画面 |
| `setting-integrations-09` | Setting Integrations 09 | paid | テーブル形式の連携サービス一覧＋アクションメニュー |
| `setting-integrations-10` | Setting Integrations 10 | paid | カード＋モーダルの連携詳細設定レイアウト |
| `setting-integrations-11` | Setting Integrations 11 | paid | コンパクトリスト形式の連携アプリ管理画面 |
| `setting-integrations-12` | Setting Integrations 12 | paid | 2カラム（カテゴリ+連携リスト）のレイアウト |
| `setting-integrations-13` | Setting Integrations 13 | paid | 大きめカード＋説明文付きの連携アプリグリッド |
