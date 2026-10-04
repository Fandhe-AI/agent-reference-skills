# Feature（Marketing Blocks）

Blocks は新規 API ではなく、既存の Themes / Primitives / core 部品を組み合わせた合成例。各 block の公開物は未公開 crate `docs-site` 内部の `pub fn demo() -> Node` と `pub const BLOCK: Block` のみ。Feature は 13 block。

## Signature / Usage

カテゴリ内で最も短い block `feature-expand`（hover / `:focus-within` で詳細とボタンが展開するカード 6 枚）の `## Rust コード` の冒頭抜粋。

```rust
use fandhe_frontend_core::{div, el, text, Node};
use fandhe_frontend_pre_styled_ui::button::{self, ButtonProps, ButtonVariant};
use fandhe_frontend_pre_styled_ui::card::{self, CardProps, CardVariant};
use fandhe_frontend_pre_styled_ui::icon::{icon, IconProps};
use fandhe_frontend_pre_styled_ui::Size;

/// 装飾用の自作幾何アイコン（lucide 等の著作物を複製しないための単純図形、
/// `bento_staggered::geo_icon` と同型の判断）。
///
/// `path` へ `fill="none"` + `stroke="currentColor"` を明示し、`icon` の
/// `<svg>` 側が固定で持つ `fill="currentColor"`（塗り面）を上書きして
/// 線画（ストローク）として描画する。`ITEMS` の一部（Live Dashboards 等）
/// の `icon_path_d` は複数の独立した開いた線分（例:
/// `"M4 20V10M10 20V4M16 20v-7M22 20V2"`）で構成され、囲まれた面積を
/// 持たないため塗り面（`fill`）のみでは何も描画されない
/// （`bento_staggered::geo_icon` の `Smart Search` アイテムが同じ理由で
/// `circle`/`path` へ個別に `stroke` を上書きしているのと同型の対処）。
fn geo_icon(path_d: &'static str) -> Node {
    icon(
        &IconProps::default(),
        vec![],
        vec![el(
            "path",
            vec![
                ("d", path_d),
                ("fill", "none"),
                ("stroke", "currentColor"),
                ("stroke-width", "2"),
                ("stroke-linecap", "round"),
                ("stroke-linejoin", "round"),
            ],
            vec![],
        )],
    )
}

/// 1 枚分のカードデータ（架空の SaaS 機能名 + 常時表示の短い説明 +
/// hover/focus 時のみ見える詳細説明）。
struct FeatureItem {
    title: &'static str,
    summary: &'static str,
    detail: &'static str,
    icon_path_d: &'static str,
}

const ITEMS: [FeatureItem; 6] = [
    FeatureItem {
        title: "Instant Search",
        summary: "入力と同時に検索結果を返します。",
        detail: "インデックスをメモリ上に保持し、数万件規模のデータでも \
                  100ms 未満で検索結果を返します。表記の揺れも吸収します。",
        icon_path_d: "M12 2a10 10 0 100 20 10 10 0 000-20z",
    },
    FeatureItem {
        title: "Role-Based Access",
        summary: "ロールごとに閲覧・編集範囲を制御します。",
        detail: "組織単位・チーム単位でロールを定義し、リソースごとに \
                  閲覧・編集・削除の権限を細かく割り当てられます。",
        icon_path_d: "M12 2l8 4v6c0 5-3.5 8-8 10-4.5-2-8-5-8-10V6z",
    },
    FeatureItem {
        title: "Workflow Automation",
        summary: "定型作業をトリガーとルールで自動化します。",
        detail: "イベントの発生を検知し、条件分岐と外部連携を組み合わせた \
                  一連の処理を人手を介さず自動実行します。",
        icon_path_d: "M4 12h6l2-4 4 8 2-4h2",
    },
// ...（以下省略。全文は公式ページ https://fandhe-ai.github.io/fandhe-frontend/blocks/feature-expand/ の「Rust コード」を参照）
```

