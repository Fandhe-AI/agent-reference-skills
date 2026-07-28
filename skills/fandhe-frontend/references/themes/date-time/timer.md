# Timer

`fandhe_frontend_headless_ui::timer` の Root / Area / Item / ItemValue / ItemLabel / Separator / Control / ActionTrigger 8 パーツと `Timer` 状態機械をそのまま再エクスポートし、既定 CSS を追加する styled ラッパー。variant（size 等）ごとのクラス切り替えはスコープ外。

## Signature / Usage

```rust
use fandhe_frontend_pre_styled_ui::timer::{root, Timer, TimerPhase};

let node = root(true, 10_000, 0, 1000, 0, TimerPhase::Idle, vec![], vec![]);

let mut t = Timer::countdown(2000, 500);
```

`root`/`area`/`item`/`item_value`/`item_label`/`separator`/`control`/`action_trigger`/`Timer`/`TimerPhase`/`TimerUnit`/`TimerControl` はすべて headless 層 `fandhe_frontend_headless_ui::timer::*` の再エクスポートで、variant 引数を持たない。

## Anatomy

```
root
  area
    item
      item-value
      item-label
    separator
  control
    action-trigger
```

## Data Attributes

| Part | Attribute | Values |
| --- | --- | --- |
| `item-value` | `data-state` | `completed` のとき強調色（`--fandhe-color-accent`） |

## Notes

- `area` を横並び flex コンテナ、`item` はセグメント値 + ラベルを縦積み中央揃えで表示する
- `item-value` は `font-variant-numeric: tabular-nums` で桁増減時の横幅ガタつきを防ぐ
- `separator` は `align-self: center` で `item` 群の縦中央に揃う
- `action-trigger` はキーボード操作時のみ `:focus-visible` のフォーカスリングを持つ
- variant（size 等）ごとのクラス切り替えはスコープ外。`setInterval` による実 tick 駆動は wasm 層のスコープ
- Themes は Primitives（`fandhe_frontend_headless_ui::timer`）への薄いラッパーであり、既定 CSS のみを追加する
- `@ark-ui/react` の JS/TS API とは別物（Rust 製）

## Related

- [Timer (primitives)](../../primitives/date-time/timer.md)
- [Calendar](./calendar.md)
