# Number Input

増減トリガー付きの数値入力。`spinbutton` の ARIA 意味論を持つ。

## Signature / Usage

```rust
use fandhe_frontend_headless_ui::number_input::{self, NumberInput, NumberInputFlags};

let ni = NumberInput::new(Some(5.0), 0.0, 10.0, 1.0);
let flags = NumberInputFlags::default();

ni.root(flags, vec![], vec![
    ni.label(flags, Some("qty"), vec![], vec![]),
    ni.control(flags, vec![], vec![
        ni.input("qty", Some("qty"), flags, vec![]),
        ni.increment_trigger(Some("qty"), false, vec![], vec![]),
        ni.decrement_trigger(Some("qty"), false, vec![], vec![]),
    ]),
    ni.value_text(flags, vec![]),
]);
```

フリー関数: `number_input::root(flags: NumberInputFlags, attrs, children)`, `label(flags, input_id: Option<&str>, attrs, children)`, `control(flags, attrs, children)`, `input(name, id: Option<&str>, value: Option<&str>, min: &str, max: &str, flags, attrs)`, `value_text(flags, attrs, children)`, `increment_trigger(input_id: Option<&str>, disabled, attrs, children)`, `decrement_trigger(input_id, disabled, attrs, children)`。`NumberInput` のメソッドは現在値・範囲を自動注入し、`increment_trigger` / `decrement_trigger` の `disabled` は `can_increment()` / `can_decrement()` と OR 合成される。

## Anatomy

- `root` — `<div>`、`label` — `<label>`（`input_id` が `Some` のとき `for`）、`control` — `<div role="group">`
- `input` — `<input type="text" role="spinbutton">`。`aria-valuemin`/`aria-valuemax` は常に発行され、`aria-valuenow`/`value` は値が設定されている場合のみ、`inputmode="decimal"`、既定で `aria-roledescription="numberfield"` / `autocomplete="off"` / `autocorrect="off"` / `spellcheck="false"`（呼び出し側 `attrs` に同名キーがあれば省略）
- `increment-trigger` / `decrement-trigger` — `<button type="button" tabindex="-1">`、`input_id` が `Some` のとき `aria-controls`、既定 `aria-label` は `"increment"` / `"decrement"`（呼び出し側 `attrs` に `aria-label` があれば省略）
- `value-text` — `<span>`、表示テキストは `children`（`NumberInput::value_text` は整形済み現在値を注入）

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `NumberInput::new(value, min, max, step)` | `Option<f64>, f64, f64, f64` | 正規化: `min`/`max` 非有限は `f64::MIN` / `f64::MAX`、`min > max` は入れ替え、`step <= 0` は `1.0`、`value` は `[min, max]` へ clamp（非有限は `None`） |
| `NumberInputFlags` | struct | `disabled`/`readonly`/`required`/`invalid`（既定すべて `false`） |
| `can_increment()` / `can_decrement()` | `bool` | トリガーの無効化判定用の範囲境界チェック（未入力は常に `true`） |
| `formatted_value()` | `String` | 現在値の整形済み文字列（未入力は空文字列） |

## Data Attributes

| Part | Attribute | Values |
| --- | --- | --- |
| root / control / value-text | `data-disabled` / `data-invalid` / `data-readonly` | 存在属性（`NumberInputFlags` に対応） |
| label | `data-disabled` / `data-invalid` / `data-required` | 存在属性 |
| input | `data-disabled` / `data-invalid` / `data-required` / `data-readonly` | 存在属性（ネイティブ `disabled` / `readonly` / `required` と `aria-invalid="true"` も併せて出力） |
| increment-trigger / decrement-trigger | `data-disabled` | 存在属性（ネイティブ `disabled` も併せて出力） |

## Notes

- `control` は `role="group"` を固定し、`aria-disabled="true"` / `aria-invalid="true"` を状態から強制決定する（呼び出し側 `attrs` の同名キーは除去される）
- `data-state` は持たない。Scrubber、`pattern` / `aria-valuetext`、修飾キーによる step 倍率は未提供
- ArrowUp / ArrowDown・Home / End・Enter の keydown 配線はクライアント層（wasm-full）が担う
- ディスパッチアクション: `"increment"`, `"decrement"`, `"set"`（ペイロード `f64`）, `"clear"`, `"home"`（`min` へ）, `"end"`（`max` へ）
- `@ark-ui/react` の JS/TS API とは別物（Rust 製、`fandhe-frontend-headless-ui`）

## Related

- [Slider](./slider.md)