## Blocks

| slug | 説明 | 使用部品 | 公式 URL |
|------|------|----------|----------|
| feature-accordion-image | 左列に見出しとアコーディオン、右列に代表画像を置く機能紹介。上部にカテゴリ切替ボタン列が付く形（選択中を `aria-pressed` で示す）と 2 形を並記 | [badge](../../themes/data-display/badge.md) / [heading](../../themes/typography/heading.md) / [text](../../themes/typography/text.md) / [accordion](../../themes/disclosure/accordion.md) / [image](../../themes/data-display/image.md) / [button](../../themes/forms/button.md) / [icon](../../themes/data-display/icon.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/feature-accordion-image/ |
| feature-alternating-rows | 中央寄せのセクション見出しの下に「テキスト列 + 横長画像列」の行を積み、偶数行で左右を入れ替える | [badge](../../themes/data-display/badge.md) / [heading](../../themes/typography/heading.md) / [text](../../themes/typography/text.md) / [image](../../themes/data-display/image.md) / [separator](../../themes/utilities/separator.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/feature-alternating-rows/ |
| feature-expand | hover / `:focus-within` で詳細説明とボタンが展開するカード（Motion+ `sections/bento-grids` 相当）。展開は CSS の `grid-template-rows: 0fr → 1fr` のみ | [card](../../themes/data-display/card.md) / [icon](../../themes/data-display/icon.md) / [button](../../themes/forms/button.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/feature-expand/ |
| feature-four-column-grid | 中央寄せ見出し + 導入文の下へアイコン付き feature カードを 4 枚並べるグリッド | [heading](../../themes/typography/heading.md) / [text](../../themes/typography/text.md) / [card](../../themes/data-display/card.md) / [icon](../../themes/data-display/icon.md) / [link-overlay](../../themes/typography/link-overlay.md) / [highlight](../../themes/typography/highlight.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/feature-four-column-grid/ |
| feature-image-cards | 画像 → 短い見出し → 説明の順に積んだカードを 2〜4 列で並べる | [badge](../../themes/data-display/badge.md) / [heading](../../themes/typography/heading.md) / [text](../../themes/typography/text.md) / [card](../../themes/data-display/card.md) / [image](../../themes/data-display/image.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/feature-image-cards/ |
| feature-large-screenshot | 中央寄せの見出しとリード文の下にアプリ画面の大きな画像を全幅で置き、その下に feature 一覧を並べる 1 列構成 | [badge](../../themes/data-display/badge.md) / [heading](../../themes/typography/heading.md) / [text](../../themes/typography/text.md) / [button](../../themes/forms/button.md) / [image](../../themes/data-display/image.md) / [icon](../../themes/data-display/icon.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/feature-large-screenshot/ |
| feature-side-heading-grid | lg 以上でセクションを 5 列 grid にし、左の狭い列へ見出しと説明、右の広い列へ 2 列の feature グリッドを置く | [badge](../../themes/data-display/badge.md) / [heading](../../themes/typography/heading.md) / [text](../../themes/typography/text.md) / [icon](../../themes/data-display/icon.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/feature-side-heading-grid/ |
| feature-split-image | テキスト列 + 4:3 画像列の 2 列構成。基準形に加え、チェック付き箇条書き・発言者付き引用・3 列 feature 一覧を添える形の計 4 形を並記 | [badge](../../themes/data-display/badge.md) / [heading](../../themes/typography/heading.md) / [text](../../themes/typography/text.md) / [button](../../themes/forms/button.md) / [image](../../themes/data-display/image.md) / [blockquote](../../themes/typography/blockquote.md) / [avatar](../../themes/data-display/avatar.md) / [icon](../../themes/data-display/icon.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/feature-split-image/ |
| feature-split-list-image | 左列に見出し・feature 一覧、右列に画像（1 枚または複数枚の組）を置く 2 列構成。インスタンス B のみ lg 以上で左右が入れ替わる | [badge](../../themes/data-display/badge.md) / [heading](../../themes/typography/heading.md) / [text](../../themes/typography/text.md) / [icon](../../themes/data-display/icon.md) / [card](../../themes/data-display/card.md) / [image](../../themes/data-display/image.md) / [button](../../themes/forms/button.md) / [data-list](../../themes/data-display/data-list.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/feature-split-list-image/ |
| feature-split-screenshot | テキスト列（eyebrow badge・見出し・リード文・アイコン付きインライン feature 3 件）と、列幅を超えてはみ出す画像列の 2 列構成 | [badge](../../themes/data-display/badge.md) / [heading](../../themes/typography/heading.md) / [text](../../themes/typography/text.md) / [icon](../../themes/data-display/icon.md) / [image](../../themes/data-display/image.md) / [code](../../themes/typography/code.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/feature-split-screenshot/ |
| feature-tabs-panel | タブ切り替え feature セクションの見た目を再現する 5 形の縦並び。実物の `tabs` は使わず静的表示のため使用部品に含まれない | [badge](../../themes/data-display/badge.md) / [heading](../../themes/typography/heading.md) / [text](../../themes/typography/text.md) / [image](../../themes/data-display/image.md) / [card](../../themes/data-display/card.md) / [icon](../../themes/data-display/icon.md) / [button](../../themes/forms/button.md) / [progress](../../themes/feedback/progress.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/feature-tabs-panel/ |
| feature-three-column-icons | 見出しの下へアイコン・題名・説明を持つ feature を 3 列で並べる定番構成 | [heading](../../themes/typography/heading.md) / [text](../../themes/typography/text.md) / [icon](../../themes/data-display/icon.md) / [link](../../themes/typography/link.md) / [card](../../themes/data-display/card.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/feature-three-column-icons/ |
| feature-vertical-tabs | 左列に縦並びの feature タブ（見た目のみ模した静的表示）、右列に選択中 feature の詳細（見出し・チェック付き機能一覧・画像）。4 機能それぞれを選択済みにした 4 インスタンスを並記 | [heading](../../themes/typography/heading.md) / [text](../../themes/typography/text.md) / [image](../../themes/data-display/image.md) / [icon](../../themes/data-display/icon.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/feature-vertical-tabs/ |

## Notes

- 上記コードは公式 md `## Rust コード` の冒頭抜粋（元は約 139 行）。全文は公式ページを参照する。
- docs-site は crates.io 未公開のため `use` できない。各 block のコードはコピーして自アプリへ取り込む前提。一部 block のコードは docs-site 内部の `crate::blocks::dummy_assets`（ダミー素材）や `LAYOUT_CSS`（block 固有のレイアウト CSS）に依存するため、そのままではコンパイルできない
- 全 block は静的な表示例で `<form>` を持たない。ボタンは送信先を持たず、機能名・説明は架空
- `feature-expand` は Motion+ 由来の合成例（shadcn/ui 由来ではない）。hover の新規配線は行わず CSS のみ（`:hover` / `:focus-within`）で実装し、`fandhe-frontend-wasm-full` の `content_height.rs`（JS ランタイム機構）は使わない。各カードに `Ghost` variant の `button` を置き、キーボード操作者も展開内容へ到達できる
- `feature-tabs-panel` / `feature-vertical-tabs` はタブ列を見た目のみ模した静的表示で、実物の `tabs` コンポーネントを使わない
- 出典（pin SHA `cf5edb9b8f1bf2a63d51dcf50a8d2806e2d8f9f9`）: `site/blocks/<slug>.md`、`crates/docs-site/src/blocks/marketing/feature/<slug_snake>.rs`。`rust` フェンスは rs の `// blocks-code:begin` 〜 `end` 範囲と一致

## Related

- [overview.md](./overview.md)
- [card](../../themes/data-display/card.md)
- [icon](../../themes/data-display/icon.md)
- [accordion](../../themes/disclosure/accordion.md)
