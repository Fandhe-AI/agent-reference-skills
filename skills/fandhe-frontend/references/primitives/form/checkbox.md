# Checkbox

単一の checked/unchecked/indeterminate 選択を扱うフォームコントロール。共有の 2 値 `Checkable` 状態機械の上に構築された、動的ディスパッチ/ハイドレーション状態機械（`Checkbox`）を持つ。

## Signature / Usage

```rust
use fandhe_frontend_headless_ui::checkbox::{self, Checkbox, CheckboxFlags, CheckedState, CheckboxProps};

let cb = Checkbox::new(true);

cb.root(CheckboxFlags::default(), vec![], vec![
    cb.control(CheckboxFlags::default(), vec![
        cb.indicator(CheckboxFlags::default(), vec![], vec![]),
    ]),
    cb.label(CheckboxFlags::default(), vec![], vec![]),
    cb.hidden_input("terms", "on", CheckboxFlags::default(), vec![]),
]);
```

フリー関数: `checkbox::root(props: &CheckboxProps, attrs, children)`, `control(props, attrs, children)`, `indicator(props, attrs, children)`, `label(props, attrs, children)`, `hidden_input(props, name, value, attrs)`。

## Anatomy

- `root` — `<label>`
- `control` — `<div aria-hidden="true">`（a11y は `hidden-input` が担う）
- `indicator` — `<div>`、`CheckedState::Unchecked` のとき `hidden`
- `label` — `<span>`
- `hidden-input` — `<input type="checkbox">`

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `CheckboxProps.checked` | `CheckedState`（`Unchecked` \| `Checked` \| `Indeterminate`） | `data-state` / `aria-checked` の唯一の情報源 |
| `CheckboxProps.disabled` / `invalid` / `required` / `readonly` | `bool` | `data-*` およびネイティブ属性として反映される |
| `CheckboxFlags` | struct | `Checkbox` の便利メソッドに渡す `disabled`/`invalid`/`required`/`readonly` の束 |

## Notes

- `Checkbox`（動的状態機械）は checked/unchecked（2値）のみを追跡する。`Indeterminate` は `CheckboxProps` を介した SSR 専用で、ディスパッチ/ハイドレーション経由では到達不能
- ディスパッチアクション: `"check"`, `"uncheck"`, `"toggle"`
- `@ark-ui/react` の JS/TS API とは別物（Rust 製、`fandhe-frontend-headless-ui`）

## Related

- [Checkbox Group](./checkbox-group.md)
- [Field](./field.md)
