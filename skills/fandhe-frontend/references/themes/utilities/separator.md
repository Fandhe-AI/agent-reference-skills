# Separator

区切り線 `<hr>` を中心とする、headless 状態機械を持たない静的 styled 部品。`variant`（`solid`/`dashed`/`dotted`）と `orientation`（`horizontal`/`vertical`）の直交する2軸を提供する。ラベル付き区切り線用に pre-styled-only の `group`/`label` パーツを持つ。

## Signature / Usage

```rust
use fandhe_frontend_pre_styled_ui::separator::{separator, SeparatorProps, SeparatorVariant};
use fandhe_frontend_headless_ui::data_attrs::Orientation;

let html_default = separator(&SeparatorProps::default(), vec![]);

let vertical = SeparatorProps {
    orientation: Orientation::Vertical,
    variant: SeparatorVariant::Dashed,
};
let html_vertical = separator(&vertical, vec![]);
```

```rust
pub fn separator<'a>(props: &SeparatorProps, attrs: Vec<(&'a str, &'a str)>) -> Node;
pub fn group<'a>(attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node;
pub fn group_with<'a>(position: SeparatorLabelPosition, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node;
pub fn label<'a>(attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node;
```

`css() -> String` が静的 CSS 全量を返す。

## Anatomy

- `root`（`<hr>`）— 区切り線本体、子ノードを持たない
- `group`（`<div>`）— ラベル付き区切り線のレイアウト専用。子は `separator`（horizontal）/ `label` / `separator`（horizontal）の 3 個を横並びで渡す（vertical のラベル付き合成は対象外）
- `label`（`<span>`）— `group` 内のテキストラベル

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `orientation` | `Orientation` | `Horizontal` | `aria-orientation`/`data-orientation`/variant クラスの3箇所へ連動 |
| `variant` | `SeparatorVariant` | `Solid` | `solid` \| `dashed` \| `dotted` の罫線スタイル |
| `group_with: position` | `SeparatorLabelPosition`（`Center` \| `Start`） | `Center` | ラベル位置。`Center` は `group` と同じ出力、`Start` は先頭寄せ（`grid-auto-flow: column`）。呼び出し側 `class` は保持され位置クラスと連結される |

## Data Attributes

| Part | Attribute | Values |
| --- | --- | --- |
| `root` | `data-orientation` | `horizontal` \| `vertical` |

## Notes

- `role="separator"` + `aria-orientation` を常時出力。呼び出し側 `attrs` に同名キー（大文字小文字無視）があっても除去してから合成する fail-closed 方針
- `size`（罫線太さ）・`colorPalette` 軸は提供しない（区切り線は中立的な罫線でありステータス色を持たないという判断）
- 縦方向の高さは親コンテナのレイアウトに依存する。`--fandhe-separator-height` をフォールバック付き custom property として公開する
- headless 状態機械を要しない静的部品（badge/spinner/skeleton と同型）
- `@ark-ui/react`/chakra-ui の JS/TS API とは別物（Rust 製）。Primitives 側に対応する単独ページは存在しない（`menu::separator` 等の複合部品内パーツとは別物）

## Related

- [SkipNav](./skip-nav.md)
