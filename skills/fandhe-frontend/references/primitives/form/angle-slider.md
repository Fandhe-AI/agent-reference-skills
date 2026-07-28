# Angle Slider

円形の単一角度値スライダー（`0..=359` 度）。未採用だったコンポーネントの再導入（issue #842）。ポインター/DOM に依存しない純粋で決定的な状態機械で角度値を解決する。

## Signature / Usage

```rust
use fandhe_frontend_headless_ui::angle_slider::{self, AngleSlider};

let slider = AngleSlider::new(40, 1); // value: u16 (0..=359), step: u16 (1..=359)

slider.root(false, vec![], vec![
    slider.control(false, vec![
        slider.thumb(false, vec![], vec![]),
        slider.hidden_input("angle", false, vec![]),
    ]),
]);
```

フリー関数: `angle_slider::root(disabled, attrs, children)`, `label(attrs, children)`, `control(disabled, attrs, children)`, `thumb(now, value_text, disabled, attrs, children)`, `hidden_input(name, value, disabled, attrs)`, `value_text(attrs, children)`。

## Anatomy

- `root` — `<div>`
- `label` — `<span>`
- `control` — `<div>`、`thumb` のポインター操作コンテナ
- `thumb` — `<div role="slider">`、`aria-valuemin="0"` / `aria-valuemax="360"` / `aria-valuenow` / `aria-valuetext="{value}deg"`
- `hidden-input` — フォーム送信用の `<input type="hidden">`
- `value-text` — `<span>`、呼び出し側が整形する表示テキスト

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `AngleSlider::new(value, step)` | `u16, u16` | `value` は `0..=359` に正規化される（`360` は `0` にマップ）。`step` は `1..=359` にクランプされる |
| `disabled` | `bool` | `thumb` に `data-disabled` / `aria-disabled` / `tabindex="-1"` を付与する |

## Notes

- ディスパッチアクション: `"set"`（ペイロード `u16`、ステップグリッドにスナップ）、`"increment"`、`"decrement"`（浮動小数点を使わない符号なし整数演算のみで 0/359 境界をラップする）
- ハイドレーション属性: `data-hydrate-value`、`data-hydrate-step`。不正/範囲外の値は `HydrateError` で拒否される（フェイルクローズ）
- `@ark-ui/react` の JS/TS API とは別物（Rust 製、`fandhe-frontend-headless-ui`）

## Related

- [Slider](./slider.md)
