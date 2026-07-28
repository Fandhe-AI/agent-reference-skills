# Strong

重要性・緊急性を表す強調テキスト（`<strong>`）を既定スタイルで組み立てる、variant 軸を持たない最小静的部品。

## Anatomy

```
root (strong)
```

## Signature / Usage

```rust
use fandhe_frontend_pre_styled_ui::strong::strong;

let node = strong(vec![], vec![/* children */]);
```

## Notes

- `@chakra-ui/react` の JS/TS API とは別物（Rust 製）。
- variant 軸を持たないため `class` 属性は出力しない（呼び出し側の `class` は破棄する）。
- `font-weight: bold` で表現する。文法的な強勢の強調（`font-weight: medium`）は [Em](./em.md) が担い、見た目・役割を区別する。

## Related

- [Em](./em.md)
