# Marker

会話スレッド内のインライン注記行（システム注記・日付等の区切り・ラベル付きセパレータ）を表現するスタイル済み部品。

## Signature / Usage

```rust
use fandhe_frontend_core::text;
use fandhe_frontend_pre_styled_ui::marker::{self, MarkerRootProps, MarkerTone, MarkerVariant};

let node = marker::root(
    MarkerRootProps {
        variant: MarkerVariant::Label,
        tone: MarkerTone::Info,
    },
    vec![],
    vec![marker::content(vec![], vec![text("Today")])],
);
let css = marker::stylesheet();
```

## Anatomy

`root` → `icon` / `content`

## Options / Props

`MarkerRootProps`（headless 層の型を再エクスポート）:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `MarkerVariant`（`Note` \| `Divider` \| `Label`） | `Note` | 形態（`data-variant`）。`note` は線なしのインライン注記、`divider` は行の下に境界線、`label` は中央ラベル + 左右の線 |
| `tone` | `MarkerTone`（`Neutral` \| `Info` \| `Warning` \| `Danger`） | `Neutral` | 色調（`data-tone`）。注記の文字色と線色を切り替える |

パーツ関数（すべて `#[must_use]`、呼び出し側 `class` は除去される）:

| Function | Signature |
|----------|-----------|
| `root` | `(props: MarkerRootProps, attrs: Vec<(&str, &str)>, children: Vec<Node>) -> Node` |
| `icon` / `content` | `(attrs: Vec<(&str, &str)>, children: Vec<Node>) -> Node` |
| `stylesheet` | `() -> String` |

## Notes

- 出典: https://fandhe-ai.github.io/fandhe-frontend/themes/marker/
- `@chakra-ui/react` の JS/TS API とは別物（Rust 製）
- `variant` / `tone` は headless 層の `data-variant` / `data-tone` を CSS セレクタとして参照するだけで、class ベースの `ColorPalette` 軸は持たない。`tone` は `ColorPalette` と同名の 4 値
- 区切り線は疑似要素を使わない。`divider` は DOM を増やさず `root` に `border-bottom` を適用する。`label` は `root` が `children` をスタイル済み Separator（水平・実線、`aria-hidden="true"`）2 個で挟んでから headless 層へ委譲する（短いラベルの前後で `role="separator"` が 2 回読み上げられるのを避けるため）
- `label` 形態を使う場合は、本 mod の `stylesheet()` に加えて `separator` mod の `css()` も読み込む（`stylesheet()` は separator の基本規則を含まない）。`note` / `divider` のみなら不要
- 線色は `root` が公開する `--fandhe-marker-line` で tone と連動する
- `icon` は `aria-hidden="true"` を固定付与（呼び出し側の `aria-hidden="false"` は除去）。`content` は本文テキストを受けるスロット。`root` には `role` を固定付与しないため、ストリーミング中の注記に `role="status"` が必要なら呼び出し側が `attrs` で渡す
- ストリーミング中判定・注記の自動分類・タイムスタンプ整形は実装しない

## Related

- [Primitives: Marker](../../primitives/display/marker.md)
- [Message](./message.md)
- [Bubble](./bubble.md)
