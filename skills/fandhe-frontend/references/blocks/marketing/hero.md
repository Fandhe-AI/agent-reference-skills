# Hero（Marketing Blocks）

Blocks は新規 API ではなく、既存の Themes / Primitives / core 部品を組み合わせた合成例。各 block の公開物は未公開 crate `docs-site` 内部の `pub fn demo() -> Node` と `pub const BLOCK: Block` のみ。Hero は 16 block。

## Signature / Usage

カテゴリ内で最も短い block `text-split-reveal` の公式コード（`demo()` の中身はコピーして自アプリの関数に取り込む）。

```rust
use fandhe_frontend_core::{div, text, Node};
use fandhe_frontend_pre_styled_ui::button::{self, ButtonProps};
use fandhe_frontend_pre_styled_ui::heading::{self, HeadingLevel, HeadingProps, HeadingSize};
use fandhe_frontend_pre_styled_ui::text::{self, TextProps};
use fandhe_frontend_pre_styled_ui::text_reveal;

pub fn demo() -> Node {
    let title = heading::heading(
        HeadingLevel::H3,
        &HeadingProps {
            size: HeadingSize::Xl4,
            ..HeadingProps::default()
        },
        vec![],
        vec![text_reveal::chars("Built for clarity")],
    );

    let lead = div(
        vec![("class", "blocks-text-split-reveal-lead")],
        vec![text::text(
            &TextProps::default(),
            vec![],
            vec![text_reveal::words("Words fade in one by one, in order.")],
        )],
    );

    let cta = button::button(&ButtonProps::default(), vec![], vec![text("Try it out")]);

    div(
        vec![("class", "blocks-text-split-reveal-inner")],
        vec![title, lead, cta],
    )
}
```

## Blocks

