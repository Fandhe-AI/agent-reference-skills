# Pagination

headless `pagination`（4 anatomy parts: item, ellipsis, prev-trigger, next-trigger）を包む styled wrapper。`size` と `color-palette` の両 variant を提供し、`root` にのみ適用する（CSS custom property が子スロットへ継承される）。

## Signature / Usage

```rust
use fandhe_frontend_pre_styled_ui::pagination;
use fandhe_frontend_pre_styled_ui::{ColorPalette, Size};

pub fn root<'a>(
    size: Size,
    palette: ColorPalette,
    aria_label: &'a str,
    attrs: Vec<(&'a str, &'a str)>,
    children: Vec<Node>,
) -> Node

// root の opt-in 拡張版。variant == Separated のとき root とバイト単位で同一の出力
pub fn root_with<'a>(
    size: Size,
    variant: PaginationVariant,
    palette: ColorPalette,
    aria_label: &'a str,
    attrs: Vec<(&'a str, &'a str)>,
    children: Vec<Node>,
) -> Node

#[derive(Debug, Clone, Copy, PartialEq, Eq, Default)]
pub enum PaginationVariant {
    #[default]
    Separated,
    Attached,
}

pub use fandhe_frontend_headless_ui::pagination::{
    ellipsis, item, next_trigger, prev_trigger, ItemMode, PageEntry, Pagination, PaginationAction,
};

pub fn stylesheet() -> String
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| size | `Size` (`Sm` \| `Md` \| `Lg`) | `root` に `--fandhe-pagination-item-size`/`-item-font-size` を設定。既定値 `Md` |
| variant | `PaginationVariant` (`Separated` \| `Attached`) | `root_with` のみ。`Separated`（既定）は項目間に間隔を持つ従来の見た目でクラスを付与しない。`Attached` は `gap: 0` で項目を隙間なく連結する（`fd-pagination--variant-attached`） |
| palette | `ColorPalette` (`Accent` \| `Info` \| `Success` \| `Warning` \| `Danger`) | 選択中アイテムのアクセントカラー。既定値 `Accent` |
| aria_label | `&str` | `root`（`<nav>`）の `aria-label` |

## Notes

- 現在ページは `data-state` ではなく `data-selected`（存在マーカー）+ `aria-current="page"` を使う
- `item`/`prev-trigger`/`next-trigger` はネイティブ `<button>`/`<a>` のため、素の `:focus-visible` で十分（hidden-input パターン不要）
- `Pagination` は（menu/select の状態機械と異なり）再エクスポート**される**。固有の `root()` メソッドを持たないため、再エクスポートしても未スタイル root が漏れるリスクがない。headless の自由関数 `root` 自体は依然として再エクスポートされない（styled `root` が置き換える）
- `@ark-ui/react` の JS/TS API とは別物（Rust 製）
- `@chakra-ui/react` の JS/TS API とは別物（Rust 製）。

## Related

- [pagination (primitives)](../../primitives/collections/pagination.md)
