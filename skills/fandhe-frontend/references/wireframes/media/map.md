# Map

`fandhe-frontend-wireframe-ui` の地図タイル配置イメージプレースホルダー。街路・区画・幹線道路の線画とズーム段階、任意のマーカーだけを CSS で組み立てる非インタラクティブな表示専用部品。API は `map(zoom, marker, size)` の 3 引数。

## Signature / Usage

```rust
pub fn map(zoom: MapZoom, marker: Option<Node>, size: Size) -> Node
```

```rust
use fandhe_frontend_wireframe_ui::map::MapZoom;
use fandhe_frontend_wireframe_ui::{icon, map, Size};

map(MapZoom::Medium, Some(icon::house(Size::Md)), Size::Md);
```

補助型:

```rust
#[derive(Debug, Clone, Copy, PartialEq, Eq, Default)]
pub enum MapZoom {
    /// 遠景（街路グリッドを細かく密に描く）。
    Far,
    /// 標準（既定）。
    #[default]
    Medium,
    /// 近景（街路グリッドを粗く疎に描く）。
    Near,
}
```

## Options / Props

`map()` の引数:

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| zoom | `MapZoom` | `MapZoom::Medium` | ズーム段階（Far / Medium / Near）3 段。街路グリッドのピッチだけが切り替わる修飾 class を 1 つ付与する。 |
| marker | `Option<Node>` | `None` | 省略可能なマーカースロット。`icon::house` 等の既存アイコンをそのまま渡す。`None` のときはパート要素自体を出力しない。 |
| size | `Size` | `Size::Md` | サイズ段階（xs〜xl）。タイル・区画・道路の基準寸法に反映される。 |

`MapZoom`:

| Variant | Description |
| --- | --- |
| `Far` | 遠景（街路グリッドを細かく密に描く）。 |
| `Medium` | 標準（既定）。 |
| `Near` | 近景（街路グリッドを粗く疎に描く）。 |

## Notes

- 出典: https://fandhe-ai.github.io/fandhe-frontend/wireframes/map/
- 低忠実度ワイヤーフレーム部品。Primitives / Themes に対応部品は無く、`@ark-ui/react` / `@chakra-ui/react` の JS/TS API とも無関係（Rust 製）。実際の地図表示が必要な場合は外部の地図サービスまたは独自実装を使う。
- 原案差分: `MapZoom` は `alert::Severity` / `tooltip::TooltipSide` / `progress::ProgressShape` と同型の部品ローカル列挙型で、`props.rs` へは昇格していない。CSS 側では街路グリッドのピッチ（`--fw-wire-map-cell`）だけを切り替える。
- `marker` は `Option<Node>` スロット（§11.4）。`icon` にピン専用グリフが無く、新しいピンアイコンは追加していない（デモでは `icon::house` を代用）。
- 街路・区画・道路は CSS の固定ルール（`repeating-linear-gradient` ほか）で描き、Rust 側で乱数・ハッシュは使わない（決定性）。
- `&str` 引数を持たず、地名ラベル・凡例・帰属表示・検索欄は無い。＋/−ズームボタン、実タイル画像・外部 URL の読み込み、複数マーカーは対象外。
- 非対話: `role` / `aria-*` / `tabindex` / `style` / `on*` / `<img>` / `<iframe>` / `<a>` / `<svg>` / `<canvas>` / `data-*` を出力しない（`marker` スロット由来の `<svg aria-hidden data-icon>` は許容）。配色はグレースケール（`--fw-wire-line` / `--fw-wire-line-subtle` / `--fw-wire-fill-subtle`）。

## Related

- [Media wireframes](./overview.md)
- [Icon (wireframe)](../data-display/icon.md)
