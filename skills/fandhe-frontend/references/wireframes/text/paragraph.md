# Paragraph

`fandhe-frontend-wireframe-ui` の複数行本文部品。画面設計図中の本文プレースホルダーを表す非インタラクティブなローファイ部品で、単一行の見出し / ラベル相当の `text` とは異なり複数行にわたるブロック本文を表現する。API は `paragraph(content, size, bold)` の 3 引数。

## Signature / Usage

```rust
pub fn paragraph(content: &str, size: Size, bold: Bold) -> Node
```

```rust
use fandhe_frontend_wireframe_ui::{paragraph, Bold, Size};

paragraph(
    "1 行目のダミーテキストです。\n2 行目のダミーテキストです。",
    Size::Md,
    Bold(false),
);
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| content | `&str` | - | 表示する本文文言。`\n` を含めると CSS（`white-space: pre-line`）で改行として描画される。 |
| size | `Size` | `Size::Md` | サイズ段階（xs〜xl）。フォントサイズに反映される。 |
| bold | `Bold` | `Bold(false)` | true のとき太字バリアントにする。 |

## Notes

- 出典: https://fandhe-ai.github.io/fandhe-frontend/wireframes/paragraph/
- 低忠実度ワイヤーフレーム部品。Themes の `Text` とは別物で、`@ark-ui/react` / `@chakra-ui/react` の JS/TS API とも無関係（Rust 製）。スタイル済みの実部品が必要な場合は Themes の Text を使う。
- 複数行は CSS 表現のみ: `\n` は `<br>` へ変換せず `white-space: pre-line` で描画する。`raw_html` は使わない。
- ルート要素は `<p>` ではなく `<div>`（docs サイト骨格 CSS `.docs-content p` の詳細度に負けて `Size` 差が消えるため。`annotation` も同様）。
- `Bold` 軸のみで `Primary` は持たない（Annotation が `Primary` で強調を表すのと対の判断）。
- 非インタラクティブ: `role` / `aria-*` / `tabindex` を付与せず、`button` / `a[href]` も出力しない。
- スクリーンショットは非掲載（視覚的参照元は blocks.pm の Paragraph）。

## Related

- [Text wireframes](./overview.md)
- [Text (wireframe)](./text.md)
- [Text (Themes)](../../themes/typography/text.md)
