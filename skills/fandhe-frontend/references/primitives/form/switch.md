# Switch

共有の2値 `Checkable` 状態機械（`Checkbox` と同一）の上に構築された二値トグルコントロール。

## Signature / Usage

```rust
use fandhe_frontend_headless_ui::switch::{self, Switch};

let sw = Switch::new(true);

sw.root(vec![], vec![
    sw.control(vec![
        sw.thumb(vec![], vec![]),
    ]),
    sw.label(vec![], vec![]),
    sw.hidden_input("notifications", "on", false, vec![]),
]);
```

フリー関数: `switch::root(checked, disabled, attrs, children)`, `control(checked, disabled, attrs, children)`, `thumb(checked, attrs, children)`, `label(checked, attrs, children)`, `hidden_input(name, value, checked, disabled, required, attrs)`。

## Anatomy

- `root` — `<div>`、`control` — `<div>`、`thumb` — `<span>`
- `label` — `<span>`
- `hidden-input` — `<input type="checkbox" role="switch">`

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `Switch::new(checked)` | `bool` | |
| `is_checked()` | `bool` | |
| `data_state()` | `&'static str` | `"checked"`/`"unchecked"` |

## Notes

- ディスパッチアクションは `crate::state::CheckableAction` から `SwitchAction` として再エクスポートされる: `"check"`/`"uncheck"`/`"toggle"`（`Checkbox` と同一の語彙）
- `@ark-ui/react` の JS/TS API とは別物（Rust 製、`fandhe-frontend-headless-ui`）

## Related

- [Checkbox](./checkbox.md)
- [Toggle](./toggle.md)
