# Contact（Marketing Blocks）

Blocks は新規 API ではなく、既存の Themes / Primitives / core 部品を組み合わせた合成例。各 block の公開物は未公開 crate `docs-site` 内部の `pub fn demo() -> Node` と `pub const BLOCK: Block` のみ。Contact は 8 block。

## Signature / Usage

カテゴリ内で最も短い block `contact-image-info`（左に角丸の画像、右にタグライン・見出し・説明文と連絡先リンク 3 件）の `## Rust コード` の冒頭抜粋。

```rust
use crate::blocks::dummy_assets;
use fandhe_frontend_core::{div, el, li, text, ul, Node};
use fandhe_frontend_pre_styled_ui::heading::{heading, HeadingLevel, HeadingProps, HeadingSize};
use fandhe_frontend_pre_styled_ui::icon::{icon, IconProps};
use fandhe_frontend_pre_styled_ui::image::{self, AspectRatio, ImageFit, ImageProps, ImageShape};
use fandhe_frontend_pre_styled_ui::link::{self, LinkProps};
use fandhe_frontend_pre_styled_ui::text::{self as styled_text, TextProps, TextSize, TextVariant};

/// 住所リンクの固定外部 URL（モジュール doc「連絡先リンクの `href` 方針」
/// 節参照）。実在の地図サービスへは接続しない。
const REPO: &str = "https://github.com/Fandhe-AI/fandhe-frontend";

/// 自作の幾何アイコン（線画。モジュール doc「アイコンは自作の単純図形」
/// 節参照）。`path` へ `fill="none"` + `stroke="currentColor"` を明示し、
/// `icon` の `<svg>` 側が固定で持つ `fill="currentColor"`（塗り面）を
/// 上書きして線画（ストローク）として描画する。
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

/// 電話アイコン（角丸長方形の端末 + 上端の短い線）。
fn phone_icon() -> Node {
    geo_icon("M6 4h6v2H8v12h4v2H6z M9 6h1 M4 10c0 6 4 10 10 10")
}

/// メールアイコン（封筒 + V 字の折り返し線）。
fn mail_icon() -> Node {
    geo_icon("M3 6h18v12H3z M3 7l9 6 9-6")
}

/// 住所アイコン（ピン: 円 + 下向きの雫形）。
fn address_icon() -> Node {
    geo_icon(
        "M12 21s-7-6.5-7-11a7 7 0 0 1 14 0c0 4.5-7 11-7 11z M12 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4z",
    )
}

/// 画像領域（角丸の正方形画像。モジュール doc「使用部品」節）。
fn media() -> Node {
    div(
        vec![("class", "blocks-contact-image-info-media")],
        vec![image::image(
            &ImageProps {
                fit: ImageFit::Cover,
                aspect_ratio: AspectRatio::Square,
                shape: ImageShape::Rounded,
                ..ImageProps::new(dummy_assets::BACKGROUND_SRC, "")
            },
            vec![("data-blocks-contact-image-info-image", "")],
        )],
    )
}
// ...（以下省略。全文は公式ページ https://fandhe-ai.github.io/fandhe-frontend/blocks/contact-image-info/ の「Rust コード」を参照）
```

## Blocks

