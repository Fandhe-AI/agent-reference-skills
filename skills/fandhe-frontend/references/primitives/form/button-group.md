# Button Group

関連ボタンを角丸・境界線で連結してひとつのグループに見せる shadcn/ui Button Group 相当の部品。`root`（`role="group"`）/ `separator` / `text` の 3 anatomy パーツを持つ。状態機械を持たない静的なグループ化。

## Signature / Usage

```rust
use fandhe_frontend_core::text;
use fandhe_frontend_headless_ui::button_group;
use fandhe_frontend_headless_ui::data_attrs::Orientation;

let node = button_group::root(Orientation::Horizontal, "Text alignment", vec![], vec![
    // <button> は呼び出し側が用意する
    button_group::separator(Orientation::Horizontal, vec![], vec![]),
    button_group::text(vec![], vec![text("Label")]),
]);
```

```rust
button_group::root(orientation: Orientation, label: &str, attrs, children) -> Node
button_group::separator(group_orientation: Orientation, attrs, children) -> Node
button_group::text(attrs, children) -> Node
```

## Anatomy

```
root
  (button …)
  separator
  text
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `root: orientation` | `Orientation` | 必須 | `Horizontal` \| `Vertical`。`data-orientation` に反映 |
| `root: label` | `&str` | 必須 | 空文字列でないときのみ `aria-label` を出力。`aria-labelledby` が必要なら `attrs` で渡す |
| `separator: group_orientation` | `Orientation` | 必須 | 親グループの向き。出力は直交する向き |

## Data Attributes

| Part | Attribute | Values |
| --- | --- | --- |
| root | `data-orientation` | `horizontal` \| `vertical` |
| separator | `data-orientation` / `aria-orientation` | グループと直交する向き（横並びなら `vertical`） |

## Notes

- 出典: https://fandhe-ai.github.io/fandhe-frontend/primitives/button-group/
- `root` は `div` + `role="group"`。WAI-ARIA は `group` ロールへの `aria-orientation` を許可しないため付与せず、向きは `data-orientation` のみで表現する。
- `separator` は `div` + `role="separator"`、`text` は `div`（固定属性なし）。
- Toolbar の roving tabindex（矢印キー移動）とは異なる静的グループ。子 `button` のフォーカス順序はネイティブ `Tab` 順序に委ね、独自キーハンドラは持たない。
- ネスト（グループの中に別のグループ）を許容する。
- 先頭 / 末尾ボタンの角丸連結は本 mod の責務外。CSS の `:first-child` / `:last-child` で表現する。
- 呼び出し側 `attrs` の `role` / `data-orientation` / `aria-label`（separator は `aria-orientation` も）は除去され固定値が優先される。
- `@ark-ui/react` の JS/TS API とは別物（Rust 製、`fandhe-frontend-headless-ui`）。

## Related

- [Toolbar](../display/toolbar.md)
- [Toggle Group](./toggle-group.md)
- [Input Group](./input-group.md)
- [Button Group（Themes 版）](../../themes/forms/button-group.md)