| slug | 説明 | 使用部品 | 公式 URL |
|------|------|----------|----------|
| hero-background-media | 背景画像全面のヒーロー。中央寄せ（基準形）と下寄せ 2 列の 2 形を併記 | [badge](../../themes/data-display/badge.md) / [heading](../../themes/typography/heading.md) / [text](../../themes/typography/text.md) / [button](../../themes/forms/button.md) / [image](../../themes/data-display/image.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/hero-background-media/ |
| hero-bottom-screenshot | 上段に見出し・リード文・CTA、下段に横長スクリーンショットを全幅で置く 1 列ヒーロー | [badge](../../themes/data-display/badge.md) / [heading](../../themes/typography/heading.md) / [text](../../themes/typography/text.md) / [button](../../themes/forms/button.md) / [image](../../themes/data-display/image.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/hero-bottom-screenshot/ |
| hero-editorial-stagger | 上から順に遅延フェードインするヒーロー（JS 不要、CSS `animation-delay`） | [badge](../../themes/data-display/badge.md) / [heading](../../themes/typography/heading.md) / [text](../../themes/typography/text.md) / [button](../../themes/forms/button.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/hero-editorial-stagger/ |
| hero-email-signup | メール登録付きの分割ヒーロー | [badge](../../themes/data-display/badge.md) / [heading](../../themes/typography/heading.md) / [text](../../themes/typography/text.md) / [field](../../themes/forms/field.md) / [input-group](../../themes/forms/input-group.md) / [input](../../themes/forms/input.md) / [button](../../themes/forms/button.md) / [image](../../themes/data-display/image.md) / [visually-hidden](../../themes/utilities/visually-hidden.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/hero-email-signup/ |
| hero-image-tiles | 画像タイルのコラージュ付きヒーロー | [badge](../../themes/data-display/badge.md) / [heading](../../themes/typography/heading.md) / [text](../../themes/typography/text.md) / [button](../../themes/forms/button.md) / [image](../../themes/data-display/image.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/hero-image-tiles/ |
| hero-image-top | 画像を先頭に置くヒーロー | [badge](../../themes/data-display/badge.md) / [heading](../../themes/typography/heading.md) / [text](../../themes/typography/text.md) / [button](../../themes/forms/button.md) / [image](../../themes/data-display/image.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/hero-image-top/ |
| hero-install-command | インストールコマンドのコピー欄を備えたヒーロー。配置・コピー欄形式の差分を 1 つの Demo 内へ 3 インスタンス静的に並記 | [badge](../../themes/data-display/badge.md) / [heading](../../themes/typography/heading.md) / [text](../../themes/typography/text.md) / [clipboard](../../themes/data-display/clipboard.md) / [code](../../themes/typography/code.md) / [input-group](../../themes/forms/input-group.md) / [input](../../themes/forms/input.md) / [button](../../themes/forms/button.md) / [breadcrumb](../../themes/navigation/breadcrumb.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/hero-install-command/ |
| hero-marquee-strip | CTA の下にロゴ列が横へ流れる帯を配置したヒーロー | [badge](../../themes/data-display/badge.md) / [heading](../../themes/typography/heading.md) / [text](../../themes/typography/text.md) / [button](../../themes/forms/button.md) / [marquee](../../themes/typography/marquee.md) / [image](../../themes/data-display/image.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/hero-marquee-strip/ |
| hero-parallax-layers | 背景・中景・前景の 3 レイヤーが `SlotRecipe::parallax` で異なる速度で視差移動（対応ブラウザのみ、非対応は静止。JS 不要） | [heading](../../themes/typography/heading.md) / [text](../../themes/typography/text.md) / [button](../../themes/forms/button.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/hero-parallax-layers/ |
| hero-prompt-input | AI アシスタント向けのプロンプト入力欄付きヒーロー。複数行入力と送信ボタンを 1 つの枠に一体化 | [badge](../../themes/data-display/badge.md) / [heading](../../themes/typography/heading.md) / [text](../../themes/typography/text.md) / [field](../../themes/forms/field.md) / [input-group](../../themes/forms/input-group.md) / [textarea](../../themes/forms/textarea.md) / [button](../../themes/forms/button.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/hero-prompt-input/ |
| hero-search | 検索ボックス中心のヒーロー | [badge](../../themes/data-display/badge.md) / [heading](../../themes/typography/heading.md) / [text](../../themes/typography/text.md) / [field](../../themes/forms/field.md) / [input-group](../../themes/forms/input-group.md) / [input](../../themes/forms/input.md) / [button](../../themes/forms/button.md) / [icon](../../themes/data-display/icon.md) / [link](../../themes/typography/link.md) / [visually-hidden](../../themes/utilities/visually-hidden.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/hero-search/ |
| hero-social-proof | タグライン・見出し・リード文・CTA の下に、重なりアバター群 + readonly の星評価 + 利用者数の短文を置く社会的証明付きヒーロー | [badge](../../themes/data-display/badge.md) / [heading](../../themes/typography/heading.md) / [text](../../themes/typography/text.md) / [button](../../themes/forms/button.md) / [avatar](../../themes/data-display/avatar.md) / [rating-group](../../themes/forms/rating-group.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/hero-social-proof/ |
| hero-split-image | 左テキスト・右画像の最も基本的な分割ヒーロー | [badge](../../themes/data-display/badge.md) / [heading](../../themes/typography/heading.md) / [text](../../themes/typography/text.md) / [button](../../themes/forms/button.md) / [image](../../themes/data-display/image.md) / [avatar](../../themes/data-display/avatar.md) / [icon](../../themes/data-display/icon.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/hero-split-image/ |
| hero-split-screenshot | テキスト列（eyebrow badge・見出し・リード文・CTA 2 個）とアプリ画面画像を列幅より大きく置いて右端へはみ出させる分割ヒーロー | [badge](../../themes/data-display/badge.md) / [heading](../../themes/typography/heading.md) / [text](../../themes/typography/text.md) / [button](../../themes/forms/button.md) / [image](../../themes/data-display/image.md) / [code](../../themes/typography/code.md) / [link](../../themes/typography/link.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/hero-split-screenshot/ |
| hero-terminal | 架空コマンド 3 行が上から順に遅延フェードインするターミナル風ヒーロー。最終行の `text_reveal::typewriter` は opt-in マーカーのみで、文字送りは `wasm-full` のハイドレーション後に行われる | [code](../../themes/typography/code.md) / [kbd](../../themes/typography/kbd.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/hero-terminal/ |
| text-split-reveal | 見出しは文字単位、リード文は単語単位で分割し順にフェードイン（`text_reveal::chars` / `words`、SSR のみで JS 不要）。`aria-hidden` 分割レイヤー + 隠しの完全テキストで読み上げは分断されない | [heading](../../themes/typography/heading.md) / [text](../../themes/typography/text.md) / [button](../../themes/forms/button.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/text-split-reveal/ |

## Notes

- docs-site は crates.io 未公開のため `use` できない。各 block のコードはコピーして自アプリへ取り込む前提。一部 block のコードは docs-site 内部の `crate::blocks::dummy_assets`（ダミー素材）や `LAYOUT_CSS`（block 固有のレイアウト CSS）に依存するため、そのままではコンパイルできない
- 全 block は静的な表示例で `<form>` を持たない。ボタンは送信先を持たず、文言は架空
- `text-split-reveal` は `prefers-reduced-motion: reduce` で最終状態のまま表示される。`hero-editorial-stagger` / `hero-terminal` は同条件で消える
- 各 block 公式ページ末尾の「原案差分メモ」は、参照元の配色・実画像・文言を持ち込まず、テーマトークンと架空の素材・文言へ置き換えた旨の記録
- 出典（pin SHA `cf5edb9b8f1bf2a63d51dcf50a8d2806e2d8f9f9`）: `site/blocks/<slug>.md`、`crates/docs-site/src/blocks/marketing/hero/<slug_snake>.rs`（`text-split-reveal` も hero ディレクトリ配下の `text_split_reveal.rs`）。`rust` フェンスは rs の `// blocks-code:begin` 〜 `end` 範囲と一致

## Related

- [overview.md](./overview.md)
- [heading](../../themes/typography/heading.md)
- [button](../../themes/forms/button.md)
- [image](../../themes/data-display/image.md)
