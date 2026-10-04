# Wireframes: Media

`fandhe-frontend-wireframe-ui` の Media カテゴリ（5 部品）。棒グラフ・画像・地図・動画 / メディア枠・データ表を、画面設計図上の配置イメージとして示す非インタラクティブな低忠実度部品群。

## Signature / Usage

| 名前 | 関数 | 説明 | 個別ページ |
|------|------|------|-----------|
| Chart | `chart` | `div` だけで組む棒グラフの配置イメージ（最大 12 本、5 刻み量子化） | [chart.md](./chart.md) |
| Image | `image` | 対角のバツ印の入った正方形 / 円形の画像枠 | [image.md](./image.md) |
| Map | `map` | 街路・区画・道路の線画 + ズーム 3 段 + 任意マーカー | [map.md](./map.md) |
| Media | `media` | 16:9 固定の動画 / メディア埋め込み枠（既定は再生グリフ） | [media.md](./media.md) |
| Table | `table` | N 列 × M 行のデータ表配置（最大 12 列 × 20 行） | [table.md](./table.md) |

カテゴリ共通の使い方（外部リソース URL は受け取らず、`Option<Node>` スロットや数値 / 文字列スライスだけで枠を描く）:

```rust
use fandhe_frontend_wireframe_ui::{icon, image, media, Primary, Size};

image(None, Size::Md, false, Primary(false));
media(Some(icon::image(Size::Md)), Size::Md);
```

## Notes

- 出典: https://fandhe-ai.github.io/fandhe-frontend/wireframes/
- Media 部品はすべて位置引数の関数で、props 構造体は無い。補助型は `map::MapZoom`。`chart` は `Orientation`、`image` は `Primary` を共通型から取る
- Image / Table は Themes に近い部品（Image / Table / Data table）があるが別物の低忠実度部品。Chart は Themes の Bar Chart / Charts とは別物。Map は実地図が必要なら外部の地図サービスを使う想定。`@ark-ui/react` / `@chakra-ui/react` の JS/TS API とは無関係（Rust 製）
- `<img>` / `<video>` / `<iframe>` / `<svg>` / `<canvas>` / `<table>` は出力せず、`src` / `poster` / `href` などの外部リソース引数も持たない
- `role` / `aria-*` / `tabindex` は付与しない
- `Option<Node>` スロット: Media は `None` で再生グリフにフォールバックする（§11.4 からの意図的な逸脱）。Image は `None` でバツ印、Map の `marker` は `None` なら出力しない
- 資源有界化: Chart は `MAX_BARS`（12）、Table は `MAX_TABLE_COLUMNS`（12）/ `MAX_TABLE_ROWS`（20）

## Related

- [共通型 (Size / Orientation)](../foundations/common-types.md)
- [Data Display overview](../data-display/overview.md)
- [Layout overview](../layout/overview.md)
