# Nav item (wireframe)

`fandhe-frontend-wireframe-ui` のナビゲーション項目 1 行分のプレースホルダー。先頭アイコン + ラベル + 件数表示（カウンター）+ 任意の末尾アイコンを幅いっぱいの 1 行（または縦積み）で並べる。API は `nav_item(label, leading, trailing, counter, size, active, orientation)` の 7 引数で、props 構造体は導入していない。

## Signature / Usage

```rust
// fandhe-frontend-wireframe-ui 0.52.0 / src/nav_item.rs
#[must_use]
pub fn nav_item(
    label: &str,
    leading: Option<Node>,
    trailing: Option<Node>,
    counter: Option<&str>,
    size: Size,
    active: Active,
    orientation: Orientation,
) -> Node

// 呼び出し例（docs-site demo より）
use fandhe_frontend_wireframe_ui::{icon, nav_item, Active, Orientation, Size};

nav_item(
    "通知",
    Some(icon::bell(Size::Md)),
    None,
    Some("12"),
    Size::Md,
    Active(false),
    Orientation::Horizontal,
)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| label | `&str` | - | 表示するラベル文言。 |
| leading | `Option<Node>` | `None` | 省略可能な先頭アイコンスロット。例: `Some(icon::house(size))`。 |
| trailing | `Option<Node>` | `None` | 省略可能な末尾アイコンスロット。例: `Some(icon::caret_right(size))`。 |
| counter | `Option<&str>` | `None` | 省略可能な件数表示（ピル）。`Some("12")` のように渡す。 |
| size | `Size` | `Size::Md` | サイズ段階（xs〜xl）。 |
| active | `Active` | `Active(false)` | true のとき `data-active` を付与し、グレースケール反転配色にする。 |
| orientation | `Orientation` | `Orientation::Horizontal` | Vertical でアイコンの下にラベルを置く縦積み（タブバー風）になる。 |

## Notes

- 出典: https://fandhe-ai.github.io/fandhe-frontend/wireframes/nav-item/
- 低忠実度のワイヤーフレーム部品であり、Primitives / Themes の同名コンポーネントとは別物。実際に遷移するリンクとしては出力しない（`<a href>` にしない）。操作できるナビゲーションが必要な場合は Themes の Nav list / Navigation menu、Primitives の Nav list を使う
- `@ark-ui/react` / `@chakra-ui/react` の JS/TS API とは無関係（Rust 製）
- アクティブ状態は `data-active` による背景・文字色の反転（`--fw-wire-ink` / `--fw-wire-paper`）。アイコンは `currentColor` で自動追従し、反転時はカウンターの配色も明るいトークンへ切り替わる
- 件数表示は `Node` スロットではなく `counter: Option<&str>` の内部パート（ナビ行内の件数ピルはアクティブ時の反転配色を含む行レイアウトと一体のため。単独部品 `counter` には依存しない）
- `Disabled` は持たない（引数をちょうど 7 個に収めるため）
- `rich_text` との違い: アクティブ状態・件数表示・幅いっぱいのサイドバー行レイアウトを持つ
- `role` / `aria-*` / `tabindex` は出力しない
- 視覚的な参照元は blocks.pm の Nav item 部品。ライセンス上の理由によりスクリーンショットは掲載されない

## Related

- [Navigation overview](./overview.md)
- [共通型 (Size / Active / Orientation ほか)](../foundations/common-types.md)
- [Nav list (Themes)](../../themes/navigation/nav-list.md)
- [Navigation menu (Themes)](../../themes/navigation/navigation-menu.md)
- [Nav list (Primitives)](../../primitives/navigation/nav-list.md)
