# Highlight

テキスト中の一致語句を `<mark>` で強調する単一 recipe styled 静的部品。一致判定は決定的な素朴部分文字列検索のみ（正規表現非対応、ReDoS 対策）。

## Anatomy

```
root (span)
  mark (mark)
```

## Signature / Usage

```rust
use fandhe_frontend_pre_styled_ui::highlight::{highlight, HighlightProps};

let node = highlight(
    &HighlightProps {
        query: &["fox"],
        ..HighlightProps::default()
    },
    vec![],
    "The quick brown fox",
);
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| query | `&[&str]` | `&[]` | 強調する語句（複数可）。空文字列要素は無視 |
| ignore_case | `bool` | `false` | 大文字小文字を無視する一致（ASCII 限定） |
| match_all | `bool` | `false` | `true` なら全一致箇所、`false` なら最初の 1 箇所のみ強調 |

## Notes

- `@chakra-ui/react` の JS/TS API とは別物（Rust 製）。
- `query` は正規表現ではなく素朴な部分文字列としてのみ扱う（走査は最悪計算量が線形で ReDoS 経路を持たない）。
- 同一開始位置で複数クエリが一致する場合、最長のクエリを優先する（最左一致 → 最長優先 → `query` 配列先頭優先のタイブレーク）。
- `ignore_case` は ASCII 限定（Unicode ケースフォールディング非対応）。
- variant 軸（`size`/`color-palette`）は提供しない（中立な装飾部品）。

## Related

- [Mark](./mark.md)
