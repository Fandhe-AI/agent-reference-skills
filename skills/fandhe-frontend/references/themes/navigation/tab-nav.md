# TabNav

見た目はタブ、意味論は素のナビゲーションリンク集合という部品。`role="tablist"`/`role="tab"` は使わず `<nav>`/`<a>` の暗黙 ARIA ロールのみを使い、現在ページは `aria-current="page"` で示す。headless-ui 層に対応する mod を持たない、pre-styled-ui 側のみで完結する新規 anatomy（`data-scope="tab-nav"`）。

## Anatomy

```
root
  link
```

## Signature / Usage

```rust
use fandhe_frontend_pre_styled_ui::tab_nav::{self, TabNavVariant};
use fandhe_frontend_pre_styled_ui::{ColorPalette, Size};

let node = tab_nav::root(Size::Md, "Section navigation", vec![], vec![
    tab_nav::link("/docs", true, vec![], vec![]),
]);

pub fn root<'a>(size: Size, label: &'a str, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node

// variant / palette 付き版。variant == Line かつ palette == None のとき root とバイト単位で同一の出力
pub fn root_with<'a>(
    size: Size,
    variant: TabNavVariant,
    palette: Option<ColorPalette>,
    label: &'a str,
    attrs: Vec<(&'a str, &'a str)>,
    children: Vec<Node>,
) -> Node

pub fn link<'a>(href: &'a str, current: bool, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn stylesheet() -> String
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `root: size` | `Size` | `Md` | `root` に付与するサイズ variant（padding / font-size の段進行） |
| `root_with: variant` | `TabNavVariant` | `Line` | `Line`（下線のみ）/ `Pill`（淡色の角丸コンテナ + 現在リンクを面で強調、`tabs` の `Enclosed` と同一外観）/ `Bar`（枠線・角丸・影を持つカード状バー、リンクを等幅・中央寄せで並べ縦の区切り線で仕切る。現在ページは下端 2px バーで強調） |
| `root_with: palette` | `Option<ColorPalette>` | `None` | 強調色を単一インスタンス単位で切り替える。`None` のとき `color-palette` クラスを付与しない |
| `root: label` | `&str` | — | `aria-label` として必須付与するラベル文字列 |
| `link: href` | `&str` | — | 遷移先 URL |
| `link: current` | `bool` | `false` | `true` のとき `aria-current="page"` + `data-current` を付与 |

## Data Attributes

| Part | Attribute | Values |
| --- | --- | --- |
| link | `data-current` | 現在ページのとき出力 |

## Notes

- `Tabs`（`role="tablist"`/`role="tab"` のパネル切り替え UI）とは異なり、パネルの概念を持たず `role` を一切出力しない
- `NavList`（縦方向の文書ナビ、リストマークアップあり）とは異なり、水平タブ外観の `root`/`link` 2 パーツのみで構成する
- `TabNavVariant::Pill` は `Shape::Pill`（`border-radius` のみの形状修飾）とは別物
- variant は見た目のみを切り替え、ナビゲーション意味論（`role` 非出力）には影響しない
- 危険な URL スキーム（`javascript:` 等）は core の `render()` が属性ごと拒否する
- `crates/headless-ui/` へは意図的に対応する mod を追加していない（本コンポーネントは pre-styled-ui 層のみで完結する）
- `@chakra-ui/react` の JS/TS API とは別物（Rust 製）

## Related

- [NavList](./nav-list.md)
