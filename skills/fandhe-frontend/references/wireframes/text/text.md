# Text

`fandhe-frontend-wireframe-ui` の単一行テキスト部品。画面設計図中の見出し・ラベル・短い文言を表す非インタラクティブなローファイ部品で、複数行のブロック本文を表す Paragraph とは 1 行固定表示かどうかで役割が異なる。API は `text(content, size, bold)` の 3 引数。

## Signature / Usage

```rust
pub fn text(content: &str, size: Size, bold: Bold) -> Node
```

`fandhe_frontend_core::text` と同名のため、併用時は別名で取り込む。

```rust
use fandhe_frontend_core::text;
use fandhe_frontend_wireframe_ui::{text as wire_text, Bold, Size};

wire_text("見出しのダミーテキストです", Size::Md, Bold(false));
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| content | `&str` | - | 表示する文言。1 行固定表示のため、幅を超える場合は CSS（`text-overflow: ellipsis`）で末尾が省略される。 |
| size | `Size` | `Size::Md` | サイズ段階（xs〜xl）。フォントサイズに反映される。 |
| bold | `Bold` | `Bold(false)` | true のとき太字バリアントにする。 |

## Notes

- 出典: https://fandhe-ai.github.io/fandhe-frontend/wireframes/text/
- 低忠実度ワイヤーフレーム部品。Themes の `Text` とは別物で、`@ark-ui/react` / `@chakra-ui/react` の JS/TS API とも無関係（Rust 製）。スタイル済みの実部品が必要な場合は Themes の Text を使う。
- 1 行固定 + 省略記号: `\n` は改行として描画されず、`white-space: nowrap` + `overflow: hidden` + `text-overflow: ellipsis` で 1 行に固定される（`white-space: pre-line` の Paragraph と対）。
- ルート要素は `<span>`（`paragraph` の `<div>` ルートとは異なり、docs サイト骨格 CSS との詳細度競合が無い）。
- `Bold` 軸のみで `Primary` は持たない（`annotation` が `Primary` で強調を表すのと対の判断）。
- 非インタラクティブ: `role` / `aria-*` / `tabindex` を付与せず、`button` / `a[href]` も出力しない。
- スクリーンショットは非掲載（視覚的参照元は blocks.pm の Text）。

## Related

- [Text wireframes](./overview.md)
- [Paragraph (wireframe)](./paragraph.md)
- [Text (Themes)](../../themes/typography/text.md)
