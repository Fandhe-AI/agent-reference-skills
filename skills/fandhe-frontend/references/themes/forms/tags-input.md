# Tags Input

`fandhe_frontend_headless_ui::tags_input` の clear-trigger / control / hidden-input / input / item / item-delete-trigger / item-input パーツをそのまま再エクスポートし、既定 CSS を追加提供する。`size` variant クラスは `root` にのみ付与する。

## Signature / Usage

```rust
use fandhe_frontend_pre_styled_ui::tags_input;
use fandhe_frontend_pre_styled_ui::Size;

let node = tags_input::root(Size::Md, false, vec![], vec![]);
```

`stylesheet() -> String` が静的 CSS 全量を返す。`clear_trigger`/`control`/`hidden_input`/`input`/`item`/`item_delete_trigger`/`item_input` は headless-ui からの再エクスポート。

## Anatomy

- `root` / `label` / `control`（`role="listbox"`、`item`（`role="option"`）/`input` を内包）
- `item`（`item-preview`/`item-text`/`item-delete-trigger` を内包）/ `hidden-input`

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `size` | `Size`（既定 `Md`） | `root` へクラス付与 |
| `disabled` | `bool` | `control`/`hidden-input`/`input`/`item`/`item-delete-trigger`/`root` へ `data-disabled` を反映 |

## Notes

- タグ上限到達時、`input` へ `aria-invalid` を付与する（`control`/`input` の `data-invalid`）。
- `@chakra-ui/react` の JS/TS API とは別物（Rust 製）。

## Related

- [Input](./input.md)
- [Tags Input (primitives/form)](../../primitives/form/tags-input.md)
