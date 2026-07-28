# DateInput

`fandhe_frontend_headless_ui::date_input` の Label / Control / SegmentGroup / Segment / HiddenInput 5 パーツに既定 CSS を追加する styled ラッパー。`size` variant クラス付与のため styled `root` のみを本クレートで新設し、状態機械 `DateInput` はあえて再エクスポートしない。

## Signature / Usage

```rust
use fandhe_frontend_pre_styled_ui::date_input;
use fandhe_frontend_pre_styled_ui::Size;

let node = date_input::root(Size::Md, false, false, vec![], vec![]);
```

```rust
pub fn root<'a>(size: Size, disabled: bool, invalid: bool, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node;
```

`label`/`control`/`segment_group`/`segment`/`hidden_input`/`DateInputAction`/`DateSegment`/`DateSegmentFlags` は headless 層から選択的に再エクスポートされる。

## Anatomy

```
root
  label
  control
    segment-group
      segment
    hidden-input
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `root.size` | `Size` | `Md` | `--fandhe-date-input-segment-size`/`-font-size`（root スコープ custom property）を切り替える |
| `root.disabled` | `bool` | `false` | `data-disabled` を反映し `opacity: 0.5` |
| `root.invalid` | `bool` | `false` | `segment-group` の `data-invalid` に連動して `border-color` を danger 色へ |

## Data Attributes

| Part | Attribute | Values |
| --- | --- | --- |
| `root` / `segment-group` | `data-disabled` | 存在属性 |
| `segment-group` | `data-invalid` | 存在属性 |
| `segment` | `data-placeholder` | 存在属性（未入力時） |

`segment` はネイティブ `<input>` ではなく `div role="spinbutton" tabindex="0"` で、キーボード操作時のみ `:focus-visible` 相当の `box-shadow` フォーカスリングを持つ。

## Notes

- `size` のみが variant 軸。`color-palette` 軸はフォーム入力部品として提供しない
- granularity（hour/minute/second）・range 選択・locale 依存整形・キーボード操作の DOM 配線はスコープ外
- Themes は Primitives への薄いラッパーであり、既定 CSS のみを追加する。状態管理・hydration が必要な場合は Primitives の `DateInput` 状態機械を直接 import する
- `@ark-ui/react` の JS/TS API とは別物（Rust 製）

## Related

- [DateInput (primitives)](../../primitives/date-time/date-input.md)
- [DatePicker](./date-picker.md)
