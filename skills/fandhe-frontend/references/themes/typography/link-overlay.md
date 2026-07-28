# Link Overlay

`fandhe-frontend-headless-ui` の `link_overlay`（`root`/`overlay` の 2 anatomy パーツ）を薄くラップし、「カード全面クリック化」の既定 CSS を追加する styled 部品。

## Anatomy

```
root (position: relative)
  overlay (position: absolute; inset: 0)
```

## Signature / Usage

```rust
use fandhe_frontend_pre_styled_ui::link_overlay;

let node = link_overlay::root(vec![], vec![
    // overlay は headless-ui::link_overlay::overlay を再エクスポート
]);
```

`overlay` は `fandhe_frontend_headless_ui::link_overlay::overlay` をそのまま re-export したもの（`fandhe_frontend_pre_styled_ui::link_overlay::overlay` としてアクセス可能）。

## Notes

- `@chakra-ui/react` の JS/TS API とは別物（Rust 製）。
- Primitives の [Link Overlay](../../primitives/navigation/link-overlay.md)（`fandhe-frontend-headless-ui`）の `root`/`overlay` を再利用する薄いラッパー。
- variant 軸を持たない。呼び出し側 `attrs` の `class` は破棄する。
- `root` に `overlay` 以外の子ノード（見出し・画像等）を配置して高さを確立する契約は呼び出し側の責務。

## Related

- [Primitives: Link Overlay](../../primitives/navigation/link-overlay.md)
- [Link](./link.md)
