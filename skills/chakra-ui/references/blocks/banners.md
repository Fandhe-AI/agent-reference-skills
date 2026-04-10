# Banners

Strategic message displays that capture attention through prominent placement at key page locations.

> **Note:** Blocks require `CHAKRA_PRO_API_KEY` environment variable. If not set, block features are unavailable.

## Group

marketing

## When to Use

- ページ上部にプロモーション・告知バナーを表示するとき
- Cookie 同意バナーが必要なとき
- サインアップ促進バナーを配置するとき
- リンク付きや問い合わせ誘導付きのバナーが必要なとき
- キャンペーン・セール告知バナーを作るとき

## MCP Parameters

Tool: `get_component_templates`

| Parameter | Type | Description |
|-----------|------|-------------|
| `category` | `string` | 固定値: `"banners"` |
| `id` | `string` | 取得するバリアントの ID |

## Variants

| ID | Name | Access |
|----|------|--------|
| `banner-centered` | Banner Centered | paid |
| `banner-for-cookies` | Banner For Cookies | paid |
| `banner-for-promo` | Banner For Promo | paid |
| `banner-with-contact` | Banner With Contact | paid |
| `banner-with-link` | Banner With Link | free |
| `banner-with-sign-up` | Banner With Sign Up | paid |
| `banner-with-text` | Banner With Text | free |
| `banner-with-two-buttons` | Banner With Two Buttons | paid |
