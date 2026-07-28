# ScrollArea

CSS `overflow` を主体とするカスタムスクロール領域の headless コンポーネント。開閉のような時間変化する内部状態を持たないため状態機械は持たず、自由関数のみで構成される。

## Signature / Usage

```rust
use fandhe_frontend_headless_ui::scroll_area;
use fandhe_frontend_headless_ui::data_attrs::Orientation;

scroll_area::root(attrs, children);
scroll_area::viewport(attrs, children); // tabindex="0" を固定出力
scroll_area::content(attrs, children);
scroll_area::scrollbar(orientation: Orientation, attrs, children);
scroll_area::thumb(orientation: Orientation, attrs, children);
scroll_area::corner(attrs, children);
```

## Anatomy

```
root
  viewport
    content
  scrollbar
    thumb
  corner
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `scrollbar.orientation` | `Orientation` | `data-orientation` の値を決定 |
| `thumb.orientation` | `Orientation` | `data-orientation` の値を決定 |
| `viewport.attrs` / `children` | `Vec<(&str, &str)>` / `Vec<Node>` | `tabindex="0"` は呼び出し側指定不可の固定出力 |

## Data Attributes

| Part | Attribute | Values |
|------|-----------|--------|
| `scrollbar` | `data-orientation` | `vertical` \| `horizontal` |
| `thumb` | `data-orientation` | `vertical` \| `horizontal` |

## Accessibility

- `viewport` は `tabindex="0"` を固定出力し、通常のタブ順に含める（矢印キー/Page キーによるスクロールはネイティブブラウザ挙動に委ねる）
- `scrollbar`/`corner` は `aria-hidden="true"` を固定出力（ネイティブスクロールバーと意味が重複する装飾要素のため）
- `thumb`/`viewport`/`content`/`root` に role・aria-* は付与しない

## Notes

- JS によるスクロール位置追従（thumb の位置・サイズ同期）・thumb の drag 操作はスコープ外。`scrollbar`/`thumb`/`corner` は将来の JS 追従実装向けの静的マークアップのみを提供する
- `@ark-ui/react` の JS/TS API とは別物（Rust 製）

## Related

- [Splitter](./splitter.md)
