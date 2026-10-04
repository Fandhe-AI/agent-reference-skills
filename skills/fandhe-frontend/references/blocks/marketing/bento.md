# Bento（Marketing Blocks）

bento グリッド（大きさの異なるカードを敷き詰めるレイアウト）向け block 4 件。blocks は新規 API ではなく既存の Themes / Primitives / core 部品の合成例で、各 block の公開物は未公開 crate `docs-site` 内部の `pub fn demo() -> Node` と `pub const BLOCK: Block` だけである。

## Signature / Usage

カテゴリ内で最も短い `bento-staggered`（Motion+ `sections/bento-grids` 相当の scroll-driven stagger）の `## Rust コード` の冒頭抜粋。

```rust
use fandhe_frontend_core::{div, el, text, Node};
use fandhe_frontend_pre_styled_ui::card::{self, CardProps, CardVariant};
use fandhe_frontend_pre_styled_ui::icon::{icon, IconProps};
use fandhe_frontend_pre_styled_ui::recipe::stagger_index_style;
use fandhe_frontend_pre_styled_ui::Size;

/// 装飾用の自作幾何アイコン（lucide 等の著作物を複製しないための単純図形、
/// `sidebar_07::geo_icon` と同型の判断）。`children` は呼び出し側が組み立てる
/// `path`/`circle`/`rect` 等の SVG 子ノード。
fn geo_icon(children: Vec<Node>) -> Node {
    icon(&IconProps::default(), vec![], children)
}

/// 1 枚分のセルデータ（架空の SaaS 機能名 + 1 行説明 + アイコン子ノード）。
struct BentoItem {
    title: &'static str,
    description: &'static str,
    icon_children: fn() -> Vec<Node>,
}

const ITEMS: [BentoItem; 6] = [
    BentoItem {
        title: "Realtime Sync",
        description: "複数デバイス間の状態を数百ミリ秒以内に同期します。",
        icon_children: || {
            vec![el(
                "path",
                vec![("d", "M12 3v6l4-3-4-3zM12 21v-6l-4 3 4 3z")],
                vec![],
            )]
        },
    },
    BentoItem {
        title: "Smart Search",
        description: "自然文クエリからインデックス済みデータを検索します。",
        icon_children: || {
            vec![
                el(
                    "circle",
                    vec![
                        ("cx", "10"),
                        ("cy", "10"),
                        ("r", "6"),
                        ("fill", "none"),
                        ("stroke", "currentColor"),
                        ("stroke-width", "2"),
                    ],
                    vec![],
                ),
                el(
                    "path",
                    vec![
                        ("d", "M15 15l6 6"),
                        ("stroke", "currentColor"),
                        ("stroke-width", "2"),
                    ],
                    vec![],
                ),
            ]
        },
    },
    BentoItem {
        title: "Access Control",
        description: "ロールベースの権限管理で機密データを保護します。",
        icon_children: || {
            vec![el(
                "path",
                vec![("d", "M12 2l8 4v6c0 5-3.5 8-8 10-4.5-2-8-5-8-10V6z")],
                vec![],
            )]
        },
    },
// ...（以下省略。全文は公式ページ https://fandhe-ai.github.io/fandhe-frontend/blocks/bento-staggered/ の「Rust コード」を参照）
```

## Blocks

| Block | Description | 使用部品 | 公式 URL |
| --- | --- | --- | --- |
| `bento-asymmetric-rows` | 幅の異なるカードを 2 行に並べる bento グリッド。共通の見出しエリアの下にキャプション付きで 4 バリエーションを縦に並べ、lg（64rem）以上で複数列、md 以上 lg 未満で 2 列、md 未満で 1 列 | [Badge](../../themes/data-display/badge.md) / [Heading](../../themes/typography/heading.md) / [Text](../../themes/typography/text.md) / [Card](../../themes/data-display/card.md) / [Image](../../themes/data-display/image.md) / [Icon](../../themes/data-display/icon.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/bento-asymmetric-rows/ |
| `bento-staggered` | Motion+ `sections/bento-grids` 相当の scroll-driven stagger。CSS（`animation-timeline: view()` + `animation-range`）のみで各セルがフェード + 下方向スライドインし、非対応ブラウザでは通常表示のまま。1 枚目を 2x2 span の hero に配置 | [Card](../../themes/data-display/card.md) / [Icon](../../themes/data-display/icon.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/bento-staggered/ |
| `bento-three-column-tall` | 両端のセルが縦 2 行にまたがる 3 列 bento。見出し帯（eyebrow badge + 見出し + リード文）の右側（1024px 以上）に CTA ボタン。カバー領域に画像・端末風の枠・コード表示枠の 3 種のメディアを混在。1024px 未満は 1 列積み | [Badge](../../themes/data-display/badge.md) / [Heading](../../themes/typography/heading.md) / [Text](../../themes/typography/text.md) / [Button](../../themes/forms/button.md) / [Card](../../themes/data-display/card.md) / [Image](../../themes/data-display/image.md) / [Code](../../themes/typography/code.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/bento-three-column-tall/ |
| `bento-two-column` | 見出し帯（eyebrow badge + 見出し + リード文）の下に置く 2 列の bento グリッド。各カードは見出しと説明が上、画像が下の縦積みで、768px 未満は 1 列。基準形はカード 4 枚がすべて同じ幅の 2 列 | [Badge](../../themes/data-display/badge.md) / [Heading](../../themes/typography/heading.md) / [Text](../../themes/typography/text.md) / [Card](../../themes/data-display/card.md) / [Image](../../themes/data-display/image.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/bento-two-column/ |

## Notes

- 上記コードは公式 md `## Rust コード` の冒頭抜粋（元は約 163 行）。全文は公式ページを参照する。
- `docs-site` crate は crates.io 未公開。`demo()` と `BLOCK` は利用者が `use` できる API ではなく、コードをコピーして改変する前提の例である。
- フェンス内の doc comment が参照する `LAYOUT_CSS` や `blocks-bento-*` などのクラス名・`data-blocks-bento-staggered-*` 属性に対応するレイアウト CSS（`grid-column` / `grid-row` span、`animation-timeline` など）は `Block.layout_css`（`LayoutCss`）として `.rs` 側に別途登録されており、公式 md のフェンスには含まれない。Rust コードだけではレイアウトとアニメーションのスタイルは付かない。
- 代表 block `bento-staggered` の差分メモ: 出典は Motion+ で、コードを転写せず CSS のみで独自に再実装している。stagger は `animation-delay` ではなく `animation-range` の開始点オフセット（`--fandhe-motion-stagger-index`）で表現し、`prefers-reduced-motion: reduce` ではアニメーションを無効化する。JS ランタイム機構（`fandhe-frontend-wasm-full` の `content_height.rs`）は使わない。機能名・説明は架空。
- `bento-staggered` のフェンスが使う `stagger_index_style` は `fandhe_frontend_pre_styled_ui::recipe` の関数。
- 出典（pin SHA `cf5edb9b8f1bf2a63d51dcf50a8d2806e2d8f9f9`）: `crates/docs-site/src/blocks/marketing/bento/<slug_snake>.rs`、`site/blocks/<slug>.md`。

## Related

- [Marketing Blocks 概要](./overview.md)
- [Card](../../themes/data-display/card.md)
- [Icon](../../themes/data-display/icon.md)
