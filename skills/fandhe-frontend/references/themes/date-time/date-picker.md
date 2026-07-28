# DatePicker

`fandhe_frontend_headless_ui::date_picker` の Root / Label / Control / Input / Trigger / ClearTrigger / Positioner / Content 8 パーツに既定 CSS を追加する styled ラッパー。`content` 内部に Themes の `calendar` を合成する想定。`size` variant クラス付与のため styled `root` のみを本クレートで新設し、状態機械 `DatePicker` はあえて再エクスポートしない。

## Signature / Usage

```rust
use fandhe_frontend_pre_styled_ui::date_picker;
use fandhe_frontend_pre_styled_ui::date_picker::OpenState;
use fandhe_frontend_pre_styled_ui::Size;

let node = date_picker::root(Size::Md, OpenState::Closed, vec![], vec![]);
```

```rust
pub fn root<'a>(size: Size, state: OpenState, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node;
```

`label`/`control`/`input`/`trigger`/`clear_trigger`/`positioner`/`content` は headless 層から選択的に再エクスポートされる。

## Anatomy

```
root
  label
  control
    input
    trigger
    clear-trigger
  positioner
    content
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `root.size` | `Size` | `Md` | `--fandhe-date-picker-input-padding`/`-content-padding`（root スコープ custom property）を切り替える |
| `root.state` | `OpenState` | `Closed` | `root` の開閉状態。`trigger` の `data-state="open"` 連動と対応 |

## Data Attributes

| Part | Attribute | Values |
| --- | --- | --- |
| `trigger` | `data-state` | `open` \| `closed` |

`data-state="open"` のとき `trigger` の `border-color` を強調色に切り替える。`trigger`/`input` はキーボード操作時のみ `:focus-visible` のフォーカスリングを持つ。

## Notes

- `content` 内部で Calendar（Themes）の styled パーツを組み合わせて描画する構成を想定
- `size` のみが variant 軸
- Themes は Primitives への薄いラッパーであり、既定 CSS のみを追加する。状態管理・hydration が必要な場合は Primitives の `DatePicker` 状態機械を直接 import する
- `@ark-ui/react` の JS/TS API とは別物（Rust 製）

## Related

- [DatePicker (primitives)](../../primitives/date-time/date-picker.md)
- [Calendar](./calendar.md)
- [DateInput](./date-input.md)
