# Link

`fandhe-frontend-headless-ui` の `link::root` を薄くラップした styled Link 部品。`variant` で `text-decoration` を切り替え、`aria-current="page"` 状態を CSS で装飾する。

## Anatomy

```
root (a)
```

## Signature / Usage

```rust
use fandhe_frontend_pre_styled_ui::link::{self, LinkVariant};

let node = link::root("/docs", false, false, LinkVariant::default(), vec![], vec![/* children */]);
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| href | `&str` | — | リンク先 URL |
| external | `bool` | — | `true` なら `target="_blank"` + `rel="noopener noreferrer"` を付与 |
| current | `bool` | — | `true` なら `aria-current="page"` を出力（headless 層契約） |
| variant | `LinkVariant` | `Plain` | `Plain`（下線なし） / `Underline`（常時下線） |

## Notes

- `@chakra-ui/react` の JS/TS API とは別物（Rust 製）。
- Primitives の [Link](../../primitives/navigation/link.md)（`fandhe-frontend-headless-ui`）の唯一の anatomy パーツ `root` を再利用し、既定 CSS を追加するだけの薄いラッパー。
- `href` の URL スキーム検証は headless 層（primitives）が担う。
- `aria-current="page"` の状態では `font-weight` を太字化する状態セレクタを CSS 側に登録する（追加の bool 引数は持たない）。

## Related

- [Primitives: Link](../../primitives/navigation/link.md)
- [Link Overlay](./link-overlay.md)
