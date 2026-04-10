# Contact

User-friendly contact forms and sections to help users reach out to you.

> **Note:** Blocks require `CHAKRA_PRO_API_KEY` environment variable. If not set, block features are unavailable.

## Group

marketing

## When to Use

- お問い合わせフォームを構築するとき
- ダイアログ（モーダル）形式のコンタクトフォームが必要なとき
- 画像付きのお問い合わせページを作るとき

## MCP Parameters

Tool: `get_component_templates`

| Parameter | Type | Description |
|-----------|------|-------------|
| `category` | `string` | 固定値: `"contacts"` |
| `id` | `string` | 取得するバリアントの ID |

## Variants

| ID | Name | Access | Description |
|----|------|--------|-------------|
| `contact-dialog-simple-form` | Contact Dialog Simple Form | paid | ダイアログ（モーダル）内のお問い合わせフォーム |
| `contact-form-with-image` | Contact Form With Image | paid | 画像付き2カラムのお問い合わせフォーム |
| `contact-simple-form` | Contact Simple Form | paid | シンプルな1カラムのお問い合わせフォーム |
