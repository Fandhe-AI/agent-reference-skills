# Toggle

共有の2値 `Checkable` 状態機械の上に構築された、単一の押下/非押下トグルボタン。

## Signature / Usage

```rust
use fandhe_frontend_headless_ui::toggle::{self, Toggle};

let t = Toggle::new(false);

t.root(vec![], vec![
    t.indicator(vec![], vec![]),
]);
```

フリー関数: `toggle::root(pressed, disabled, attrs, children)`, `indicator(pressed, attrs, children)`。

## Anatomy

- `root` — `<button>`、`data-state`（`"on"`/`"off"` 形式の押下語彙）
- `indicator` — `<span>`

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `Toggle::new(pressed)` | `bool` | |
| `is_pressed()` | `bool` | |

## Notes

- ディスパッチアクションは `crate::state::CheckableAction` から `ToggleAction` として再エクスポートされる: `"check"`/`"uncheck"`/`"toggle"`
- `@ark-ui/react` の JS/TS API とは別物（Rust 製、`fandhe-frontend-headless-ui`）

## Related

- [Toggle Group](./toggle-group.md)
- [Switch](./switch.md)
