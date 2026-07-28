# Number Input

増減トリガー付きの数値入力。`spinbutton` の ARIA 意味論を持つ。

## Signature / Usage

```rust
use fandhe_frontend_headless_ui::number_input::{self, NumberInput};

let ni = NumberInput::new(Some(5.0), 0.0, 10.0, 1.0);

ni.root(vec![], vec![
    ni.label(vec![], vec![]),
    ni.control(vec![
        ni.input("qty", None, vec![]),
        ni.increment_trigger(None, false, vec![], vec![]),
        ni.decrement_trigger(None, false, vec![], vec![]),
    ]),
]);
```

フリー関数: `number_input::root(disabled, invalid, attrs, children)`, `label(disabled, invalid, input_id, attrs, children)`, `control(disabled, invalid, attrs, children)`, `input(name, id, value, min, max, flags: NumberInputFlags, attrs)`, `increment_trigger(input_id, disabled, attrs, children)`, `decrement_trigger(input_id, disabled, attrs, children)`。

## Anatomy

- `root`, `label`, `control`
- `input` — `<input type="text" role="spinbutton">`。`aria-valuemin`/`aria-valuemax` は常に発行され、`aria-valuenow`/`value` は値が設定されている場合のみ、`inputmode="decimal"`
- `increment-trigger` / `decrement-trigger` — `<button type="button" tabindex="-1">`

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `NumberInput::new(value, min, max, step)` | `Option<f64>, f64, f64, f64` | |
| `NumberInputFlags` | struct | `disabled`/`readonly`/`required`/`invalid` |
| `can_increment()` / `can_decrement()` | `bool` | トリガーの無効化判定用の範囲境界チェック |

## Notes

- ディスパッチアクション: `"increment"`, `"decrement"`, `"set"`（ペイロード `f64`）, `"clear"`
- `@ark-ui/react` の JS/TS API とは別物（Rust 製、`fandhe-frontend-headless-ui`）

## Related

- [Slider](./slider.md)