| slug | 説明 | 使用部品 | 公式 URL |
|------|------|----------|----------|
| contact-centered-form | 中央寄せの問い合わせフォーム。タグライン・見出し・説明文の下に、氏名・メール・会社名・電話番号・お問い合わせ内容 + 同意チェック + 送信ボタンのフォームを配置 | [heading](../../themes/typography/heading.md) / [text](../../themes/typography/text.md) / [badge](../../themes/data-display/badge.md) / [field](../../themes/forms/field.md) / [input](../../themes/forms/input.md) / [textarea](../../themes/forms/textarea.md) / [checkbox](../../themes/forms/checkbox.md) / [native-select](../../themes/forms/native-select.md) / [button](../../themes/forms/button.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/contact-centered-form/ |
| contact-dialog-form | ダイアログ内に問い合わせフォーム（氏名・メールアドレス・お問い合わせ内容）を配置 | [dialog](../../themes/overlays/dialog.md) / [field](../../themes/forms/field.md) / [input](../../themes/forms/input.md) / [textarea](../../themes/forms/textarea.md) / [button](../../themes/forms/button.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/contact-dialog-form/ |
| contact-form-testimonial | 問い合わせフォームと推薦文を横に並べた 2 カラム構成 | [heading](../../themes/typography/heading.md) / [text](../../themes/typography/text.md) / [field](../../themes/forms/field.md) / [input](../../themes/forms/input.md) / [textarea](../../themes/forms/textarea.md) / [button](../../themes/forms/button.md) / [blockquote](../../themes/typography/blockquote.md) / [image](../../themes/data-display/image.md) / [icon](../../themes/data-display/icon.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/contact-form-testimonial/ |
| contact-image-info | 画像 + 連絡先リンク（電話・メール・住所）のお問い合わせ用ブロック。md（48rem）以上で 2 列、未満で縦積み | [heading](../../themes/typography/heading.md) / [text](../../themes/typography/text.md) / [image](../../themes/data-display/image.md) / [icon](../../themes/data-display/icon.md) / [link](../../themes/typography/link.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/contact-image-info/ |
| contact-info-columns | 連絡先カラム一覧（お問い合わせ窓口・拠点一覧） | [heading](../../themes/typography/heading.md) / [text](../../themes/typography/text.md) / [icon](../../themes/data-display/icon.md) / [link](../../themes/typography/link.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/contact-info-columns/ |
| contact-split-form-image | フォーム + 画像の 2 カラムお問い合わせ用ブロック | [heading](../../themes/typography/heading.md) / [text](../../themes/typography/text.md) / [field](../../themes/forms/field.md) / [input](../../themes/forms/input.md) / [textarea](../../themes/forms/textarea.md) / [radio-group](../../themes/forms/radio-group.md) / [fieldset](../../themes/forms/fieldset.md) / [separator](../../themes/utilities/separator.md) / [button](../../themes/forms/button.md) / [image](../../themes/data-display/image.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/contact-split-form-image/ |
| contact-split-form-info | 問い合わせフォーム + 連絡先情報の 2 カラムブロック | [heading](../../themes/typography/heading.md) / [text](../../themes/typography/text.md) / [badge](../../themes/data-display/badge.md) / [field](../../themes/forms/field.md) / [input](../../themes/forms/input.md) / [textarea](../../themes/forms/textarea.md) / [checkbox](../../themes/forms/checkbox.md) / [button](../../themes/forms/button.md) / [icon](../../themes/data-display/icon.md) / [separator](../../themes/utilities/separator.md) / [link](../../themes/typography/link.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/contact-split-form-info/ |
| contact-split-info | 見出し左 + 連絡先情報右の分割レイアウト | [heading](../../themes/typography/heading.md) / [text](../../themes/typography/text.md) / [card](../../themes/data-display/card.md) / [icon](../../themes/data-display/icon.md) / [link](../../themes/typography/link.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/contact-split-info/ |

## Notes

- 上記コードは公式 md `## Rust コード` の冒頭抜粋（元は約 141 行）。全文は公式ページを参照する。
- docs-site は crates.io 未公開のため `use` できない。各 block のコードはコピーして自アプリへ取り込む前提。一部 block のコードは docs-site 内部の `crate::blocks::dummy_assets`（ダミー素材）や `LAYOUT_CSS`（block 固有のレイアウト CSS）に依存するため、そのままではコンパイルできない。上記 Signature / Usage のコードも `dummy_assets`（画像のダミー）に依存する
- 全 block は静的な表示例で `<form>` 要素を出力しない（フォーム系 block も入力欄・送信ボタンを並べるのみで、送信先やバリデーションを持たない）。データの取得・送信・状態管理は行わない
- `contact-image-info` の電話・メールリンクは `tel:` / `mailto:` の実プロトコルリンクだが、番号・アドレスは架空値（電話は北米の架空番号用予約域 555-01xx、メールは RFC 2606 の予約ドメイン `example.com`）。住所リンクはリポジトリへの固定外部 URL で、実在の地図サービスへは接続しない
- 公式ページの差分メモ（`contact-image-info`）: 見出しは `h3`（ページ側が `## Demo` として `h2` を出すため）、`href="#"` の死リンクは使わない、アイコンは自作の幾何アイコン（線画）、`id` や `aria-labelledby` は出力しない、ブレークポイントは `48rem`（`md`）固定
- 出典（pin SHA `cf5edb9b8f1bf2a63d51dcf50a8d2806e2d8f9f9`）: `site/blocks/<slug>.md`、`crates/docs-site/src/blocks/marketing/contact/<slug_snake>.rs`。`rust` フェンスは rs の `// blocks-code:begin` 〜 `end` 範囲と一致

## Related

- [overview.md](./overview.md)
- [field](../../themes/forms/field.md)
- [input](../../themes/forms/input.md)
- [link](../../themes/typography/link.md)
