# Toggle Group

トグルボタンのグループ。単一選択版（`ToggleGroup`）と複数選択版（`MultiToggleGroup`）の2種類を提供する。

## Signature / Usage

```rust
use fandhe_frontend_headless_ui::toggle_group::{self, ToggleGroup, MultiToggleGroup, ToggleGroupProps};

let props = ToggleGroupProps::default();

let group = ToggleGroup::default();
group.item(&props, "bold", false, false, vec![], vec![]);

let multi = MultiToggleGroup::default();
multi.item(&props, "bold", false, false, vec![], vec![]);
```

フリー関数: `toggle_group::root(props: &ToggleGroupProps, labelled_by: Option<&str>, attrs, children)`, `item(props: &ToggleGroupProps, pressed, focused, disabled, value, attrs, children)`。`ToggleGroup` / `MultiToggleGroup` の `item(props, value, focused, disabled, attrs, children)` は現在の押下状態を注入する（`root` に利便メソッドは無い）。

## Anatomy

- `root` — `<div role="group">`（`aria-orientation` は付与しない）
- `item` — 値ごとの `<button type="button">`、`aria-pressed`/`data-state`/`data-value`

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `ToggleGroupProps.disabled` | `bool`（既定 `false`） | `root` の `data-disabled` に加え、全 `item` へ `data-disabled` とネイティブ `disabled` を伝播（実効値は `props.disabled \|\| item の disabled`） |
| `ToggleGroupProps.orientation` | `Option<Orientation>`（既定 `None`） | `Some` のときのみ `root` と `item` に `data-orientation` を出力 |
| `ToggleGroupProps.roving_focus` | `bool`（既定 `false`） | `true` のとき `item` が `focused` に応じて `tabindex="0"` / `"-1"` を出力。`false` では `tabindex` を出力せず `focused` は無視される |
| `root.labelled_by` | `Option<&str>` | `Some` のときのみ `aria-labelledby` を出力 |
| `ToggleGroup::value()` | `Option<&str>` | 単一選択の現在値 |
| `MultiToggleGroup::values()` | `&[String]` | 複数選択の現在値 |
| `is_pressed(value)` | `bool` | 両バリアント共通 |

## Data Attributes

| Part | Attribute | Values |
| --- | --- | --- |
| item | `data-state` | `on` \| `off` |
| item | `data-pressed` | 存在属性（押下中） |
| root / item | `data-disabled` | 存在属性 |
| root / item | `data-orientation` | `horizontal` \| `vertical`（`props.orientation` が `Some` のとき） |
| item | `data-value` | 項目値 |

## Notes

- dispatch は `"toggle"` のみ受理（常時 deselectable。`deselectable=false` / `loopFocus=false` オプションは未提供）
- 矢印キーによるフォーカス移動の DOM 配線はクライアント層の責務。`roving_focus` は `tabindex` の SSR 初期値のみを与える
- 呼び出し側 `attrs` による固定属性（`role` / `data-orientation` / `aria-labelledby` / `data-disabled`、item では `type` / `aria-pressed` / `data-state` / `data-value` / `disabled` / `tabindex` 等）の上書きは除去される

- `ToggleGroup` と `MultiToggleGroup` は同じ `root`/`item` フリー関数とパート形状を共有し、内蔵する状態機械（`SingleSelect` vs `MultiSelect`）のみが異なる
- `@ark-ui/react` の JS/TS API とは別物（Rust 製、`fandhe-frontend-headless-ui`）

## Related

- [Toggle](./toggle.md)
- [Segment Group](./segment-group.md)
