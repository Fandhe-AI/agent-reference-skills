# Pagination

Deterministically derives page number sequences (including ellipsis) from total item counts in O(boundary_count + sibling_count) time. Supports Button mode (SPA dispatch) and Link mode (SSR/SEO `href` navigation). No `data-state` (continuous positioning model, not open/closed).

## Signature / Usage

```rust
// Free functions (SSR, `fandhe_frontend_headless_ui::pagination`)
pub enum PageEntry { Page(u64), Ellipsis }

pub fn page_range(count: u64, page_size: u64, page: u64, sibling_count: u64, boundary_count: u64) -> Vec<PageEntry>

pub enum ItemMode<'a> {
    Button,
    Link { href: &'a str },
}

pub fn root<'a>(aria_label: &'a str, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn item<'a>(mode: ItemMode<'a>, page: u64, current: bool, disabled: bool, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn ellipsis<'a>(attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn prev_trigger<'a>(mode: ItemMode<'a>, disabled: bool, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn next_trigger<'a>(mode: ItemMode<'a>, disabled: bool, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn first_trigger<'a>(mode: ItemMode<'a>, disabled: bool, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn last_trigger<'a>(mode: ItemMode<'a>, disabled: bool, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node

// State machine (CSR/hydration, implements `Component` + `Hydrate`)
pub enum PaginationAction { Goto(u64), Next, Prev, First, Last }

pub struct Pagination { /* count, page_size, sibling_count, boundary_count, page */ }
impl Pagination {
    pub fn new(count: u64, page_size: u64, sibling_count: u64, boundary_count: u64, page: u64) -> Self
    pub fn count(&self) -> u64
    pub fn page_size(&self) -> u64
    pub fn sibling_count(&self) -> u64
    pub fn boundary_count(&self) -> u64
    pub fn page(&self) -> u64
    pub fn total_pages(&self) -> u64
    pub fn page_entries(&self) -> Vec<PageEntry>
    pub fn can_next(&self) -> bool
    pub fn can_prev(&self) -> bool
    // 現在ページを注入する利便メソッド: root(aria_label, attrs, children) / item(mode, page, disabled, attrs, children)
    // prev_trigger(mode, ..) / next_trigger(mode, ..) / first_trigger(mode, ..) / last_trigger(mode, ..)
    // （first_trigger は !can_prev()、last_trigger は !can_next() を disabled に注入）
}
```

## Anatomy

```
root
  first-trigger
  prev-trigger
  item
  ellipsis
  next-trigger
  last-trigger
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| mode | `ItemMode` | `Button`（SPA dispatch）または `Link { href }`（SSR/SEO 遷移） |
| page | `u64` | `item` のページ番号。`data-index` に 10 進数文字列で出力 |
| current | `bool` | `item` が現在ページかどうか（`aria-current="page"` + `data-selected`） |
| disabled | `bool` | 端到達時の `prev_trigger`/`next_trigger`/`first_trigger`/`last_trigger`（ネイティブ `disabled` は Button mode のみ。両モードで `aria-disabled` + `data-disabled`） |

## Notes

- `ellipsis` は `aria-hidden="true"` 固定
- `PaginationAction::Goto`/`Next`/`Prev` は `[1, total_pages]` へ clamp する
- `root` は `<nav aria-label>`、Button mode の `item` / トリガーは `<button type="button">`、Link mode は `<a href>`。`PaginationAction::First` / `Last`（dispatch `"first"` / `"last"`）は `page` を `1` / `total_pages` へ移す。`page_size == 0` は `1` へ丸められ、`count == 0` でも `total_pages` は `1`
- 呼び出し側 `attrs` による固定付与キー（`data-selected` / `data-index` / `aria-current` / `href` / `type` / `disabled` / `aria-disabled` / `data-disabled`）の上書きは除去される
- キーボード操作は独自実装を持たず、ネイティブ `<button>` / `<a>` の Tab / Shift+Tab・Enter / Space（Link mode は Enter）に委ねる。クリック配線はクライアント層の責務
- `@ark-ui/react` の JS/TS API とは別物（Rust 製）

## Related

- [carousel](./carousel.md)
