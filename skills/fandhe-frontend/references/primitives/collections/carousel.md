# Carousel

Slide navigation UI component (8 anatomy parts: Root, Control, PrevTrigger, NextTrigger, ItemGroup, Item, IndicatorGroup, Indicator). Provides `role="region"` + `aria-roledescription` + deterministic index state machine, no transition CSS or layout styling.

## Signature / Usage

```rust
// Free functions (SSR, `fandhe_frontend_headless_ui::carousel`)
pub fn root<'a>(orientation: Orientation, label: &'a str, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn control<'a>(attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn prev_trigger<'a>(disabled: bool, aria_label_text: &'a str, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn next_trigger<'a>(disabled: bool, aria_label_text: &'a str, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn item_group<'a>(attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn item<'a>(index: usize, count: usize, current: bool, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn indicator_group<'a>(attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn indicator<'a>(index: usize, current: bool, attrs: Vec<(&'a str, &'a str)>) -> Node

// State machine (CSR/hydration, implements `Component` + `Hydrate`)
pub struct Carousel { /* index, slide_count, loop_, orientation */ }
impl Carousel {
    pub fn new(index: usize, slide_count: usize, loop_: bool, orientation: Orientation) -> Self
    pub fn index(&self) -> usize
    pub fn slide_count(&self) -> usize
    pub fn is_loop(&self) -> bool
    pub fn orientation(&self) -> Orientation
    pub fn prev_disabled(&self) -> bool
    pub fn next_disabled(&self) -> bool
    // root/control/prev_trigger/next_trigger/item_group/item/indicator_group/indicator も
    // 現在状態を注入する利便メソッドとして提供
}

pub enum CarouselAction { Next, Prev, Goto(usize) }
```

## Anatomy

```
root
  item-group
    item
  control
    prev-trigger
    indicator-group
      indicator
    next-trigger
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| orientation | `Orientation` | `root` の向き（`data-orientation`） |
| label | `&str` | `root` の `aria-label`（必須、空文字は拒否しない） |
| index / slide_count | `usize` | 現在スライド位置・総数（`Carousel::new` で `index >= slide_count` は `0` へ正規化） |
| loop_ | `bool` | 端で循環するかどうか |
| disabled | `bool` | `prev_trigger`/`next_trigger` の無効状態（ネイティブ `disabled` + `data-disabled`） |
| current | `bool` | `item`/`indicator` が現在位置かどうか（`data-current`） |

## Notes

- `CarouselAction::Next`/`Prev` は端で `loop_ = false` なら no-op、`true` なら循環。`Goto(i)` は `i >= slide_count` を fail-closed に無視する
- `item_group` の `aria-live` は常に `"polite"` 固定（autoplay 非対応）
- autoplay・pointer ドラッグ・キーボード操作の DOM 配線はスコープ外（クライアントランタイム側の責務）
- `@ark-ui/react` の JS/TS API とは別物（Rust 製）

## Related

- [combobox](./combobox.md)
- [pagination](./pagination.md)
