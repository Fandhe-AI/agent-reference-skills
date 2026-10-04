# Wireframes: Navigation

`fandhe-frontend-wireframe-ui` の Navigation カテゴリ（7 部品）。アコーディオン・パンくず・カーソル・メニュー・ナビ項目・ページネーション・タブの配置イメージだけを示す、非インタラクティブ・SSR 専用の低忠実度プレースホルダー群。

## Signature / Usage

| 名前 | 関数 | 説明 | 個別ページ |
|------|------|------|-----------|
| Accordion | `accordion(items, size)` | 見出し + 開閉キャレット + 本文の項目を縦に並べる（独自追加） | [accordion.md](./accordion.md) |
| Breadcrumbs | `breadcrumbs(items, size)` | 上位階層から現在ページへ至る経路。最後の項目が常に現在階層 | [breadcrumbs.md](./breadcrumbs.md) |
| Cursor | `cursor(kind, label, size)` | 矢印・手のひらのマウスカーソル + 任意の名前タグ | [cursor.md](./cursor.md) |
| Menu | `menu(items, active, search, size)` | 検索欄（任意）+ 有効/無効混在の項目リストのパネル | [menu.md](./menu.md) |
| Nav item | `nav_item(label, leading, trailing, counter, size, active, orientation)` | 先頭アイコン + ラベル + 件数 + 末尾アイコンのナビ 1 行 | [nav-item.md](./nav-item.md) |
| Pagination | `pagination(pages, active, prev_next, first_last, size)` | ページ番号の並び + 省略記号 + 前後/先頭末尾コントロール | [pagination.md](./pagination.md) |
| Tabs | `tabs(items, active, orientation, size)` | タブ項目の並び + 選択中インジケータ | [tabs.md](./tabs.md) |

カテゴリ共通の使い方（選択状態は `active: Option<usize>` で渡す。`None` や範囲外の添字は選択インジケータなし）:

```rust
use fandhe_frontend_wireframe_ui::{tabs, Orientation, Size};

tabs(&["概要", "詳細", "設定"], Some(0), Orientation::Horizontal, Size::Md)
```

## Notes

- 出典: https://fandhe-ai.github.io/fandhe-frontend/wireframes/
- Navigation 部品はすべて位置引数の関数で、props 構造体は無い。戻り値は `fandhe_frontend_core::Node`
- 低忠実度のワイヤーフレーム部品であり、Primitives / Themes の同名コンポーネントとは別物。操作可能な部品が必要な場合は Themes / Primitives を使う。`role` / `aria-*` / `tabindex` / `on*` / `href` は出力しない（アイコンの装飾用 `aria-hidden` を除く）
- `@ark-ui/react` / `@chakra-ui/react` の JS/TS API とも無関係（Rust 製）
- 選択状態は `active: Option<usize>`（`tabs` / `menu` / `pagination`）または共通型 `Active`（`nav_item`）で表す
- アイコンは `icon::house(size)` 等を `Option<Node>` スロットで渡す（`nav_item`）
- サイズは `Size`（xs〜xl、既定 `Size::Md`）

## Related

- [共通型 (Size / Active / Orientation ほか)](../foundations/common-types.md)
- [Overlay & Feedback overview](../overlay-feedback/overview.md)
