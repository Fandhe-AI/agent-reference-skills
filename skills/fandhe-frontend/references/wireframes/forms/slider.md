# Slider (wireframe)

`fandhe-frontend-wireframe-ui` のスライダー風プレースホルダー。トラック + 円形ハンドルで進捗（Progress %）の配置イメージだけを示す非インタラクティブな部品。`<input type="range">`・ドラッグ・キーボード操作は実装しない。

## Signature / Usage

```rust
// fandhe-frontend-wireframe-ui 0.52.0 / src/slider.rs
#[must_use]
pub fn slider(
    value: u8,
    orientation: Orientation,
    size: Size,
    active: Active,
    disabled: Disabled,
) -> Node

// 呼び出し例
use fandhe_frontend_wireframe_ui::{slider, Active, Disabled, Orientation, Size};

slider(
    40,
    Orientation::Horizontal,
    Size::Md,
    Active(false),
    Disabled(false),
)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| value | `u8` | - | 進捗（0〜100 を想定）。100 超は 100 へクランプし、5 刻みへ量子化する（例: 42 → 40、43 → 45）。 |
| orientation | `Orientation` | `Orientation::Horizontal` | 水平（既定）/ 垂直。 |
| size | `Size` | `Size::Md` | サイズ段階（xs〜xl）。ハンドル直径・トラック太さに反映される。 |
| active | `Active` | `Active(false)` | true のとき `data-active=""` を付与する（ハンドルへフォーカス風のリングを表示する）。 |
| disabled | `Disabled` | `Disabled(false)` | true のとき `data-disabled=""` を付与する（見た目のみ。操作不能を実装するものではない）。 |

## Notes

- 出典: https://fandhe-ai.github.io/fandhe-frontend/wireframes/slider/
- 低忠実度のワイヤーフレーム部品であり、Primitives / Themes の同名 Slider とは別物。操作可能なスライダーが必要な場合は Themes / Primitives の Slider を使う
- `@ark-ui/react` / `@chakra-ui/react` の JS/TS API とは無関係（Rust 製）
- ルートは `div`。`role` / `aria-*` / `tabindex` / `style` / `on*`・`<input type="range">` は出力しない
- 進捗は 0〜100 へクランプして 5 刻みに丸め（四捨五入相当）、固定 class `fw-wire-slider-value-<q>`（21 種）を付与する。`style` 属性や動的な CSS 値の組み立ては行わず、進捗値を `data-value` 等の `data-*` へ出力もしない
- 向きは共通型 `Orientation`（専用列挙は無い）。状態は専用 `SliderState` 無しで `Active` / `Disabled` に畳み込む
- 値ラベル（`aria-valuenow` 相当の表示テキスト）用の引数は無い
- 文字列引数を持たない（`u8` 1 個のみ）ため、テキスト引数のエスケープ回帰テストは対象外
- 配色は `--fw-wire-*` トークン（`ink` / `fill` / `paper` / `line-subtle`）

## Related

- [Forms overview](./overview.md)
- [共通型 (Size / Orientation / Active / Disabled)](../foundations/common-types.md)
- [Slider (Themes)](../../themes/forms/slider.md)
- [Slider (Primitives)](../../primitives/form/slider.md)
