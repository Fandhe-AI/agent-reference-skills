# Features

Components for showcasing your platform's key features.

> **Note:** Blocks require `CHAKRA_PRO_API_KEY` environment variable. If not set, block features are unavailable.

## Group

marketing

## When to Use

- プロダクトの機能紹介セクションを構築するとき
- アイコン + テキストの機能一覧を作るとき
- Bento グリッドレイアウトの機能ショーケースが必要なとき
- ランディングページの「特徴」セクションを実装するとき

## MCP Parameters

Tool: `get_component_templates`

| Parameter | Type | Description |
|-----------|------|-------------|
| `category` | `string` | 固定値: `"features"` |
| `id` | `string` | 取得するバリアントの ID |

## Variants

| ID | Name | Access | Description |
|----|------|--------|-------------|
| `feature-01` | Feature 01 | paid | 2カラム（テキスト+画像）とアイコン付き機能リスト |
| `feature-02` | Feature 02 | paid | 中央揃え見出しと3カラムアイコン付き機能グリッド |
| `feature-03` | Feature 03 | paid | 2カラムヘッダーとCard形式の3カラム機能一覧 |
| `feature-04` | Feature 04 | paid | Badge付き見出しと2カラムアイコン付き機能グリッド |
| `feature-05` | Feature 05 | paid | 2カラム（アイコンリスト+画像）のシンプル構成 |
| `feature-06` | Feature 06 | paid | アコーディオン切替で画像が変わるインタラクティブ構成 |
| `feature-07` | Feature 07 | paid | タブ切替で画像が変わる自動再生プログレス付き構成 |
| `feature-08` | Feature 08 | paid | Badge・画像付き2カラムと下部4カラム機能グリッド |
| `feature-10` | Feature 10 | paid | Highlight見出しと4カラムリンク付き機能カード |
| `feature-bento-grid-01` | Feature Bento Grid 01 | paid | 不均等Grid（colSpan/rowSpan）のBentoレイアウト |
| `feature-bento-grid-02` | Feature Bento Grid 02 | paid | Badge付きBentoグリッドと下部SimpleGrid構成 |
