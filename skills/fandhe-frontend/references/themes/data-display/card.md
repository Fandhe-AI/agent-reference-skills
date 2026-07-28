# Card

関連情報をまとめて表示するレイアウトコンテナ。root/header/body/footer/title/description の 6 パーツで構成し、コンビニ関数は提供しない（各パーツを個別に呼び出して組み立てる）。

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

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `root: variant` | `CardVariant` (`Elevated`/`Outline`/`Subtle`) | `Outline` | 見た目 variant。`root` のみへクラス付与 |

## Notes

- `header`/`body`/`footer`/`title`（`<h3>`）/`description`（`<p>`）は variant を持たず、呼び出し側 `attrs` をそのまま連結する。
- 純粋なレイアウトコンテナのため `role`/`aria-*` は付与しない。`colorPalette` 軸も持たない。
- `@chakra-ui/react` の JS/TS API とは別物（Rust 製）。

## Related

- [Data List](./data-list.md)
- [Table](./table.md)
