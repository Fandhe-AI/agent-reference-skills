# Switch

`fandhe_frontend_headless_ui::switch` の control / hidden-input / label / thumb パーツをそのまま再エクスポートし、既定 CSS を追加提供する。`size`/`palette` variant クラスは `root` にのみ付与する。

## Signature / Usage

```rust
use fandhe_frontend_pre_styled_ui::switch::{self, SwitchProps};
use fandhe_frontend_pre_styled_ui::{ColorPalette, Size};

let node = switch::root(Size::Md, ColorPalette::Accent, false, &SwitchProps::default(), vec![], vec![]);
```

`root(size, palette, checked: bool, props: &SwitchProps, attrs, children) -> Node`。`root_with(size, palette, track: SwitchTrack, checked, props, attrs, children) -> Node` は `track` 軸付き版（`root` は `SwitchTrack::Default` で委譲）。`thumb_icon(checked: bool, show: ThumbIconShow, props: &SwitchProps, attrs, children) -> Node` はつまみ中央に重ねる装飾アイコン slot（`aria-hidden="true"` 固定、`thumb` の子として `Checked`/`Unchecked` 用を 1 個ずつ配置する想定）。`stylesheet() -> String` が静的 CSS 全量を返す。`control`/`thumb`/`hidden_input`/`label`/`SwitchAction` は headless-ui からの再エクスポート。

## Anatomy

- `root` / `hidden-input` / `control`（`thumb` を内包）/ `label`
- `thumb-icon` — `thumb` の子に置く on/off アイコン slot

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `size` | `Size`（`Xs` \| `Sm` \| `Md`（既定） \| `Lg` \| `Xl`） | トラック/thumb 寸法 |
| `palette` | `ColorPalette`（既定 `Accent`） | checked 時の色 |
| `track`（`root_with` のみ） | `SwitchTrack`（`Default` \| `Short`） | `Short` はつまみより細く短いトラックで、つまみがトラックからはみ出す形状。`Default` は `root` と出力一致 |
| `show`（`thumb_icon` のみ） | `ThumbIconShow`（`Checked` \| `Unchecked`） | どちらの状態でのみ表示するか |
| `checked` | `bool` | `data-state`（`"checked"`/`"unchecked"`）の源泉 |
| `props` | `&SwitchProps`（`disabled` / `readonly` / `invalid` / `required`: `bool`） | `data-disabled`/`data-invalid`/`data-required`/`data-readonly` を全パーツへ一律反映 |

## Notes

- `control`/`thumb` は `aria-hidden` を固定し、支援技術への二重announcement を防ぐ。ネイティブ `input[type="checkbox"][role="switch"]`（`hidden-input`）が意味論を担う。
- `@chakra-ui/react` の JS/TS API とは別物（Rust 製）。

## Related

- [Checkbox](./checkbox.md)
- [Toggle](./toggle.md)
- [Switch (primitives/form)](../../primitives/form/switch.md)
