# Switch

共有の2値 `Checkable` 状態機械（`Checkbox` と同一）の上に構築された二値トグルコントロール。

## Signature / Usage

```rust
use fandhe_frontend_headless_ui::switch::{self, Switch, SwitchProps};

let sw = Switch::new(true);
let props = SwitchProps::default();

sw.root(&props, vec![], vec![
    sw.control(&props, vec![], vec![
        sw.thumb(&props, vec![], vec![]),
    ]),
    sw.label(&props, vec![], vec![]),
    sw.hidden_input("notifications", "on", &props, vec![]),
]);
```

フリー関数: `switch::root(checked, props: &SwitchProps, attrs, children)`, `control(checked, props, attrs, children)`, `thumb(checked, props, attrs, children)`, `label(checked, props, attrs, children)`, `hidden_input(name, value, checked, props, attrs)`。

## Anatomy

- `root` — `<label>`（内包する `hidden-input` との暗黙のラベル関連付け）
- `control` — `<span aria-hidden="true">`、`thumb` — `<span>`
- `label` — `<span>`
- `hidden-input` — `<input type="checkbox" role="switch">`

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `Switch::new(checked)` | `bool` | 初期状態 |
| `is_checked()` | `bool` | |
| `data_state()` | `&'static str` | `"checked"`/`"unchecked"` |
| `SwitchProps.disabled` | `bool`（既定 `false`） | 全パーツに `data-disabled`。`hidden_input` にはネイティブ `disabled` も付与 |
| `SwitchProps.readonly` | `bool`（既定 `false`） | 全パーツに `data-readonly`（ネイティブ `readonly` は付与しない。トグル操作の抑止配線は持たない） |
| `SwitchProps.invalid` | `bool`（既定 `false`） | 全パーツに `data-invalid`。`hidden_input` には `aria-invalid="true"` も付与 |
| `SwitchProps.required` | `bool`（既定 `false`） | 全パーツに `data-required`。`hidden_input` にはネイティブ `required` も付与 |

## Data Attributes

| Part | Attribute | Values |
| --- | --- | --- |
| 全パーツ（`hidden-input` を含む） | `data-state` | `checked` \| `unchecked` |
| 全パーツ | `data-disabled` / `data-invalid` / `data-required` / `data-readonly` | 存在属性（対応する `SwitchProps` が `true` のとき） |

## Notes

- `hidden_input` は `aria-checked` を明示付与しない（ネイティブ `checked` 状態がブラウザにより自動マップされる）
- Enter キーではトグルしない（ネイティブ checkbox の既定操作）。`data-hover` / `data-active` / `data-focus` は出力しない（`data-focus-visible` はクライアント層が付け外し）
- 呼び出し側 `attrs` による固定属性（`data-state` 等の状態属性、`aria-hidden` / `type` / `role` / `checked` / `name` / `value` 等）の上書きは除去される

- ディスパッチアクションは `crate::state::CheckableAction` から `SwitchAction` として再エクスポートされる: `"check"`/`"uncheck"`/`"toggle"`（`Checkbox` と同一の語彙）
- `@ark-ui/react` の JS/TS API とは別物（Rust 製、`fandhe-frontend-headless-ui`）

## Related

- [Checkbox](./checkbox.md)
- [Toggle](./toggle.md)
