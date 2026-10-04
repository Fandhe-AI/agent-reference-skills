# Toolbar

ボタン・セパレータ・ToggleGroup の横方向グループ化を行う headless コンポーネント。Root / Button / Link / Separator / ToggleGroup / ToggleItem の 6 anatomy パーツと、roving tabindex（フォーカス移動）の状態機械と属性出力を提供する `Toolbar`。実 DOM のキー配線はスコープ外。

## Signature / Usage

```rust
use fandhe_frontend_headless_ui::data_attrs::Orientation;
use fandhe_frontend_headless_ui::toolbar::Toolbar;

let t = Toolbar::new(0, 3, false, Orientation::Horizontal);
let node = t.root(
    "Text formatting",
    vec![],
    vec![
        t.button(0, false, vec![], vec![]),
        t.separator(vec![], vec![]),
        t.button(1, false, vec![], vec![]),
    ],
);
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `Toolbar::new: focused` | `usize` | `0` | 現在フォーカス対象の index。範囲外は `0` へ正規化 |
| `Toolbar::new: item_count` | `usize` | `0` | 項目総数 |
| `Toolbar::new: loop_focus` | `bool` | `false` | 端で循環するか |
| `Toolbar::new: orientation` | `Orientation` | `Horizontal` | 向き（`aria-orientation`/`data-orientation`） |
| `root/button/link/separator/toggle_group/toggle_item: orientation` | `Orientation` | — | 自由関数の先頭引数（`separator` は `toolbar_orientation`）。`Toolbar` のメソッドは保持している向きを自動注入する |
| `Toolbar::button/link/toggle_item: index` | `usize` | — | 項目の index。`focused` の判定（roving tabindex）に使う |
| `root: label` | `&str` | — | 非空のときのみ `aria-label` を出力 |
| `button/link/toggle_item: focused` | `bool` | — | roving tabindex（`true`→`tabindex="0"`、`false`→`tabindex="-1"`） |
| `button/toggle_item: disabled` | `bool` | `false` | ネイティブ `disabled` は付与せず `aria-disabled`/`data-disabled` のみ（フォーカス順序に残す設計） |
| `toggle_item: pressed` | `bool` | — | 押下状態（`aria-pressed`/`data-state`/`data-pressed` に反映） |

## Data Attributes

| Part | Attribute | Values |
| --- | --- | --- |
| root / button / link / toggle-group / toggle-item | `data-orientation` | `horizontal` \| `vertical`（toolbar の向き） |
| separator | `data-orientation` | toolbar の向きと直交する値（横向き toolbar では `vertical`）。`aria-orientation` と同値 |
| button / toggle-item | `data-disabled` | 存在属性 |
| toggle-item | `data-state` | `on` \| `off` |
| toggle-item | `data-pressed` | 存在属性 |
| toggle-item | `data-value` | 呼び出し側指定の値 |

## Notes

- ARIA: `root` は `role="toolbar"` + `aria-orientation`、`separator` は `role="separator"` + 直交する `aria-orientation`、`toggle_group` は `role="group"` のみ（`group` に `aria-orientation` は許可されないため付与しない）、`toggle_item` は `aria-pressed`。`button` / `toggle_item` は `type="button"` を固定付与する。
- 各パーツは固定付与する属性（`role` / `aria-*` / `data-*` / `type` / `tabindex`）を呼び出し側 `attrs` で上書きできない（予約キーの除去）。
- dispatch アクション: `"next"`/`"prev"`/`"first"`/`"last"`/`"focus"`（payload は `usize`）。矢印キー・Home/End の実 DOM 配線はスコープ外。
- disabled 項目もフォーカス順序から除外しない（WAI-ARIA APG 推奨に従う設計判断）。
- `toggle_group`/`toggle_item` は toolbar 専用の anatomy パーツを新設しつつ、押下状態の語彙・状態機械は既存の `ToggleGroup`/`MultiToggleGroup`（再エクスポート）へ委譲する。
- `link` は `crate::link::root` へ完全委譲し、`external=true` 時の `target="_blank"`/`rel="noopener noreferrer"` を不可分に付与する。
- `@ark-ui/react` の JS/TS API とは別物（Rust 製）。Radix Primitives Toolbar 相当。

## Related

- [JsonTreeView](./json-tree-view.md)
