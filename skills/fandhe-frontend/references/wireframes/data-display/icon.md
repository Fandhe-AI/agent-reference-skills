# Icon

`fandhe-frontend-wireframe-ui` のアイコン単体プレースホルダー。SVG ラインアートアイコン基盤（`icon` モジュール）が提供するグリフを 1 つだけ、装飾用途として表示する非インタラクティブな部品。API は `icon(glyph, size)` の 2 引数。

## Signature / Usage

```rust
pub fn icon(glyph: fn(Size) -> Node, size: Size) -> Node
```

```rust
use fandhe_frontend_wireframe_ui::{icon, Size};

icon(icon::search, Size::Md);
icon(icon::star, Size::Lg);
```

個別グリフ関数はすべて `pub fn <name>(size: Size) -> Node`。レジストリは `icon::ALL`（型 `IconEntry = (&'static str, fn(Size) -> Node)`、宣言順）。

```rust
pub type IconEntry = (&'static str, fn(Size) -> Node);
pub const ALL: &[IconEntry] = &[("plus", plus), ("minus", minus), /* ... */ ("brand", brand)];
```

## Options / Props

`icon()` の引数:

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| glyph | `fn(Size) -> Node` | - | 表示するアイコンのコンストラクタ。`icon::ALL` の要素や `icon::search` 等の個別関数をそのまま渡す。 |
| size | `Size` | - | サイズ段階（xs〜xl）。`glyph` へそのまま渡され、部品ルートにも付与される。 |

`icon` モジュールの pub item（25 件 = 個別グリフ 24 + `icon` 本体。`icon::ALL` 内の名前は右列）:

| Item | Signature | ALL 内の名前 |
| --- | --- | --- |
| `plus` | `fn(Size) -> Node` | `plus` |
| `minus` | `fn(Size) -> Node` | `minus` |
| `search` | `fn(Size) -> Node` | `search` |
| `cog` | `fn(Size) -> Node` | `cog` |
| `house` | `fn(Size) -> Node` | `house` |
| `ellipsis` | `fn(Size) -> Node` | `ellipsis` |
| `caret_up` | `fn(Size) -> Node` | `caret-up` |
| `caret_down` | `fn(Size) -> Node` | `caret-down` |
| `caret_left` | `fn(Size) -> Node` | `caret-left` |
| `caret_right` | `fn(Size) -> Node` | `caret-right` |
| `check` | `fn(Size) -> Node` | `check` |
| `x` | `fn(Size) -> Node` | `x` |
| `play` | `fn(Size) -> Node` | `play` |
| `external` | `fn(Size) -> Node` | `external` |
| `at` | `fn(Size) -> Node` | `at` |
| `star` | `fn(Size) -> Node` | `star` |
| `user` | `fn(Size) -> Node` | `user` |
| `image` | `fn(Size) -> Node` | `image` |
| `calendar` | `fn(Size) -> Node` | `calendar` |
| `menu` | `fn(Size) -> Node` | `menu` |
| `bell` | `fn(Size) -> Node` | `bell` |
| `cursor_arrow` | `fn(Size) -> Node` | `cursor-arrow` |
| `cursor_hand` | `fn(Size) -> Node` | `cursor-hand` |
| `brand` | `fn(Size) -> Node` | `brand` |
| `icon` | `fn(glyph: fn(Size) -> Node, size: Size) -> Node` | -（部品本体） |

## Notes

- 出典: https://fandhe-ai.github.io/fandhe-frontend/wireframes/icon/
- 低忠実度ワイヤーフレーム部品。Themes の `Icon` とは別物で、`@ark-ui/react` / `@chakra-ui/react` の JS/TS API とも無関係（Rust 製）。ラベル付き・対話可能なアイコンが必要な場合は Themes の Icon を使う。
- 原案差分: instance swap は `Node` ではなく `fn(Size) -> Node`（関数ポインタ）。`icon(glyph: Node, size)` 形式だとサイズを 2 か所で指定できて誤用を招くため、部品側が `glyph(size)` を 1 回だけ呼ぶ設計にしている。任意の `Node`（例: `avatar` の戻り値）はこのスロットに渡せない。
- ルートは `<span class="fw-wire-icon fw-wire-size-<段階>">` のみ。`role` / `aria-*` / `tabindex` / `style` / `data-*`（部品側）は付与しない。グリフ SVG 自体は `aria-hidden="true"` / `focusable="false"` で `data-icon` に名前を持つ。
- `icon::ALL` の一覧表示元は本ページの Demo（`grid` に 6 列、宣言順で全種を並べる）。
- 配色は `--fw-wire-ink`（線色）のトークン。
- スクリーンショットは非掲載（視覚的参照元は blocks.pm の Icon）。

## Related

- [Data Display wireframes](./overview.md)
- [Icon (Themes)](../../themes/data-display/icon.md)
- [Avatar (wireframe)](./avatar.md)
