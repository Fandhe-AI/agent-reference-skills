# Quote

文中に埋め込む短いインライン引用（`<q>`）を既定スタイルで組み立てる、variant 軸を持たない最小静的部品。

## Anatomy

```
root (q)
```

## Signature / Usage

```rust
use fandhe_frontend_pre_styled_ui::quote::quote;

let node = quote(vec![], vec![/* children */]);
```

## Notes

- `@chakra-ui/react` の JS/TS API とは別物（Rust 製）。
- variant 軸を持たないため `class` 属性は出力しない（呼び出し側の `class` は破棄する）。
- `font-style: italic` の 1 宣言のみを持つ。ブラウザ既定の引用符生成コンテンツ（`q::before`/`q::after`）は上書きしない。
- ブロックレベルの構造・出典表示（`caption`）を持つ引用は [Blockquote](./blockquote.md) が担う。

## Related

- [Blockquote](./blockquote.md)
