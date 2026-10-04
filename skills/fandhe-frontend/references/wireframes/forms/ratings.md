# Ratings (wireframe)

`fandhe-frontend-wireframe-ui` の星評価風プレースホルダー。星 5 個のうち塗った個数だけを視覚的に示す非インタラクティブな部品。

## Signature / Usage

```rust
// fandhe-frontend-wireframe-ui 0.52.0 / src/ratings.rs
/// 星の総数（固定）。[`ratings`] はこの個数の星を常に描く。
pub const STAR_COUNT: u8 = 5;

#[must_use]
pub fn ratings(rating: u8, size: Size) -> Node

// 呼び出し例
use fandhe_frontend_wireframe_ui::{ratings, Size};

ratings(4, Size::Md)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| rating | `u8` | - | 塗る星の数。5 超は 5 へクランプする。 |
| size | `Size` | `Size::Md` | サイズ段階（xs〜xl）。 |

## Notes

- 出典: https://fandhe-ai.github.io/fandhe-frontend/wireframes/ratings/
- 低忠実度のワイヤーフレーム部品であり、Primitives / Themes の Rating Group とは別物。`<input type="radio">` 群・`role="radiogroup"`・ポインタ / キーボード操作は実装しない。操作可能な評価入力が必要な場合は Themes / Primitives の Rating Group を使う
- `@ark-ui/react` / `@chakra-ui/react` の JS/TS API とは無関係（Rust 製）
- 星の総数は `STAR_COUNT = 5` 固定。総数を変える `max` 引数は無い
- 星のジオメトリは `icon::star` を再利用する
- 塗り状態は共通型 `Active` に畳み込み、先頭から `rating`（クランプ後）個の星に `data-active=""` を付与する
- 評価値そのもの（`data-rating` / `data-value` 等）は `data-*` へ出力しない。`role="img"` / `aria-label` も付けない
- 文字列引数を持たない（`u8` と `Size` のみ）ため、テキスト引数のエスケープ回帰テストは対象外
- 塗り済みの星は `--fw-wire-ink`、未塗りは `--fw-wire-line` トークン

## Related

- [Forms overview](./overview.md)
- [共通型 (Size / Active)](../foundations/common-types.md)
- [Rating Group (Themes)](../../themes/forms/rating-group.md)
- [Rating Group (Primitives)](../../primitives/form/rating-group.md)
