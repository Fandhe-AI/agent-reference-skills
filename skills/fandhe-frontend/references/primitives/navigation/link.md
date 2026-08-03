# Link

汎用インラインリンク。素の `a` 要素 1 パーツ（anatomy `root`）のみを提供する最小構成の headless コンポーネント。

## Anatomy

```
root (a)
```

## Signature / Usage

```rust
use fandhe_frontend_headless_ui::link::root;

pub fn root<'a>(
    href: &'a str,
    external: bool,
    current: bool,
    attrs: Vec<(&'a str, &'a str)>,
    children: Vec<Node>,
) -> Node;
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `href` | `&str` | — | 遷移先 URL。危険な URL スキーム（`javascript:` 等）は core の `render()` が属性ごと拒否する |
| `external` | `bool` | — | `true` のとき `target="_blank"` + `rel="noopener noreferrer"` を不可分に付与する（reverse tabnabbing 対策。片方のみを付与する API は公開しない） |
| `current` | `bool` | — | `true` のとき `aria-current="page"` + `data-current` を付与する |

## Notes

- `external` が `true` のとき `target`/`rel` は必ずセットで付与される（片方だけの指定は不可）
- `@ark-ui/react` の JS/TS API とは別物（Rust 製、SSR 向け headless UI）

## Related

- [LinkOverlay](./link-overlay.md)
- [NavList](./nav-list.md)
