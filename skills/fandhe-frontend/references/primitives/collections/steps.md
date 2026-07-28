# Steps

Stage navigation (wizard) component (10 anatomy parts). Deterministic state machine derives three states per index (complete/current/incomplete). No visual indicator styling — structure, `aria-current="step"`, and boundary (first/last) detection only.

## Signature / Usage

```rust
// Free functions are not exposed; all parts are methods on `Steps`
// (`fandhe_frontend_headless_ui::steps`)
pub struct Steps { /* count, step, orientation */ }
impl Steps {
    pub fn new(count: usize, step: usize, orientation: Orientation) -> Self
    pub fn count(&self) -> usize
    pub fn step(&self) -> usize
    pub fn orientation(&self) -> Orientation
    pub fn is_completed(&self) -> bool

    pub fn root<'a>(&self, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
    pub fn list<'a>(&self, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
    pub fn item<'a>(&self, index: usize, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
    pub fn trigger<'a>(&self, index: usize, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
    pub fn indicator<'a>(&self, index: usize, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
    pub fn separator<'a>(&self, index: usize, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
    pub fn content<'a>(&self, index: usize, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
    pub fn completed_content<'a>(&self, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
    pub fn prev_trigger<'a>(&self, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
    pub fn next_trigger<'a>(&self, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
}

pub enum StepsAction { Next, Prev }
```

## Anatomy

```
root
  list
    item
      trigger
        indicator
    separator
  content
  completed-content
  prev-trigger
  next-trigger
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| count | `usize` | 総 step 数 |
| step | `usize` | 現在 step（`0..=count`） |
| orientation | `Orientation` | `root`/`list`/`item`/`separator` の `data-orientation` |
| index | `usize` | `item`/`trigger`/`indicator`/`separator`/`content` が参照する step 番号（`0..count`） |

## Notes

- 各 index の状態は `complete`（`index < step`）/ `current`（`index == step`）/ `incomplete`（それ以外）の3値。`data-state` と `data-complete`/`data-current`/`data-incomplete` の対で表現する
- `aria-current="step"` は現在 step の `trigger` にのみ付与する。`separator` は `role="separator"` + `aria-hidden="true"` で装飾要素としてアクセシビリティツリーから除外する
- `prev_trigger`/`next_trigger` は端（`step == 0` / `step == count`）でネイティブ `disabled` を自動付与する
- `@ark-ui/react` の JS/TS API とは別物（Rust 製）

## Related

- [pagination](./pagination.md)
