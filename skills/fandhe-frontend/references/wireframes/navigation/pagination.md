# Pagination (wireframe)

`fandhe-frontend-wireframe-ui` のページネーション風プレースホルダー。「前へ/次へ・ページ番号の並び・省略記号（…）・現在ページの強調」という配置イメージだけを示す非インタラクティブな部品。API は `pagination(pages, active, prev_next, first_last, size)` の 5 引数で、props 構造体は導入していない。

## Signature / Usage

```rust
// fandhe-frontend-wireframe-ui 0.52.0 / src/pagination.rs
#[must_use]
pub fn pagination(
    pages: &[Option<&str>],
    active: Option<usize>,
    prev_next: bool,
    first_last: bool,
    size: Size,
) -> Node

// 呼び出し例（docs-site demo より）
use fandhe_frontend_wireframe_ui::{pagination, Size};

let pages = [Some("1"), Some("2"), None, Some("16"), Some("17")];
pagination(&pages, Some(0), true, true, Size::Md)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| pages | `&[Option<&str>]` | - | ページ項目列。`Some(label)` はページ番号セル、`None` は省略記号（…）のギャップセル。空スライスでも panic しない。 |
| active | `Option<usize>` | `None` | 現在ページの添字。`None`・範囲外・ギャップを指す添字のときはどのセルにも選択インジケータを付けない。 |
| prev_next | `bool` | `false` | 前/次への送りコントロール（キャレットアイコン 1 個ずつ）を表示するか。 |
| first_last | `bool` | `false` | 先頭/末尾への送りコントロール（キャレットアイコン 2 個ずつ）を表示するか。 |
| size | `Size` | `Size::Md` | サイズ段階（xs〜xl）。フォントサイズ・アイコンサイズに反映される。 |

## Notes

- 出典: https://fandhe-ai.github.io/fandhe-frontend/wireframes/pagination/
- 低忠実度のワイヤーフレーム部品であり、Primitives / Themes の同名コンポーネントとは別物。`<nav>` / `<a>` / `href` / `<button>` のいずれも出力しない。ページ送りできる部品が必要な場合は Themes / Primitives の Pagination を使う
- `@ark-ui/react` / `@chakra-ui/react` の JS/TS API とは無関係（Rust 製）
- ルートは `div`。`role` / `aria-*`（アイコン基盤の装飾用 `aria-hidden` を除く）/ `tabindex` / `on*` は出力しない
- ギャップは `None` で構造として区別する（`"…"` 文字列を渡すと通常のページセルとして描画されてしまうため。`calendar` の `Option<u32>` と同じ表現）。ページ番号の妥当性検証・現在ページ前後の自動省略計算は責務外
- 選択状態は `active: Option<usize>` 1 引数（`tabs` と同型）。既存の共通型 `Active` は項目ごとの `data-active` 出力にのみ用いる
- 先頭/前/次/末尾コントロールは `prev_next` / `first_last` の 2 bool に畳んでおり、片側だけの表示（例: 次のみ）は対象外
- `Orientation` / `Disabled` / `Bold` / `Primary`・アイコン差し替えスロット・件数表示・ページサイズ選択は持たない
- 現在ページは `--fw-wire-ink`、非選択ページは `--fw-wire-ink-muted`、現在ページの背景は `--fw-wire-fill-subtle`
- 視覚的な参照元は blocks.pm の Pagination 部品。ライセンス上の理由によりスクリーンショットは掲載されない

## Related

- [Navigation overview](./overview.md)
- [共通型 (Size / Active ほか)](../foundations/common-types.md)
- [Pagination (Themes)](../../themes/collections/pagination.md)
- [Pagination (Primitives)](../../primitives/collections/pagination.md)
