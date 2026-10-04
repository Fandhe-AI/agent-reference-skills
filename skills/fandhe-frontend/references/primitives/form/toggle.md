# Toggle

共有の2値 `Checkable` 状態機械の上に構築された、単一の押下/非押下トグルボタン。

## Signature / Usage

```rust
use fandhe_frontend_headless_ui::toggle::{self, Toggle};

let t = Toggle::new(false);

t.root(false, vec![], vec![
    t.indicator(false, vec![], vec![]),
]);
```

フリー関数: `toggle::root(pressed, disabled, attrs, children)`, `indicator(pressed, disabled, attrs, children)`。`Toggle` のメソッドは `root(disabled, attrs, children)` / `indicator(disabled, attrs, children)` で現在の押下状態を注入する。

## Anatomy

- `root` — `<button type="button">`、`data-state`（`"on"`/`"off"` 形式の押下語彙）
- `indicator` — `<span>`

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `Toggle::new(pressed)` | `bool` | |
| `is_pressed()` | `bool` | |
| `data_state()` | `&'static str` | `"on"`/`"off"` |
| `root/indicator: disabled` | `bool` | `data-disabled` へ反映。`root` はネイティブ `disabled` も付与 |

## Data Attributes

| Part | Attribute | Values |
| --- | --- | --- |
| root / indicator | `data-state` | `on` \| `off` |
| root / indicator | `data-pressed` | 存在属性（押下中） |
| root / indicator | `data-disabled` | 存在属性（`disabled=true` のとき） |

## Notes

- `root` は `aria-pressed`（`"true"`/`"false"`）を出力する。hidden input を持たずフォーム送信に参加しない
- `indicator` は表示/非表示の切り替えを行わない（`[data-state="off"]` セレクタ等による制御は styled 層 CSS の責務）
- hydration 属性 `data-hydrate-checked` の値語彙は `checked`/`unchecked`（表示語彙の `on`/`off` とは異なる）

- ディスパッチアクションは `crate::state::CheckableAction` から `ToggleAction` として再エクスポートされる: `"check"`/`"uncheck"`/`"toggle"`
- `@ark-ui/react` の JS/TS API とは別物（Rust 製、`fandhe-frontend-headless-ui`）

## Related

- [Toggle Group](./toggle-group.md)
- [Switch](./switch.md)
