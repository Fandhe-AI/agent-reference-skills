# Angle Slider

`fandhe_frontend_headless_ui::angle_slider`（AngleSlider）の headless anatomy に既定 CSS を追加する薄いラッパー。`size`/`palette` variant クラスを付与するため `root` のみ独自定義し、`label`/`control`/`hidden_input`/`value_text` は headless-ui の自由関数をそのまま再エクスポートする。

## Signature / Usage

```rust
use fandhe_frontend_pre_styled_ui::angle_slider;
use fandhe_frontend_pre_styled_ui::{ColorPalette, Size};
use fandhe_frontend_headless_ui::angle_slider::AngleSlider;

let s = AngleSlider::default();
let node = angle_slider::root(Size::Md, ColorPalette::Accent, &s, false, vec![], vec![]);
```

`thumb_styled(state: &AngleSlider, disabled: bool, attrs) -> Node` が `--fandhe-angle` custom property を含む `style` を組み立てる唯一のパーツ。`stylesheet() -> String` が静的 CSS 全量を返す。

## Anatomy

- `root` — `size`/`palette` クラスを付与するコンテナ
- `label` / `control` / `hidden-input` / `value-text` — headless-ui から再エクスポート
- `thumb` — 本モジュールの `thumb_styled` のみが組み立てる（headless 自由関数 `thumb` は再エクスポートしない）

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `size` | `Size`（`Sm` \| `Md` \| `Lg`、既定 `Md`） | `root` のトラック/thumb 寸法 custom property を切り替える |
| `palette` | `ColorPalette`（既定 `Accent`） | `Info`/`Success`/`Warning`/`Danger` を含む 5 色 |
| `disabled` | `bool` | `data-disabled` を付与 |

## Notes

- 動的な回転角は `thumb_styled` が組み立てる `style="--fandhe-angle: <deg>deg"` の 1 経路のみで伝搬する（canvas 不使用）。
- 状態機械 `AngleSlider` は本モジュールから再エクスポートしない。hydration が必要な場合は `fandhe_frontend_headless_ui::angle_slider::AngleSlider` を直接 import する。
- `@chakra-ui/react` の JS/TS API とは別物（Rust 製）。

## Related

- [AngleSlider (primitives/form)](../../primitives/form/angle-slider.md)
