# TabNav

見た目はタブ、意味論は素のナビゲーションリンク集合という部品。`role="tablist"`/`role="tab"` は使わず `<nav>`/`<a>` の暗黙 ARIA ロールのみを使い、現在ページは `aria-current="page"` で示す。headless-ui 層に対応する mod を持たない、pre-styled-ui 側のみで完結する新規 anatomy（`data-scope="tab-nav"`）。

## Anatomy

```
root
  link
```

## Signature / Usage

```rust
use fandhe_frontend_pre_styled_ui::tab_nav;

let node = tab_nav::root("Section navigation", vec![], vec![
    tab_nav::link("/docs", true, vec![], vec![]),
]);
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `root: label` | `&str` | — | `aria-label` として必須付与するラベル文字列 |
| `link: href` | `&str` | — | 遷移先 URL |
| `link: current` | `bool` | `false` | `true` のとき `aria-current="page"` + `data-current` を付与 |

## Data Attributes

| Part | Attribute | Values |
| --- | --- | --- |
| link | `data-current` | 現在ページのとき出力 |

## Notes

- `Tabs`（`role="tablist"`/`role="tab"` のパネル切り替え UI）とは異なり、パネルの概念を持たず `role` を一切出力しない
- `NavList`（縦方向の文書ナビ、リストマークアップあり）とは異なり、水平タブ外観の `root`/`link` 2 パーツのみで構成する
- `size`/`color-palette` variant は非提供（`Toolbar`/`NavigationMenu` と同じ判断）
- 危険な URL スキーム（`javascript:` 等）は core の `render()` が属性ごと拒否する
- `crates/headless-ui/` へは意図的に対応する mod を追加していない（本コンポーネントは pre-styled-ui 層のみで完結する）
- `@chakra-ui/react` の JS/TS API とは別物（Rust 製）

## Related

- [NavList](./nav-list.md)
