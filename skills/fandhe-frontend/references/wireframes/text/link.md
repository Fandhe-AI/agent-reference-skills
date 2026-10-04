# Link

`fandhe-frontend-wireframe-ui` の下線テキストリンク風プレースホルダー。下線付きラベル + 任意の末尾アイコン（外部リンク等）で「リンクらしさ」だけを表現する非インタラクティブな部品。API は `link(label, trailing, size, bold)` の 4 引数。

## Signature / Usage

```rust
pub fn link(label: &str, trailing: Option<Node>, size: Size, bold: Bold) -> Node
```

```rust
use fandhe_frontend_wireframe_ui::{icon, link, Bold, Size};

link("詳細を見る", None, Size::Md, Bold(false));
link("外部サイトを見る", Some(icon::external(Size::Md)), Size::Md, Bold(false));
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| label | `&str` | - | 下線付きで表示する必須のリンク文言。 |
| trailing | `Option<Node>` | `None` | 省略可能な末尾アイコンスロット。外部リンク表示は `Some(icon::external(size))` を渡す。 |
| size | `Size` | `Size::Md` | サイズ段階（xs〜xl）。フォントサイズに反映される。 |
| bold | `Bold` | `Bold(false)` | true のとき太字（`fw-wire-bold`）バリアントにする。 |

## Notes

- 出典: https://fandhe-ai.github.io/fandhe-frontend/wireframes/link/
- 低忠実度ワイヤーフレーム部品。Primitives / Themes の同名 `Link` とは別物で、`@ark-ui/react` / `@chakra-ui/react` の JS/TS API とも無関係（Rust 製）。実際にページ遷移するリンクが必要な場合は Themes / Primitives の Link を使う。
- ルートは `span`。`a[href]` は出力せず、`href` / `rel` / `target` も出力しない（非インタラクティブ制約）。
- 原案差分: 末尾アイコンは `trailing: Option<Node>` スロット（§11.4）で表現し、専用型・第 2 の bool 引数・`external_link` 等の便宜ラッパは追加していない。
- 配色はグレースケールのトークン（`--fw-wire-ink` 文字色・`--fw-wire-line` 下線色）。
- スクリーンショットは非掲載（視覚的参照元は blocks.pm の Link）。

## Related

- [Text wireframes](./overview.md)
- [Link (Themes)](../../themes/typography/link.md)
- [Link (Primitives)](../../primitives/navigation/link.md)
