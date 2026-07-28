# Code

インラインコード片（`<code>`）を組み立てる単一 slot styled 部品。variant 軸を持たない。

## Anatomy

```
root (code)
```

## Signature / Usage

```rust
use fandhe_frontend_pre_styled_ui::code::code;

let node = code(vec![], vec![/* children */]);
```

## Notes

- `@chakra-ui/react` の JS/TS API とは別物（Rust 製）。
- variant 軸を持たないため `class` 属性は出力しない（呼び出し側の `class` は破棄する）。
- chakra-ui v3 の `CodeBlock`（複数行コードブロック）に相当する機能は対象外。インライン `<code>` のみを扱う。

## Related

- [Kbd](./kbd.md)
