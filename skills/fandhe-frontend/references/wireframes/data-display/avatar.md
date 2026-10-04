# Avatar

`fandhe-frontend-wireframe-ui` のアバタープレースホルダー。正方形または円形の枠の中に人物の線画（既定）を置き、実際のアバター画像の配置イメージを示す非インタラクティブな部品。API は `avatar(content, size, circle)` の 3 引数で、props 構造体は導入していない。

## Signature / Usage

```rust
pub fn avatar(content: Option<Node>, size: Size, circle: bool) -> Node
```

```rust
use fandhe_frontend_wireframe_ui::{avatar, icon, Size};

avatar(None, Size::Md, false);                          // 既定（正方形・人物線画）
avatar(None, Size::Md, true);                           // 円形
avatar(Some(icon::image(Size::Md)), Size::Md, true);    // スロット差し替え（画像アイコン）
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| content | `Option<Node>` | `None` | 省略可能なコンテンツスロット。`None` のときは既定の人物線画（`icon::user`）にフォールバックする。 |
| size | `Size` | `Size::Md` | サイズ段階（xs〜xl）。枠の寸法に反映される。 |
| circle | `bool` | `false` | true のとき円形（`fw-wire-avatar-circle`）バリアントにする。 |

## Notes

- 出典: https://fandhe-ai.github.io/fandhe-frontend/wireframes/avatar/
- 低忠実度ワイヤーフレーム部品。Primitives / Themes の同名 `Avatar` とは別物で、`@ark-ui/react` / `@chakra-ui/react` の JS/TS API とも無関係（Rust 製）。
- 表示専用のため `<img>` は出力せず、画像 URL を受け取る API も持たない。実際に画像を表示する部品が必要な場合は Themes / Primitives の Avatar を使う。
- 原案差分: `content: None` は人物線画へフォールバックする（`Option<Node>` スロット規約 §11.4 からの意図的な逸脱）。`Some(node)` はそのまま子要素になる（画像アイコンやイニシャルテキストに差し替え可能）。
- 原案差分: サイズは共通 `Size` 5 段（xs〜xl）へ畳み込み。`circle: bool` は部品固有の修飾 class で、`props.rs` に新しい型は追加していない。
- ルートは `div`。`src` / `href` / `style` は一切出力しない（非対話制約）。
- 配色はグレースケールのトークン（`--fw-wire-fill-subtle` / `--fw-wire-ink-muted` / `--fw-wire-line`）。
- スクリーンショットはライセンス上の理由で非掲載（視覚的参照元は blocks.pm の Avatar）。

## Related

- [Data Display wireframes](./overview.md)
- [Avatar (Themes)](../../themes/data-display/avatar.md)
- [Avatar (Primitives)](../../primitives/display/avatar.md)
