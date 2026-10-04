# Card

関連情報をまとめて表示するレイアウトコンテナ。root/header/body/footer/title/description/action/cover の 8 パーツで構成し、コンビニ関数は提供しない（各パーツを個別に呼び出して組み立てる）。

## Signature / Usage

```rust
use fandhe_frontend_pre_styled_ui::card::{self, CardVariant};
use fandhe_frontend_core::text;

let node = card::root(
    CardVariant::Elevated,
    vec![],
    vec![
        card::header(vec![], vec![card::title(vec![], vec![text("Title")])]),
        card::body(vec![], vec![text("Body")]),
        card::footer(vec![], vec![text("Footer")]),
    ],
);
```

`root(props: impl Into<CardProps>, attrs, children) -> Node`。`CardProps` のほか `CardVariant` を直接渡す旧来の呼び出しも有効（`size` は `Md`）。`header`/`body`/`footer`/`title`/`description`/`action`/`cover` はいずれも `(attrs, children) -> Node`。`css() -> String` が静的 CSS 全量を返す。

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `CardProps.variant` | `CardVariant` (`Elevated`/`Outline`/`Subtle`) | `Outline` | 見た目 variant。`root` のみへクラス付与 |
| `CardProps.size` | `Size` | `Md` | サイズ variant |
| `header` の `data-has-action` | attrs `("data-has-action", "")` | — | `action` を置く場合に header を grid 化する opt-in（呼び出し側が `attrs` で渡す） |
| `body`/`footer` の `data-subtle` | attrs `("data-subtle", "")` | — | 淡色背景の帯を敷く opt-in |

## Notes

- `action`（`<div>`）は header 右上のボタン等のスロット。`cover`（`<div>`）は root 先頭に置くと角丸をクリップする cover image 枠で、画像本体は呼び出し側が `image::image` を子として渡す。
- `header`/`body`/`footer`/`title`（`<h3>`）/`description`（`<p>`）/`action`/`cover` は variant を持たず、呼び出し側 `attrs` をそのまま連結する。
- 純粋なレイアウトコンテナのため `role`/`aria-*` は付与しない。`colorPalette` 軸も持たない。
- `@chakra-ui/react` の JS/TS API とは別物（Rust 製）。

## Related

- [Data List](./data-list.md)
- [Table](./table.md)
