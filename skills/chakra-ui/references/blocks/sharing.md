# Sharing

Components for sharing content with social media platforms.

> **Note:** Blocks require `CHAKRA_PRO_API_KEY` environment variable. If not set, block features are unavailable.

## Group

application

## When to Use

- SNS シェアボタン・共有 UI を構築するとき
- コンテンツのリンク共有ダイアログが必要なとき
- ソーシャルメディアへの投稿共有機能を実装するとき

## MCP Parameters

Tool: `get_component_templates`

| Parameter | Type | Description |
|-----------|------|-------------|
| `category` | `string` | 固定値: `"sharing"` |
| `id` | `string` | 取得するバリアントの ID |

## Variants

| ID | Name | Access | Description |
|----|------|--------|-------------|
| `sharing-00` | Sharing 00 | paid | SNSアイコンボタン横並びのシンプルな共有UI |
| `sharing-01` | Sharing 01 | paid | リンクコピー＋SNSシェアボタン付き共有パネル |
| `sharing-02` | Sharing 02 | paid | ダイアログ形式のリンク共有＋権限設定UI |
| `sharing-03` | Sharing 03 | paid | ユーザー招待＋リンク共有の複合共有パネル |
| `sharing-04` | Sharing 04 | paid | カード形式の共有UI＋アクセス権限ドロップダウン |
| `sharing-05` | Sharing 05 | paid | コンパクトなポップオーバー形式の共有メニュー |
