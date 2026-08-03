# LinkOverlay

カード全面クリック化のための headless コンポーネント。chakra-ui の LinkBox/LinkOverlay パターンに倣う。`::before` 疑似要素は使わず、`overlay` 自身を `position: absolute; inset: 0;` で `root` 全面へ展開する方式を採る（CSS は styled 層の責務）。

## Anatomy

```
root (div)
  overlay (a)
```

## Signature / Usage

```rust
use fandhe_frontend_headless_ui::link_overlay::{root, overlay};

pub fn root(attrs: Vec<(&str, &str)>, children: Vec<Node>) -> Node;
pub fn overlay<'a>(href: &'a str, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node;
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `overlay.href` | `&str` | — | 遷移先 URL。危険な URL スキームは core の `render()` が属性ごと拒否する |

## Notes

- `root` は位置決めコンテキスト（styled 層が `position: relative` を当てる前提）
- `overlay` がフローから外れるため、`root` の高さは `overlay` 以外の子ノード（見出し・画像・説明文等）が確立する契約。`overlay` へはアクセシブルネームのみを `aria-label` 等で与える運用を推奨する
- `root` 内に複数の対話要素を混在させる場合、`overlay` より前面に出す z-index 調整は呼び出し側の責務（headless 層は既定値を持たない）
- `@ark-ui/react` の JS/TS API とは別物（Rust 製、SSR 向け headless UI。ark-ui には対応する headless 実体がない）

## Related

- [Link](./link.md)
- [Breadcrumb](./breadcrumb.md)
