# Accordion

`fandhe_frontend_headless_ui::accordion` に既定 CSS を追加する styled ラッパー（`fandhe-frontend-pre-styled-ui`）。single モード（`item`/`item_trigger`/`item_indicator`/`item_content` の自由関数 + `Accordion` 状態機械）と multiple モード（`MultiAccordion`）を再エクスポートし、`size` variant クラス付与のため `root` のみを本クレートで再定義する。

## Signature / Usage

```rust
use fandhe_frontend_pre_styled_ui::accordion::{self, AccordionProps};
use fandhe_frontend_pre_styled_ui::Size;

let node = accordion::root(Size::Md, &AccordionProps::default(), vec![], vec![]);
// item/item_trigger/item_indicator/item_content は headless 層から
// そのまま再エクスポートされる（variant クラスなし）
```

`root(size: Size, props: &AccordionProps, attrs: Vec<(&str, &str)>, children: Vec<Node>) -> Node` のみが本モジュールで新設される styled パーツ。`item`/`item_trigger`/`item_indicator`/`item_content`/`Accordion`/`AccordionProps`/`MultiAccordion`/`OpenState`（および `MultiSelectAction` / `SingleSelectAction`）は `fandhe_frontend_headless_ui::accordion` から選択的に再エクスポートされる（headless 自由関数 `root` とは名前が衝突するため `pub use ...::*` は使わない）。

## Anatomy

```
root
  item
    item-trigger
      item-indicator
    item-content
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `root.size` | `Size` | `Md` | `root` へクラスを付与し、`--fandhe-accordion-trigger-padding`/`-content-padding`（root スコープの CSS custom property、CSS 継承で `item-trigger`/`item-content` へ伝播）を切り替える |
| `root.props` | `&AccordionProps` | `Vertical` / `false` | headless 側へそのまま透過する（CSS レシピは変更しない）。`orientation: Orientation`（既定 `Vertical`）は `data-orientation` として全パーツへ出力される。`disabled: bool`（既定 `false`）は全項目の一括 disabled で、項目単位の `disabled` 引数と OR 合成される。キーボード操作は wasm-full の keynav が `data-orientation` を読んで解釈する |

## Data Attributes

| Part | Attribute | Values |
| --- | --- | --- |
| `item` / `item-trigger` / `item-indicator` / `item-content` | `data-state` | `open` \| `closed` |

選択中 `item-trigger`（`color: var(--fandhe-color-accent)`）と `item-indicator`（`transform: rotate(180deg)`）を `data-state="open"` に連動して強調する。

## Notes

- `size` は accordion では唯一の variant 軸（`color-palette` 軸は持たない）
- `item-trigger` はキーボード操作時のみ `:focus-visible` のフォーカスリングを持つ
- Themes は Primitives（`fandhe_frontend_headless_ui::accordion`）への薄いラッパーであり、既定 CSS のみを追加する。パーツ関数自体の挙動は Primitives と同一
- `@ark-ui/react` の JS/TS API とは別物（Rust 製）
- `@chakra-ui/react` の JS/TS API とは別物（Rust 製）。

## Related

- [Accordion (primitives)](../../primitives/disclosure/accordion.md)
- [Tabs](./tabs.md)
