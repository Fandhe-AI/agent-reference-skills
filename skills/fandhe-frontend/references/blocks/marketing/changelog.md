# Changelog（Marketing Blocks）

更新履歴（リリースノート）向け block 4 件。blocks は新規 API ではなく既存の Themes / Primitives / core 部品の合成例で、各 block の公開物は未公開 crate `docs-site` 内部の `pub fn demo() -> Node` と `pub const BLOCK: Block` だけである。

## Signature / Usage

カテゴリ内で最も短い `changelog-accordion`（アコーディオン型 changelog）の `## Rust コード` の冒頭抜粋。

```rust
use fandhe_frontend_core::{div, el, text, Node};
use fandhe_frontend_pre_styled_ui::accordion::{
    self, item, item_content, item_indicator, item_trigger, AccordionProps, OpenState,
};
use fandhe_frontend_pre_styled_ui::badge::{self, BadgeProps};
use fandhe_frontend_pre_styled_ui::heading::{
    heading, HeadingLevel, HeadingProps, HeadingSize, HeadingWeight,
};
use fandhe_frontend_pre_styled_ui::image::{self, AspectRatio, ImageProps, ImageShape};
use fandhe_frontend_pre_styled_ui::list::{self, ListType, ListVariant};
use fandhe_frontend_pre_styled_ui::text::{self as styled_text, TextProps, TextVariant};
use fandhe_frontend_pre_styled_ui::Size;

use crate::blocks::dummy_assets;

/// リリース 1 件分のダミーデータ（架空、実在の製品・企業とは無関係）。
struct Release {
    version: &'static str,
    date_iso: &'static str,
    date_label: &'static str,
    title: &'static str,
    tags: &'static [&'static str],
    image_src: &'static str,
    changes: &'static [&'static str],
}

/// リリース一覧（架空、4 件。モジュール doc「静的表示」節のとおり全件を
/// open + disabled で固定描画する）。
const RELEASES: [Release; 4] = [
    Release {
        version: "v2.4.0",
        date_iso: "2026-09-18",
        date_label: "2026年9月18日",
        title: "アコーディオン型 changelog を追加",
        tags: &["新機能"],
        image_src: dummy_assets::SCREENSHOT_SRC,
        changes: &[
            "リリース単位で区切って表示する changelog レイアウトを追加",
            "全リリースを常時展開表示するデモ表示に対応",
        ],
    },
    Release {
        version: "v2.3.0",
        date_iso: "2026-09-10",
        date_label: "2026年9月10日",
        title: "ダミー素材ヘルパを共通化",
        tags: &["改善", "内部"],
        image_src: dummy_assets::PRODUCT_SRC,
        changes: &[
            "プレースホルダー画像・文言の生成をヘルパへ一元化",
            "block ごとの個別実装によるブレを解消",
        ],
    },
    Release {
        version: "v2.2.1",
        date_iso: "2026-09-02",
        date_label: "2026年9月2日",
        title: "画像スロットの表示崩れを修正",
        tags: &["修正"],
        image_src: dummy_assets::BACKGROUND_SRC,
        changes: &["狭い幅での画像の縦横比崩れを修正"],
    },
    Release {
        version: "v2.2.0",
        date_iso: "2026-08-20",
        date_label: "2026年8月20日",
        title: "変更点リストの表示を刷新",
        tags: &["改善"],
        image_src: dummy_assets::SCREENSHOT_SRC,
        changes: &[
            "変更点を種別ごとに読みやすく整理",
            "長い項目でも折り返しが崩れないよう調整",
        ],
    },
];
// ...（以下省略。全文は公式ページ https://fandhe-ai.github.io/fandhe-frontend/blocks/changelog-accordion/ の「Rust コード」を参照）
```

## Blocks

