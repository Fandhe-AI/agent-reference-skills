# Property Panels

Components for editing entity properties.

> **Note:** Blocks require `CHAKRA_PRO_API_KEY` environment variable. If not set, block features are unavailable.

## Group

application

## When to Use

- エンティティのプロパティ編集パネルを構築するとき
- 右ペインや詳細パネルでオブジェクトの属性を編集する UI が必要なとき
- Notion / Linear 風のプロパティサイドパネルを作るとき
- フォームフィールドを縦に並べた詳細編集パネルが必要なとき

## MCP Parameters

Tool: `get_component_templates`

| Parameter | Type | Description |
|-----------|------|-------------|
| `category` | `string` | 固定値: `"property-panels"` |
| `id` | `string` | 取得するバリアントの ID |

## Variants

| ID | Name | Access | Description |
|----|------|--------|-------------|
| `property-panel-00` | Property Panel 00 | paid | ラベル＋値の縦並びリストによるシンプルなプロパティパネル |
| `property-panel-01` | Property Panel 01 | paid | インライン編集可能なフィールド付きプロパティパネル |
| `property-panel-02` | Property Panel 02 | paid | セクション分割＋ドロップダウン/タグ付きプロパティ編集パネル |
| `property-panel-03` | Property Panel 03 | paid | サイドパネル形式の詳細プロパティ＋アクションボタン付き |
