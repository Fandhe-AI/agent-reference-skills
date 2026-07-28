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
pub fn item<'a>(mode: ItemMode<'a>, current: bool, disabled: bool, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn ellipsis<'a>(attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn prev_trigger<'a>(mode: ItemMode<'a>, disabled: bool, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn next_trigger<'a>(mode: ItemMode<'a>, disabled: bool, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node

// State machine (CSR/hydration, implements `Component` + `Hydrate`)
pub enum PaginationAction { Goto(u64), Next, Prev }

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
    // root/item/prev_trigger/next_trigger も現在ページを注入する利便メソッドとして提供
}
```

## Anatomy

```
root
  prev-trigger
  item
  ellipsis
  next-trigger
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| mode | `ItemMode` | `Button`（SPA dispatch）または `Link { href }`（SSR/SEO 遷移） |
| current | `bool` | `item` が現在ページかどうか（`aria-current="page"` + `data-selected`） |
| disabled | `bool` | 端到達時の `prev_trigger`/`next_trigger`（ネイティブ `disabled` は Button mode のみ） |

## Notes

- `ellipsis` は `aria-hidden="true"` 固定
- `PaginationAction::Goto`/`Next`/`Prev` は `[1, total_pages]` へ clamp する
- キーボード操作の詳細はドキュメント上未記載
- `@ark-ui/react` の JS/TS API とは別物（Rust 製）

## Related

- [carousel](./carousel.md)
