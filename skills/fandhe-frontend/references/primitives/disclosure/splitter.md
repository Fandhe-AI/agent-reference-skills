# Splitter

リサイズ可能なパネル分割レイアウトの headless コンポーネント。`root`/`panel`/`resize_trigger`/`resize_trigger_indicator` の自由関数と、パネルサイズ状態機械 `Splitter` を提供する。

## Signature / Usage

```rust
use fandhe_frontend_headless_ui::splitter::{self, PanelSpec, Splitter};
use fandhe_frontend_headless_ui::data_attrs::Orientation;

// SSR: 自由関数を直接呼ぶ
splitter::root(orientation: Orientation, disabled: bool, attrs, children);
splitter::panel(id: &str, index: usize, orientation: Orientation, attrs, children);
splitter::resize_trigger(orientation: Orientation, min: &str, max: &str, now: &str, leading_id: &str, trailing_id: &str, disabled: bool, attrs, children);
splitter::resize_trigger_indicator(attrs, children);

// CSR/hydration: 状態機械
let s = Splitter::new(
    &[PanelSpec::new(60.0, 0.0, 100.0), PanelSpec::new(40.0, 0.0, 100.0)],
    Orientation::Horizontal,
);
s.panel(0, "panel-0", vec![], vec![]);
s.resize_trigger(0, "panel-0", "panel-1", false, vec![], vec![]);
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
| `panel.id` | `&str` | `resize_trigger` の `aria-controls` 先として必須。`id` と `data-id` に出力 |
| `panel.index` | `usize` | パネル序数。`data-index` に出力（`Splitter::panel` では第 1 引数） |
| `resize_trigger.min` / `max` / `now` | `&str` | `aria-valuemin`/`aria-valuemax`/`aria-valuenow`（先行パネルのサイズ%） |
| `resize_trigger.leading_id` / `trailing_id` | `&str` | 隣接 2 パネルの id。`aria-controls` に `"<leading> <trailing>"`（空白区切り）、`data-id` に `"<leading>:<trailing>"` を出力 |
| `resize_trigger.disabled` | `bool` | `true` で `tabindex="-1"` + `aria-disabled`、`false` で `tabindex="0"` |
| `Splitter::new(panels, orientation)` | `&[PanelSpec]`, `Orientation` | `PanelSpec { size, min, max }` の配列からパネル構成を正規化して生成。実現不能な構成（パネル数2未満、`min > max`、mins合計>100 等）は既定（2パネル50/50、制約`[0.0, 100.0]`）へフォールバック |

## Data Attributes

| Part | Attribute | Values |
|------|-----------|--------|
| `root` | `data-orientation` | `horizontal` \| `vertical` |
| `panel` | `data-orientation` | `horizontal` \| `vertical` |
| `resize-trigger` | `data-orientation` | `horizontal` \| `vertical` |
| `root` / `resize-trigger` | `data-disabled` | 存在属性（`disabled=true` のとき） |
| `panel` | `data-index` | パネル序数 |
| `panel` | `data-id` | パネル id |
| `resize-trigger` | `data-id` | `"<leading_id>:<trailing_id>"` |

## Accessibility

- `resize_trigger` に `role="separator"`、`aria-valuemin`/`aria-valuemax`/`aria-valuenow`、`aria-controls`（隣接 2 パネルの id を空白区切り）を常に出力
- `aria-orientation` はセパレータ自体が伸びる向きを表し、パネルレイアウトの向き（`data-orientation`）とは意図的に逆になる（パネル横並びなら `aria-orientation="vertical"`）
- `disabled=true` のとき `tabindex="-1"` + `aria-disabled="true"`、`false` のとき `tabindex="0"`（実際の操作配線はスコープ外）

## Notes

- dispatch は `"set"`（payload `"<trigger>:<size>"`）/`"increment"`/`"decrement"`/`"home"`/`"end"`/`"increment_large"`/`"decrement_large"`（payload は trigger index。増減ステップは 1.0%、`*_large` は 10 倍の 10.0%。Shift+Arrow 相当で、キー配線は未実装）
- 呼び出し側 `attrs` による固定付与キー（`role` / `aria-*` / `tabindex` / `data-*` / `id` 等）の上書きは除去される（`aria-label` / `aria-labelledby` は拡張点として上書き可）
- pointer ドラッグ・F6 によるトリガー間フォーカス循環・Enter による collapse/expand の DOM 配線はスコープ外。Arrow / Home / End のキー配線のみクライアント層で配線済み
- collapse/expand・`onResize`/`onCollapse` コールバック・ネスト registry はスコープ外
- `@ark-ui/react` の JS/TS API とは別物（Rust 製）

## Related

- [ScrollArea](./scroll-area.md)
