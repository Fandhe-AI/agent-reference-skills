# Toolbar

ボタン・リンク・セパレーター・トグルグループを横/縦に並べるツールバー。roving tabindex（フォーカス対象のみ `tabindex="0"`、他は `tabindex="-1"`）を持つ状態機械 `Toolbar` を提供する。Primitives の headless 実装をそのまま再エクスポートし `stylesheet()` で既定 CSS のみを追加提供する薄い委譲。

## Anatomy

```
root
  button
  link
  separator
  toggle-group
    toggle-item
```

## Signature / Usage

```rust
use fandhe_frontend_pre_styled_ui::toolbar::{Toolbar, Orientation};

let t = Toolbar::new(0, 3, false, Orientation::Horizontal);
let node = t.root("Toolbar", vec![], vec![
    t.button(0, false, vec![], vec![]),
    t.separator(vec![], vec![]),
]);
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `Toolbar::new: focused` | `usize` | — | 現在フォーカス対象の index（範囲外は 0 へ正規化） |
| `Toolbar::new: item_count` | `usize` | — | 項目総数 |
| `Toolbar::new: loop_focus` | `bool` | — | 端で循環するかどうか |
| `Toolbar::new: orientation` | `Orientation` | — | `Horizontal` / `Vertical` |
| `root: label` | `&str` | 空文字 | `aria-label`。空文字のときは省略される |
| `button: disabled` / `toggle_item: disabled` | `bool` | `false` | `aria-disabled`/`data-disabled` で表現（ネイティブ `disabled` は付与しない） |
| `toggle_item: pressed` | `bool` | — | `aria-pressed`・`data-state`（`on`/`off`）を決定 |

## Data Attributes

| Part | Attribute | Values |
| --- | --- | --- |
| root | `data-orientation` | `horizontal` \| `vertical` |
| toggle-item | `data-state` | `on` \| `off` |
| toggle-item | `data-value` | 呼び出し側指定の識別子 |

## Notes

- `root` は `role="toolbar"` + `aria-orientation`/`data-orientation` を固定出力する
- `separator` は toolbar 自身の向きと**直交**する `aria-orientation` を出力する（横向き toolbar のセパレーターは縦線）
- disabled 項目もフォーカス順序に残る設計（ネイティブ `disabled` を付与せず `aria-disabled` のみで表現）
- `button`/`link`/`toggle-item` は `:focus-visible` のみのフォーカスリングを持つ
- 矢印キーの実 DOM 配線・skip-disabled モード・オーバーフロー時のスクロール折りたたみはスコープ外
- `@chakra-ui/react` の JS/TS API とは別物（Rust 製）

## Related

- [NavigationMenu](./navigation-menu.md)
- [Primitives: Toolbar](../../primitives/display/toolbar.md)
