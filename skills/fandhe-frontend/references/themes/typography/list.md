# List

`<ul>`/`<ol>` によるリスト表示を組み立てる slot recipe styled 部品（`root`/`item`/`indicator` の 3 パーツ）。

## Anatomy

```
root (ul/ol)
  item (li)
  indicator (span, aria-hidden="true")
```

## Signature / Usage

```rust
use fandhe_frontend_pre_styled_ui::list::{self, ListType, ListVariant};

let node = list::root(ListType::default(), ListVariant::default(), vec![], vec![
    list::item(vec![], vec![/* ... */]),
]);
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| list_type | `ListType` | `Unordered` | レンダリングするタグ選択。`Unordered`（`<ul>`） / `Ordered`（`<ol>`） |
| variant | `ListVariant` | `Marker` | `Marker`（既定マーカー表示） / `Plain`（マーカーなし、`indicator` によるカスタムマーカー用） |

`root(list_type, variant, attrs, children)` / `item(attrs, children)` / `indicator(attrs, children)` の 3 関数で構成する。

## Notes

- `@chakra-ui/react` の JS/TS API とは別物（Rust 製）。
- `list_type` と `variant` は独立した軸（`heading::HeadingLevel` と同型のタグ選択方式）。
- `indicator` は装飾用カスタムマーカーで、常に `aria-hidden="true"` を固定する（呼び出し側は外せない fail-closed 仕様）。
- `ol` の `start`/`reversed` 属性は `attrs` からそのまま透過する。
- colorPalette 軸は持たない（`indicator` の色は呼び出し側が children/attrs で指定する）。

## Related

- [Text](./text.md)
