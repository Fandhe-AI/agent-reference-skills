# EmptyState

検索結果0件・初期状態などコンテンツが存在しないことを示すレイアウトコンテナ。`role`/`aria-*` を付与しない中立的なコンテナ（slot recipe styled 部品）。読み込み中のプレースホルダーには Skeleton を使う。

## Anatomy

```
root
  content
    indicator
    title
    description
    actions
```

## Signature / Usage

```rust
use fandhe_frontend_pre_styled_ui::empty_state::{root, content, EmptyStateProps};

let node = root(&EmptyStateProps::default(), vec![], vec![
    content(vec![], vec![]),
]);

pub fn root<'a>(props: &EmptyStateProps, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn content<'a>(attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn indicator<'a>(attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn indicator_with<'a>(variant: EmptyStateIndicatorVariant, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn title<'a>(attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn description<'a>(attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn actions<'a>(attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn css() -> String
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `EmptyStateProps.size` | `Size` | `Md` | `Sm` / `Md` / `Lg`。`root` の `--fandhe-empty-state-*` custom property 経由で padding・`content` の gap・`indicator` / `title` / `description` の font-size を連動させる |
| `EmptyStateProps.variant` | `EmptyStateVariant` | `Plain` | `Plain`（枠線・背景なし、class 非出力）/ `Outline`（破線枠）/ `Subtle`（淡色単色背景） |
| `indicator_with.variant` | `EmptyStateIndicatorVariant` | `Plain` | `Plain`（`indicator` と同一出力）/ `Boxed`（`bg-muted` の角丸タイル） |

## Notes

- `title` は `<div>`（固定レベルの見出し要素を強制しない設計）
- `root` を含む全パーツが `role`/`aria-*` を一切付与しない
- `@chakra-ui/react` の JS/TS API とは別物（Rust 製）

## Related

- [Skeleton](./skeleton.md)
