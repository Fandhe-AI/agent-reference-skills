# Em

文法的な強勢を表す強調テキスト（`<em>`）を既定スタイルで組み立てる、variant 軸を持たない最小静的部品。

## Anatomy

```
root (em)
```

## Signature / Usage

```rust
use fandhe_frontend_pre_styled_ui::em::em;

let node = em(vec![], vec![/* children */]);
```

## Notes

- `@chakra-ui/react` の JS/TS API とは別物（Rust 製）。
- variant 軸を持たないため `class` 属性は出力しない（呼び出し側の `class` は破棄する）。
- `font-style: italic` + `font-weight: medium` で表現する。重要性の強調（`font-weight: bold`）は [Strong](./strong.md) が担い、役割・見た目を区別する。

## Related

- [Strong](./strong.md)
