# Blog

Engaging blog layouts to share articles, news, and stories with your audience.

> **Note:** Blocks require `CHAKRA_PRO_API_KEY` environment variable. If not set, block features are unavailable.

## Group

marketing

## When to Use

- ブログ記事一覧ページを構築するとき
- 2 カラム・3 カラムのブログカードレイアウトが必要なとき
- フィーチャード記事（大きな画像付き）の表示が必要なとき
- ヒーロー画像付きのブログセクションを作るとき

## MCP Parameters

Tool: `get_component_templates`

| Parameter | Type | Description |
|-----------|------|-------------|
| `category` | `string` | 固定値: `"blogs"` |
| `id` | `string` | 取得するバリアントの ID |

## Variants

| ID | Name | Access | Description |
|----|------|--------|-------------|
| `blog-featured` | Blog Featured | paid | 大きな画像付きフィーチャード記事の強調表示 |
| `blog-three-columns` | Blog Three Columns | paid | 3カラムのシンプルなブログ記事リスト |
| `blog-three-columns-card` | Blog Three Columns Card | paid | 3カラムのCard形式ブログ記事一覧 |
| `blog-three-columns-card-01` | Blog Three Columns Card 01 | paid | 画像付き3カラムブログカードの別バリエーション |
| `blog-two-columns` | Blog Two Columns | paid | 2カラムのブログ記事リスト |
| `blog-two-columns-card` | Blog Two Columns Card | paid | 2カラムのCard形式ブログ記事一覧 |
| `blog-with-hero-image` | Blog With Hero Image | paid | ヒーロー画像付きの大型ブログセクション |
