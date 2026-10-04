# Button Group

関連するボタンを角丸・境界線で 1 つの連結表示にまとめるスタイル済み Button Group 部品。Root / Separator / Text の 3 パーツ構成。

## Signature / Usage

```rust
use fandhe_frontend_pre_styled_ui::button_group::{self, Orientation};

let node = button_group::root(Orientation::Horizontal, "actions", vec![], vec![]);
```

`stylesheet() -> String` が静的 CSS 全量を返す。`Orientation`（`Horizontal` \| `Vertical`）は headless 層から再エクスポートされる。

```rust
pub fn root<'a>(orientation: Orientation, label: &'a str, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn separator<'a>(group_orientation: Orientation, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn text<'a>(attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
```

## Anatomy

`root` / `separator` / `text`

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `root.orientation` | `Orientation`（`Horizontal` \| `Vertical`） | `data-orientation`。横並び / 縦積み |
| `root.label` | `&str` | グループのアクセシブルネーム（`role="group"`） |
| `separator.group_orientation` | `Orientation` | 所属グループの向き |

## Notes

- 出典: https://fandhe-ai.github.io/fandhe-frontend/themes/button-group/
- `@chakra-ui/react` の JS/TS API とは別物（Rust 製）
- 先頭・末尾以外の隣接要素の角丸・開始側境界線を無効化して連結表示を作る。対象は Button だけでなく Input / Select trigger / Menu trigger にも及ぶ
- `role="group"` の静的なグループ。状態機械を持つ [Toolbar](../navigation/toolbar.md) の roving tabindex とは異なり、子ボタンのフォーカス順序はネイティブの Tab 順序に委ねる
- `size` / `variant` / `color-palette` いずれの軸も持たず、寸法・文字サイズは内側のボタン・入力欄に従属する。全パーツで呼び出し側 `class` は除去される
- 縦横混在のレイアウトはグループの入れ子で表現できる。内側グループへ値なし属性 `data-attached` を付与すると既定の margin 間隔を打ち消し、外側グループと枠線を共有する連結表示になる（opt-in）。接続されるのは隣接する兄弟のどちらも「`data-attached` なしの内側グループ」でない辺だけで、間隔を保つ通常の内側グループに面した辺は角丸を保つ
- バリデーション・送信処理・クリックハンドラは実装しない

## Related

- [Button Group (primitives)](../../primitives/form/button-group.md)
- [Button](./button.md)
- [Toolbar](../navigation/toolbar.md)
- [Input Group](./input-group.md)
