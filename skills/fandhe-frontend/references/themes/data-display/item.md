# Item

media（アイコン・画像・アバター）+ title/description + actions からなる汎用リスト行を表現するスタイル済み部品。

## Signature / Usage

```rust
use fandhe_frontend_core::text;
use fandhe_frontend_pre_styled_ui::item::{self, ItemMediaVariant, ItemRootProps};

let node = item::root(
    ItemRootProps::default(),
    vec![],
    vec![
        item::media(ItemMediaVariant::Icon, vec![], vec![text("icon")]),
        item::content(
            vec![],
            vec![
                item::title(vec![], vec![text("Title")]),
                item::description(vec![], vec![text("Description")]),
            ],
        ),
        item::actions(vec![], vec![]),
    ],
);
let css = item::stylesheet();
```

## Anatomy

`group` → `root`（→ `header` / `media` / `content`（→ `title` / `description`）/ `actions` / `footer`）/ `separator`

## Options / Props

`ItemRootProps<'a>`（`Default` 実装あり）:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `href` | `Option<&'a str>` | `None` | `Some` なら `root` を `div` ではなく `a` として描画し `href` を固定付与 |
| `external` | `bool` | `false` | `href` が `Some` のときのみ有効。`true` で `target="_blank"` + `rel="noopener noreferrer"` を不可分に付与 |
| `variant` | `ItemVariant`（`Default` \| `Outline` \| `Muted`） | `Default` | 見た目（`data-variant`） |
| `size` | `ItemSize`（`Default` \| `Sm`） | `Default` | サイズ（`data-size`） |

`ItemMediaVariant`: `Default` \| `Icon` \| `Image`（既定 `Default`、`media` の `data-variant`）。

パーツ関数（すべて `#[must_use]`、呼び出し側 `class` は除去される）:

| Function | Signature |
|----------|-----------|
| `root` | `(props: ItemRootProps<'a>, attrs: Vec<(&str, &str)>, children: Vec<Node>) -> Node` |
| `media` | `(variant: ItemMediaVariant, attrs: Vec<(&str, &str)>, children: Vec<Node>) -> Node` |
| `content` / `title` / `description` / `actions` / `header` / `footer` / `separator` | `(attrs: Vec<(&str, &str)>, children: Vec<Node>) -> Node` |
| `group` | `(label: &str, attrs: Vec<(&str, &str)>, children: Vec<Node>) -> Node` |
| `stylesheet` | `() -> String` |

## Notes

- 出典: https://fandhe-ai.github.io/fandhe-frontend/themes/item/
- `@chakra-ui/react` の JS/TS API とは別物（Rust 製）
- `variant` / `size` は headless 層の `data-variant` / `data-size` を CSS セレクタとして参照するだけで、class ベースの軸は持たない
- `href` 付き `root` はポインタ・カーソル・下線解除に加えて hover 背景と `:focus-visible` リングが付く。`href` のスキーム検証と `external` の `target` / `rel` 付与は headless 層に委ねる
- `media` は `data-variant="icon"` / `"image"` で固定サイズ・背景・角丸を切り替え、`image` では子 `img` を `object-fit: cover` でトリミングする
- `group` は複数 `root` の縦並びコンテナ（gap なし）で、区切りは `separator` を挟んで行う
- バリデーション・送信処理・データ整形は実装しない

## Related

- [Primitives: Item](../../primitives/display/item.md)
- [Avatar](./avatar.md)
