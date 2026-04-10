# Marketing Headers

Beautiful section headers for marketing pages with taglines, headlines, and descriptions.

> **Note:** Blocks require `CHAKRA_PRO_API_KEY` environment variable. If not set, block features are unavailable.

## Group

marketing

## When to Use

- マーケティングページのページヘッダーやセクションヘッダーを構築するとき
- キャッチコピー + サブテキスト + CTA ボタンのヘッダーが必要なとき
- 検索バーやフォーム付きのページヘッダーを作るとき
- セクション見出しに CTA リンクを添えたいとき

## MCP Parameters

Tool: `get_component_templates`

| Parameter | Type | Description |
|-----------|------|-------------|
| `category` | `string` | 固定値: `"marketing-headers"` |
| `id` | `string` | 取得するバリアントの ID |

## Variants

| ID | Name | Access | Description |
|----|------|--------|-------------|
| `page-header` | Page Header | paid | タグライン・見出し・説明文の左揃えヘッダー |
| `page-header-centered` | Page Header Centered | paid | 中央揃えのページヘッダー |
| `page-header-with-call-to-action` | Page Header With Call To Action | paid | CTAボタン付きのページヘッダー |
| `page-header-with-form` | Page Header With Form | paid | インラインフォーム付きのページヘッダー |
| `page-header-with-search` | Page Header With Search | paid | 検索入力フィールド付きのページヘッダー |
| `section-header` | Section Header | paid | セクション用の小型見出しコンポーネント |
| `section-header-with-call-to-action` | Section Header With Call To Action | paid | CTAリンク付きのセクション見出し |
