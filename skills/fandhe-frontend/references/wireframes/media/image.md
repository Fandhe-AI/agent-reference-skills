# Image

`fandhe-frontend-wireframe-ui` の画像プレースホルダー。対角のバツ印が入った正方形（または円形）の枠で、画像が入る場所をワイヤーフレーム上に示す非インタラクティブな部品。API は `image(content, size, circle, primary)` の 4 引数。

## Signature / Usage

```rust
pub fn image(content: Option<Node>, size: Size, circle: bool, primary: Primary) -> Node
```

```rust
use fandhe_frontend_wireframe_ui::{icon, image, Primary, Size};

image(None, Size::Md, false, Primary(false));                          // バツ印プレースホルダー
image(Some(icon::image(Size::Md)), Size::Md, false, Primary(false));   // スロット差し替え
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| content | `Option<Node>` | `None` | 省略可能なコンテンツスロット。`None` のときはバツ印プレースホルダーを描き、子要素を出力しない。 |
| size | `Size` | `Size::Md` | サイズ段階（xs〜xl）。枠の寸法に反映される（正方形は control_size の 3 倍）。 |
| circle | `bool` | `false` | true のとき円形（`fw-wire-image-circle`）バリアントにする。 |
| primary | `Primary` | `Primary(false)` | true のとき強調（反転色）バリアントにする。 |

## Notes

- 出典: https://fandhe-ai.github.io/fandhe-frontend/wireframes/image/
- 低忠実度ワイヤーフレーム部品。Themes の `Image` とは別物（Primitives に対応部品は無い）で、`@ark-ui/react` / `@chakra-ui/react` の JS/TS API とも無関係（Rust 製）。実際に画像を表示する部品が必要な場合は Themes の Image を使う。
- `<img>` と画像 URL を受け取る API は持たない。ルートは `div` で、`src` / `href` / `style` は出力しない（外部リソース読み込みの経路を作らないため）。
- バツ印は `background-image` の `linear-gradient` 2 本で描く。線色は `--fw-wire-line`（既定）のグレースケールトークン。
- `circle` は `avatar` と同型の部品固有修飾 class で、`props` へは昇格していない。黒塗り（反転配色）は共通型 `Primary` の opt-in。
- `content` スロットは §11.4 の原則に従う（`avatar` のような逸脱はない）: `None` ならバツ印のみで子要素なし、`Some(node)` はそのまま子要素になる。
- 寸法は常に正方形（`--fw-wire-control-size` の 3 倍）で、16:9 等のアスペクト比バリアントは対象外。
- スクリーンショットは非掲載（視覚的参照元は blocks.pm の Image）。

## Related

- [Media wireframes](./overview.md)
- [Avatar (wireframe)](../data-display/avatar.md)
- [Image (Themes)](../../themes/data-display/image.md)
