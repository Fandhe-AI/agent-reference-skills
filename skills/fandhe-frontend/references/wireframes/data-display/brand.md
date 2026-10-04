# Brand

`fandhe-frontend-wireframe-ui` のブランドロゴプレースホルダー。正方形の枠の中に汎用抽象ブランドマークの線画（既定）を置き、実際のブランドロゴの配置イメージを示す非インタラクティブな部品。API は `brand(content, size)` の 2 引数で、props 構造体は導入していない。

## Signature / Usage

```rust
pub fn brand(content: Option<Node>, size: Size) -> Node
```

```rust
use fandhe_frontend_core::text;
use fandhe_frontend_wireframe_ui::{brand, icon, Size};

brand(None, Size::Md);                         // 既定（汎用抽象ブランドマーク）
brand(Some(text("A")), Size::Md);              // スロット差し替え（イニシャル）
brand(Some(icon::star(Size::Md)), Size::Md);   // スロット差し替え（別アイコン）
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| content | `Option<Node>` | `None` | 省略可能なコンテンツスロット（Figma の Brand(swap) に相当）。`None` のときは既定の汎用抽象ブランドマーク（`icon::brand`）にフォールバックする。 |
| size | `Size` | `Size::Md` | サイズ段階（xs〜xl）。枠の寸法に反映される。 |

## Notes

- 出典: https://fandhe-ai.github.io/fandhe-frontend/wireframes/brand/
- 低忠実度ワイヤーフレーム部品。Primitives / Themes のコンポーネントとは別物で、`@ark-ui/react` / `@chakra-ui/react` の JS/TS API とも無関係（Rust 製）。
- 実在ブランドのロゴ・商標を模した SVG は含まない。`icon::brand` は六角形 + 中心円の抽象的なバッジ状図形。
- 原案差分: `content: None` は `icon::brand` へフォールバック（`Option<Node>` スロット規約 §11.4 からの意図的な逸脱）。`Some(node)` はそのまま子要素になる。
- 原案差分: Figma の `Brand(swap)` は `Option<Node>` スロットへ変換。サイズは共通 `Size` 5 段へ畳み込み。円形バリアント（`avatar` の `circle`）は持たない。
- ルートは `div`。`<img>` は出力せず、ロゴアセット URL を受け取る API も無い（`src` / `href` / `style` 出力なし）。
- 配色はグレースケールのトークン（`--fw-wire-fill-subtle` / `--fw-wire-ink-muted` / `--fw-wire-line`）。
- スクリーンショットはライセンス上の理由で非掲載（視覚的参照元は blocks.pm の Brand）。

## Related

- [Data Display wireframes](./overview.md)
- [Avatar (wireframe)](./avatar.md)
- [Icon (wireframe)](./icon.md)
