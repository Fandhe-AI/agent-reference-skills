# Menu (wireframe)

`fandhe-frontend-wireframe-ui` のドロップダウン風メニューのプレースホルダー。検索欄（任意）と、有効・無効が混在する項目リストからなるパネルの配置イメージを示す。API は `menu(items, active, search, size)` の 4 引数で、項目は `MenuItem::new` / `MenuItem::disabled` で構築する。

## Signature / Usage

```rust
// fandhe-frontend-wireframe-ui 0.52.0 / src/menu.rs
#[must_use]
pub fn menu(
    items: &[MenuItem<'_>],
    active: Option<usize>,
    search: Option<&str>,
    size: Size,
) -> Node

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub struct MenuItem<'a> {
    pub label: &'a str,
    pub disabled: Disabled,
}

impl<'a> MenuItem<'a> {
    pub const fn new(label: &'a str) -> Self       // 有効な項目
    pub const fn disabled(label: &'a str) -> Self  // 無効な項目
}

// 呼び出し例（docs-site demo より）
use fandhe_frontend_wireframe_ui::menu::{menu, MenuItem};
use fandhe_frontend_wireframe_ui::Size;

let basic_items = [
    MenuItem::new("プロフィール"),
    MenuItem::new("設定"),
    MenuItem::disabled("請求情報"),
];
menu(&basic_items, Some(0), Some("検索..."), Size::Md)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| items | `&[MenuItem<'_>]` | - | メニュー項目のスライス。`MenuItem::new` / `MenuItem::disabled` で構築する。 |
| active | `Option<usize>` | `None` | 強調（選択中）項目の添字。範囲外・無効項目を指す値は付与しない。 |
| search | `Option<&str>` | `None` | 省略可能な検索欄プレースホルダー文言。`Some` のときのみ検索行を出力する。 |
| size | `Size` | `Size::Md` | サイズ段階（xs〜xl）。 |

### MenuItem

| Field | Type | Description |
|-------|------|-------------|
| label | `&'a str` | 表示するラベル文言。 |
| disabled | `Disabled` | 無効状態。`true` のとき `data-disabled=""` を付与する。 |

## Notes

- 出典: https://fandhe-ai.github.io/fandhe-frontend/wireframes/menu/
- 低忠実度のワイヤーフレーム部品であり、Primitives / Themes の同名コンポーネントとは別物。`role="menu"` / `menuitem`・開閉・キーボードナビゲーションは実装しない。操作できるメニューが必要な場合は Themes / Primitives の Menu を使う
- `@ark-ui/react` / `@chakra-ui/react` の JS/TS API とは無関係（Rust 製）
- 項目は固定スロットではなく公開の `MenuItem` 構造体（ラベル + 無効状態、`Copy`）のスライスで受ける。項目数に上限なし
- 強調状態は `Option<usize>`（`tabs` と同じく高々 1 件）。`active` が無効項目を指す場合・範囲外の添字・`None` は強調を付与しない
- 検索欄は `Option<&str>`（プレースホルダー文言）+ 先頭の固定パート `icon::search`。`<input>` は出力しない
- 項目ごとのアイコンスロットは非採用。`Orientation` / `Bold` / `Primary` / 全体の `Disabled` は持たない
- `role="menu"` / `aria-expanded` / `aria-haspopup` / `tabindex` は出力しない
- 視覚的な参照元は blocks.pm の Menu 部品。ライセンス上の理由によりスクリーンショットは掲載されない

## Related

- [Navigation overview](./overview.md)
- [共通型 (Size / Disabled ほか)](../foundations/common-types.md)
- [Menu (Themes)](../../themes/collections/menu.md)
- [Menu (Primitives)](../../primitives/collections/menu.md)