| Block | Description | 使用部品 | 公式 URL |
| --- | --- | --- | --- |
| `changelog-accordion` | アコーディオン型 changelog。左寄せの見出し・リード文の下に、リリース単位で個別の枠に囲まれたアコーディオン項目を縦に並べる。全リリースを常時展開し、トリガーは `disabled` で開閉できない静的表示。ブレークポイントによる段組み切替なし | [Heading](../../themes/typography/heading.md) / [Text](../../themes/typography/text.md) / [Badge](../../themes/data-display/badge.md) / [Accordion](../../themes/disclosure/accordion.md) / [List](../../themes/typography/list.md) / [Image](../../themes/data-display/image.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/changelog-accordion/ |
| `changelog-stacked-list` | リリースを縦に積む changelog。見出しとリード文の下に区切り方の異なる 2 例を並べる（罫線区切り = 主参照 R0045、カード + 全面リンク = 副参照 R0044） | [Heading](../../themes/typography/heading.md) / [Text](../../themes/typography/text.md) / [Badge](../../themes/data-display/badge.md) / [Card](../../themes/data-display/card.md) / [List](../../themes/typography/list.md) / [Link Overlay](../../themes/typography/link-overlay.md) / [Separator](../../themes/utilities/separator.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/changelog-stacked-list/ |
| `changelog-timeline` | タイムライン型 changelog。中央寄せの見出し・リード文の下にリリースを縦のタイムラインで並べる。日付 + version 枠・connector・本文の 3 列構成と、indicator 自体を日付入りピルにした outline 表現の 2 インスタンス。48rem 未満では日付・version の左列を隠し本文内に同内容を表示 | [Heading](../../themes/typography/heading.md) / [Text](../../themes/typography/text.md) / [Badge](../../themes/data-display/badge.md) / [Timeline](../../themes/data-display/timeline.md) / [List](../../themes/typography/list.md) / [Image](../../themes/data-display/image.md) / [Link](../../themes/typography/link.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/changelog-timeline/ |
| `changelog-timeline-subscribe` | 購読フォーム付きのタイムライン型 changelog。見出し・リード文の下にメール入力欄とボタンを連結した購読フォーム、その下に日付列 / コネクタ / 本文列の 3 列タイムライン。購読ボタンは `type="button"` で送信処理・バリデーションを持たず、可視ラベルは出さず visually-hidden な `<label for>` で補う | [Heading](../../themes/typography/heading.md) / [Text](../../themes/typography/text.md) / [Field](../../themes/forms/field.md) / [Input](../../themes/forms/input.md) / [Button](../../themes/forms/button.md) / [Badge](../../themes/data-display/badge.md) / [Timeline](../../themes/data-display/timeline.md) / [List](../../themes/typography/list.md) / [Visually Hidden](../../themes/utilities/visually-hidden.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/changelog-timeline-subscribe/ |

## Notes

- 上記コードは公式 md `## Rust コード` の冒頭抜粋（元は約 254 行）。全文は公式ページを参照する。
- `docs-site` crate は crates.io 未公開。`demo()` と `BLOCK` は利用者が `use` できる API ではなく、コードをコピーして改変する前提の例である。
- 上のフェンスの `use crate::blocks::dummy_assets;` と `dummy_assets::*_SRC` は docs サイト内部の非公開ヘルパ（ダミー画像素材）。コピー時は自前の画像 URL に差し替える。
- `blocks-changelog-*` などのクラス名に当たるレイアウト CSS は `Block.layout_css`（`LayoutCss`）として `.rs` 側に別途登録されており、公式 md のフェンスには含まれない。Rust コードだけではレイアウトのスタイルは付かない。
- 代表 block `changelog-accordion` の差分メモ（各 block ページ末尾に個別記載）: 見出しは `h3`、トリガーの装飾バッジを外して version・日付・タイトルの 3 点のみ、全件を open + disabled に固定した静的表示（JS の状態機械は再現しない）、開閉インジケータはテキスト「▾」、日付に機械可読な `datetime` 属性を付与。
- 文言・バージョン番号・日付・変更点はすべて架空。静的表示で `<form>` は使わず、データ取得・送信も行わない。
- 出典（pin SHA `cf5edb9b8f1bf2a63d51dcf50a8d2806e2d8f9f9`）: `crates/docs-site/src/blocks/marketing/changelog/<slug_snake>.rs`、`site/blocks/<slug>.md`。

## Related

- [Marketing Blocks 概要](./overview.md)
- [Accordion](../../themes/disclosure/accordion.md)
- [Timeline](../../themes/data-display/timeline.md)
