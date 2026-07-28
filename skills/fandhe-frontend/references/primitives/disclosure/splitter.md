# Splitter

リサイズ可能なパネル分割レイアウトの headless コンポーネント。`root`/`panel`/`resize_trigger`/`resize_trigger_indicator` の自由関数と、パネルサイズ状態機械 `Splitter` を提供する。

## Signature / Usage

```rust
use fandhe_frontend_headless_ui::splitter::{self, PanelSpec, Splitter};
use fandhe_frontend_headless_ui::data_attrs::Orientation;

// SSR: 自由関数を直接呼ぶ
splitter::root(orientation: Orientation, disabled: bool, attrs, children);
splitter::panel(id: &str, orientation: Orientation, attrs, children);
splitter::resize_trigger(orientation: Orientation, min: &str, max: &str, now: &str, controls: &str, disabled: bool, attrs, children);
splitter::resize_trigger_indicator(attrs, children);

// CSR/hydration: 状態機械
let s = Splitter::new(
    &[PanelSpec::new(60.0, 0.0, 100.0), PanelSpec::new(40.0, 0.0, 100.0)],
    Orientation::Horizontal,
);
s.resize_trigger(0, "panel-0", false, vec![], vec![]);
```

## Anatomy

```
root
  panel
  resize-trigger
    resize-trigger-indicator
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `root.orientation` | `Orientation` | パネルレイアウトの向き |
| `root.disabled` | `bool` | `data-disabled` へ反映 |
| `panel.id` | `&str` | `resize_trigger` の `aria-controls` 先として必須 |
| `resize_trigger.min` / `max` / `now` | `&str` | `aria-valuemin`/`aria-valuemax`/`aria-valuenow`（先行パネルのサイズ%） |
| `resize_trigger.controls` | `&str` | `aria-controls`（先行パネル id） |
| `resize_trigger.disabled` | `bool` | `true` で `tabindex="-1"` + `aria-disabled`、`false` で `tabindex="0"` |
| `Splitter::new(panels, orientation)` | `&[PanelSpec]`, `Orientation` | `PanelSpec { size, min, max }` の配列からパネル構成を正規化して生成。実現不能な構成（パネル数2未満、`min > max`、mins合計>100 等）は既定（2パネル50/50、制約`[0.0, 100.0]`）へフォールバック |

## Data Attributes

| Part | Attribute | Values |
|------|-----------|--------|
| `root` | `data-orientation` | `horizontal` \| `vertical` |
| `panel` | `data-orientation` | `horizontal` \| `vertical` |
| `resize-trigger` | `data-orientation` | `horizontal` \| `vertical` |

## Accessibility

- `resize_trigger` に `role="separator"`、`aria-valuemin`/`aria-valuemax`/`aria-valuenow`、`aria-controls`（先行パネル id）を常に出力
- `aria-orientation` はセパレータ自体が伸びる向きを表し、パネルレイアウトの向き（`data-orientation`）とは意図的に逆になる（パネル横並びなら `aria-orientation="vertical"`）
- `disabled=true` のとき `tabindex="-1"` + `aria-disabled="true"`、`false` のとき `tabindex="0"`（実際の操作配線はスコープ外）

## Notes

- dispatch は `"set"`（payload `"<trigger>:<size>"`）/`"increment"`/`"decrement"`/`"home"`/`"end"`
- pointer ドラッグ・キーボード操作の DOM 配線はクライアントランタイム側の後続責務としてスコープ外
- collapse/expand・`onResize`/`onCollapse` コールバック・ネスト registry はスコープ外
- `@ark-ui/react` の JS/TS API とは別物（Rust 製）

## Related

- [ScrollArea](./scroll-area.md)
