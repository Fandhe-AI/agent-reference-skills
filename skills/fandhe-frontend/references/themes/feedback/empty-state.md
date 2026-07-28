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
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `EmptyStateProps.size` | `Size` | `Md` | `Sm` / `Md` / `Lg`。`root` の padding を切り替える |

## Notes

- `title` は `<div>`（固定レベルの見出し要素を強制しない設計）
- `root` を含む全パーツが `role`/`aria-*` を一切付与しない
- `@chakra-ui/react` の JS/TS API とは別物（Rust 製）

## Related

- [Skeleton](./skeleton.md)
