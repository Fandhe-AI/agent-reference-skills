# Kbd

キーボード入力・ショートカット表示のための `<kbd>` を組み立てる単一 slot styled 部品。variant 軸を持たない。

## Anatomy

```
root (kbd)
```

## Signature / Usage

```rust
use fandhe_frontend_pre_styled_ui::kbd::kbd;

let node = kbd(vec![], vec![/* children */]);
```

## Notes

- `@chakra-ui/react` の JS/TS API とは別物（Rust 製）。
- variant 軸を持たないため `class` 属性は出力しない（呼び出し側の `class` は破棄する）。
- `font-family` は mono フォントトークンが存在しないため固定のフォントスタック文字列を直接宣言する。
- variant 軸（chakra-ui の `raised`/`outline`/`subtle`/`plain`）の追加は将来非破壊で可能だが、現状は未実装。

## Related

- [Code](./code.md)
