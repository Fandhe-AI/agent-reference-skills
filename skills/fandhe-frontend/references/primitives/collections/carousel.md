# Carousel

Slide navigation UI component (8 anatomy parts: Root, Control, PrevTrigger, NextTrigger, ItemGroup, Item, IndicatorGroup, Indicator). Provides `role="region"` + `aria-roledescription` + deterministic index state machine, no transition CSS or layout styling.

## Signature / Usage

```rust
// Free functions (SSR, `fandhe_frontend_headless_ui::carousel`)
pub fn root<'a>(orientation: Orientation, label: &'a str, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn control<'a>(orientation: Orientation, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn prev_trigger<'a>(orientation: Orientation, disabled: bool, aria_label_text: &'a str, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn next_trigger<'a>(orientation: Orientation, disabled: bool, aria_label_text: &'a str, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn item_group<'a>(orientation: Orientation, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn item<'a>(orientation: Orientation, index: usize, count: usize, current: bool, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn indicator_group<'a>(orientation: Orientation, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn indicator<'a>(orientation: Orientation, index: usize, current: bool, attrs: Vec<(&'a str, &'a str)>) -> Node

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
    // 利便メソッド（向きと現在状態を注入）:
    //   root(label, attrs, children) / control(attrs, children)
    //   prev_trigger(aria_label_text, attrs, children) / next_trigger(aria_label_text, attrs, children)
    //   item_group(attrs, children) / item(index, attrs, children)
    //   indicator_group(attrs, children) / indicator(index, attrs)
}

pub enum CarouselAction { Next, Prev, Goto(usize), First, Last }
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
| orientation | `Orientation` | 全 8 パーツの `data-orientation`（自由関数の先頭引数。`Carousel` のメソッドは保持している向きを自動注入） |
| label | `&str` | `root` の `aria-label`（必須、空文字は拒否しない） |
| index / slide_count | `usize` | 現在スライド位置・総数（`Carousel::new` で `index >= slide_count` は `0` へ正規化） |
| loop_ | `bool` | 端で循環するかどうか |
| disabled | `bool` | `prev_trigger`/`next_trigger` の無効状態（ネイティブ `disabled` + `data-disabled`） |
| current | `bool` | `item`/`indicator` が現在位置かどうか（`data-current`） |

## Data Attributes

| Part | Attribute | Values |
| --- | --- | --- |
| 全パーツ | `data-orientation` | `horizontal` \| `vertical` |
| item / indicator | `data-index` | 0-origin のスライド位置 |
| item | `data-inview` | 存在属性（現在スライド。1 スライド表示固定のため `data-current` と同値） |
| item / indicator | `data-current` | 存在属性（現在位置） |
| prev-trigger / next-trigger | `data-disabled` | 存在属性 |

## Notes

- `item` は `role="group"` + `aria-roledescription="slide"` + `aria-label="{index+1} of {count}"`、`indicator` は `<button type="button" aria-label="Go to slide {index+1}">`（現在位置で `aria-current="true"`）。`Carousel::item_group` は `--fandhe-carousel-index` を `style` に出力する
- dispatch: `"next"` / `"prev"` / `"goto"`（index payload）/ `"first"` / `"last"`（Home / End 相当）。非 current スライドへ `aria-hidden` は付与しない（CSS で隠す呼び出し側が `attrs` で渡す）。`progress-text` / `autoplay-trigger` パーツは未提供
- 呼び出し側 `attrs` による固定付与キー（`data-orientation` / `data-index` / `data-inview` / `data-current` / `data-disabled` / `aria-current`）の上書きは除去される
- `CarouselAction::Next`/`Prev` は端で `loop_ = false` なら no-op、`true` なら循環。`Goto(i)` は `i >= slide_count` を fail-closed に無視する
- `item_group` の `aria-live` は常に `"polite"` 固定（autoplay 非対応）
- autoplay・pointer ドラッグ・キーボード操作の DOM 配線はスコープ外（クライアントランタイム側の責務）
- `@ark-ui/react` の JS/TS API とは別物（Rust 製）

## Related

- [combobox](./combobox.md)
- [pagination](./pagination.md)
