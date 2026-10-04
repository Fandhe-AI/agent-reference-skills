# Angle Slider

円形の単一角度値スライダー（`0..=359` 度）。未採用だったコンポーネントの再導入（issue #842）。ポインター/DOM に依存しない純粋で決定的な状態機械で角度値を解決する。

## Signature / Usage

```rust
use fandhe_frontend_headless_ui::angle_slider::{self, AngleSlider, AngleSliderProps};

let slider = AngleSlider::new(40, 1); // value: u16 (0..=359), step: u16 (1..=359)
let props = AngleSliderProps::default();

slider.root(&props, vec![], vec![
    slider.control(&props, vec![], vec![
        slider.thumb(&props, vec![], vec![]),
    ]),
    slider.hidden_input("angle", false, vec![]),
]);
```

フリー関数: `angle_slider::root(props: &AngleSliderProps, attrs, children)`, `label(props, attrs, children)`, `control(props, attrs, children)`, `thumb(now: &str, value_text: &str, props, attrs, children)`, `hidden_input(name, value, disabled, attrs)`, `value_text(attrs, children)`, `marker_group(attrs, children)`, `marker(value: u16, current: u16, disabled, attrs, children)`。`AngleSlider` のメソッドは現在角度を自動注入する（`thumb(props, attrs, children)` は `aria-valuetext` を `"{value}deg"` で固定、`hidden_input(name, disabled, attrs)`、`marker(value, disabled, attrs, children)`）。

## Anatomy

- `root` — `<div>`
- `label` — `<span>`
- `control` — `<div role="presentation">`、`thumb` のポインター操作コンテナ
- `thumb` — `<div role="slider">`、`aria-valuemin="0"` / `aria-valuemax="360"` / `aria-valuenow` / `aria-valuetext="{value}deg"`
- `hidden-input` — フォーム送信用の `<input type="hidden">`
- `value-text` — `<span>`、呼び出し側が整形する表示テキスト
- `marker-group` — `<div>`、`marker` — `<div>`（目盛り 1 点）

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `AngleSlider::new(value, step)` | `u16, u16` | `value` は `0..=359` に正規化される（`360` は `0` にマップ）。`step` は `1..=359` にクランプされる |
| `AngleSliderProps.disabled` | `bool`（既定 `false`） | root / label / control / thumb に `data-disabled`。`thumb` は `tabindex="-1"` + `aria-disabled="true"`（それ以外は `tabindex="0"`） |
| `AngleSliderProps.readonly` | `bool`（既定 `false`） | root / label / control / thumb に `data-readonly`（`thumb` のフォーカス可能性は変えない） |
| `AngleSliderProps.invalid` | `bool`（既定 `false`） | root / label / control / thumb に `data-invalid` |

## Data Attributes

| Part | Attribute | Values |
| --- | --- | --- |
| root / label / control / thumb | `data-disabled` / `data-invalid` / `data-readonly` | 存在属性（`AngleSliderProps` に対応） |
| marker | `data-value` | 目盛り角度（`0..=359` へ正規化） |
| marker | `data-state` | `under-value` \| `at-value` \| `over-value`（現在角度との大小関係） |
| marker | `data-disabled` | 存在属性 |

## Notes

- `SetToMin`（Home 相当、`0` 度）/ `SetToMax`（End 相当、`0` 起点の step グリッド上で `360` 未満の最大値）アクションあり。Shift+Arrow の ×10 ステップは未提供。ポインタ座標 → 角度変換・DOM 配線はクライアント層の責務
- ディスパッチアクション: `"set"`（ペイロード `u16`、ステップグリッドにスナップ）、`"increment"`、`"decrement"`（浮動小数点を使わない符号なし整数演算のみで 0/359 境界をラップする）
- ハイドレーション属性: `data-hydrate-value`、`data-hydrate-step`。不正/範囲外の値は `HydrateError` で拒否される（フェイルクローズ）
- `@ark-ui/react` の JS/TS API とは別物（Rust 製、`fandhe-frontend-headless-ui`）

## Related

- [Slider](./slider.md)
