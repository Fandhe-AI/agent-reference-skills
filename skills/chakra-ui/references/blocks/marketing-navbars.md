# Marketing Navbars

Marketing navigation bars with call-to-action buttons and promotional links.

> **Note:** Blocks require `CHAKRA_PRO_API_KEY` environment variable. If not set, block features are unavailable.

## Group

marketing

## When to Use

- マーケティング・LP サイトのナビゲーションバーを構築するとき
- CTA ボタン（サインアップ・お問い合わせ等）付きのナビバーが必要なとき
- アイランド型（浮遊型）のモダンなナビバーを作るとき

## MCP Parameters

Tool: `get_component_templates`

| Parameter | Type | Description |
|-----------|------|-------------|
| `category` | `string` | 固定値: `"marketing-navbars"` |
| `id` | `string` | 取得するバリアントの ID |

## Variants

| ID | Name | Access | Description |
|----|------|--------|-------------|
| `navbar-island` | Navbar Island | paid | 浮遊型アイランドスタイルのナビバー |
| `navbar-with-call-to-action` | Navbar With Call To Action | paid | 単一CTAボタン付きのナビゲーションバー |
| `navbar-with-call-to-actions` | Navbar With Call To Actions | paid | 複数CTAボタン付きのナビゲーションバー |
