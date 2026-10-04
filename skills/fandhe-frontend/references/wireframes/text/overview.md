# Wireframes: Text

`fandhe-frontend-wireframe-ui` の Text カテゴリ（6 部品）。注釈・リンク・本文・アイコン付き行・タグ・単一行テキストを、画面設計図上の配置イメージとして示す非インタラクティブな低忠実度部品群。

## Signature / Usage

| 名前 | 関数 | 説明 | 個別ページ |
|------|------|------|-----------|
| Annotation | `annotation` | 太字タイトル + 任意の説明文の注釈ボックス | [annotation.md](./annotation.md) |
| Link | `link` | 下線付きラベル + 任意の末尾アイコンのリンク風表示 | [link.md](./link.md) |
| Paragraph | `paragraph` | 複数行の本文ブロック（`\n` を改行表示） | [paragraph.md](./paragraph.md) |
| Rich text | `rich_text` | 先頭 / 末尾アイコン + ラベルの 1 行（または縦積み） | [rich-text.md](./rich-text.md) |
| Tag | `tag` | ピル形状のタグ + 任意の削除「×」 | [tag.md](./tag.md) |
| Text | `text` | 1 行固定（ellipsis 省略）の単一行テキスト | [text.md](./text.md) |

カテゴリ共通の使い方（`Size` + `Bold` または `Primary` の組み合わせ。`fandhe_frontend_core::text` と同名の `text` は別名で取り込む）:

```rust
use fandhe_frontend_wireframe_ui::{paragraph, text as wire_text, Bold, Size};

wire_text("見出しのダミーテキストです", Size::Md, Bold(true));
paragraph("本文のダミーテキストです。\n2 行目です。", Size::Md, Bold(false));
```

## Notes

- 出典: https://fandhe-ai.github.io/fandhe-frontend/wireframes/
- Text 部品はすべて位置引数の関数で、props 構造体は無い。強調は Text / Paragraph / Link / Rich text が `Bold`、Annotation / Tag が `Primary`（反転色）で表す
- Link / Paragraph / Tag / Text は Themes に近い部品があるが別物の低忠実度部品。Annotation と Rich text は Primitives・Themes に同名部品が無い（wireframe-ui 固有）。`@ark-ui/react` / `@chakra-ui/react` の JS/TS API とは無関係（Rust 製）
- `role` / `aria-*` / `tabindex` は付与せず、`button` / `a[href]` も出力しない（Link のルートは `span`、Tag の削除「×」は `<button>` ではない）
- `Option<Node>` スロット: Link の `trailing`、Rich text の `leading` / `trailing`、Tag の `remove` はいずれも `None` なら出力しない
- Paragraph（`div` ルート・複数行）と Text（`span` ルート・1 行固定 + ellipsis）は役割が対

## Related

- [共通型 (Size / Orientation)](../foundations/common-types.md)
- [Data Display overview](../data-display/overview.md)
- [Layout overview](../layout/overview.md)
