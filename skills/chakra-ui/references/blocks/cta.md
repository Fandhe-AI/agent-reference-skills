# CTA

Components for driving user action and engagement.

> **Note:** Blocks require `CHAKRA_PRO_API_KEY` environment variable. If not set, block features are unavailable.

## Group

marketing

## When to Use

- ページ内に目立つ行動喚起（CTA）セクションを配置するとき
- 「今すぐ始める」「無料トライアル」などのアクションを促す領域が必要なとき
- ニュースレター登録や問い合わせへの誘導セクションを作るとき
- ページ末尾のコンバージョン促進セクションが必要なとき

## MCP Parameters

Tool: `get_component_templates`

| Parameter | Type | Description |
|-----------|------|-------------|
| `category` | `string` | 固定値: `"cta"` |
| `id` | `string` | 取得するバリアントの ID |

## Variants

| ID | Name | Access | Description |
|----|------|--------|-------------|
| `cta-01` | Cta 01 | paid | シンプルな見出し+ボタンの中央揃えCTA |
| `cta-02` | Cta 02 | paid | 背景色付きの目立つCTAセクション |
| `cta-03` | Cta 03 | paid | 2カラム（テキスト+ボタン）のCTAバー |
| `cta-04` | Cta 04 | paid | カード形式の行動喚起セクション |
| `cta-05` | Cta 05 | paid | メール入力フォーム付きCTAセクション |
| `cta-06` | Cta 06 | paid | 画像付きの2カラムCTAレイアウト |
| `cta-07` | Cta 07 | paid | 背景画像付きのフルワイドCTAセクション |
| `cta-08` | Cta 08 | paid | 複数ボタンと説明文付きのCTAセクション |
