# Card（Application Blocks）

Card は、フォーム入り・メディア付き・情報＋CTA・カーソル追従の各カードの合成例 4 件。blocks は新規 API ではなく既存の Themes / Primitives / core 部品の合成例で、各 block の公開物は未公開 crate docs-site 内部の `pub fn demo() -> Node` と `pub const BLOCK: Block` だけである。

## Signature / Usage

`cursor-hover-cards`（カテゴリ内で最も短い block）の `## Rust コード`。

```rust
use fandhe_frontend_core::{div, text, Node};
use fandhe_frontend_pre_styled_ui::card::{self, CardProps, CardVariant};
use fandhe_frontend_pre_styled_ui::cursor;

/// `cursor-hover-cards` の Demo 本体。呼び出しごとに同一の `Node` を返す
/// 純関数。
pub fn demo() -> Node {
    let plain_card = card::root(
        CardProps::from(CardVariant::Outline),
        vec![("data-fandhe-cursor-target", "ring")],
        vec![
            card::title(vec![], vec![text("Explore")]),
            card::description(vec![], vec![text("Hover to see the cursor change shape.")]),
        ],
    );
    let labeled_card = card::root(
        CardProps::from(CardVariant::Outline),
        vec![
            ("data-fandhe-cursor-target", "ring"),
            ("data-fandhe-cursor-target-label", "View"),
        ],
        vec![
            card::title(vec![], vec![text("View details")]),
            card::description(
                vec![],
                vec![text("Hover to see a label attached to the cursor.")],
            ),
        ],
    );
    let magnetic_card = card::root(
        CardProps::from(CardVariant::Outline),
        vec![
            ("data-fandhe-cursor-target", "ring"),
            ("data-fandhe-cursor-target-label", "Focus"),
            ("data-fandhe-cursor-target-magnetic", ""),
        ],
        vec![
            card::title(vec![], vec![text("Magnetic focus")]),
            card::description(
                vec![],
                vec![text("Hover to see the cursor snap to the card center.")],
            ),
        ],
    );

    div(
        vec![("data-blocks-cursor-hover-cards-grid", "")],
        vec![
            plain_card,
            labeled_card,
            magnetic_card,
            cursor::cursor(vec![]),
        ],
    )
}
```

## Blocks

| slug | 説明 | 使用部品 | 公式 URL |
|------|------|----------|----------|
| card-form-footer | フォーム入りカード。header に題名と説明、body にテキスト入力・select・textarea、footer にキャンセル / 送信ボタン（例 A）と、選択欄を radio card に置き換えた版（例 B）の 2 例 | [Card](../../themes/data-display/card.md) / [Field](../../themes/forms/field.md) / [Input](../../themes/forms/input.md) / [Select](../../themes/collections/select.md) / [Textarea](../../themes/forms/textarea.md) / [Radio Card](../../themes/forms/radio-card.md) / [Button](../../themes/forms/button.md) / [Text](../../themes/typography/text.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/card-form-footer/ |
| card-media-footer | メディア付きカード（カバー画像 + タグ・題名・抜粋 + 下端の著者またはメンバー情報）。単体表示 2 枚とグリッド表示 3 枚 | [Card](../../themes/data-display/card.md) / [Image](../../themes/data-display/image.md) / [Badge](../../themes/data-display/badge.md) / [Heading](../../themes/typography/heading.md) / [Text](../../themes/typography/text.md) / [Avatar](../../themes/data-display/avatar.md) / [Button](../../themes/forms/button.md) / [Menu](../../themes/collections/menu.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/card-media-footer/ |
| card-meta-cta | 題名・分類・説明・要点を縦に並べ下端に主操作ボタンを置く「情報＋CTA」カード。求人・料金プラン・商品の 3 例を同じ骨格で横並び | [Card](../../themes/data-display/card.md) / [Badge](../../themes/data-display/badge.md) / [Heading](../../themes/typography/heading.md) / [Text](../../themes/typography/text.md) / [List](../../themes/typography/list.md) / [Icon](../../themes/data-display/icon.md) / [Button](../../themes/forms/button.md) / [Rating Group](../../themes/forms/rating-group.md) / [Number Input](../../themes/forms/number-input.md) / [Separator](../../themes/utilities/separator.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/card-meta-cta/ |
| cursor-hover-cards | Motion+ Cursor（ポインタに spring で追従するカスタムカーソル）に相当する合成例。カード 3 枚に `data-fandhe-cursor-target` 系の opt-in 属性を付与 | [Card](../../themes/data-display/card.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/cursor-hover-cards/ |

## Notes

- docs-site は crates.io 未公開の crate で、`demo()` は利用者が `use` できる API ではない。利用者は block のコード例をコピーし、既存部品を合成して使う。
- すべての Demo は静的な表示例で、`<form>` 要素を持たず、データ取得・送信・状態管理を行わない。`card-form-footer` のボタンは `type="button"` のまま送信先を持たない。`card-meta-cta` の商品版の数量入力・評価は readonly の固定値表示。
- `cursor-hover-cards` の差分メモ: `data-fandhe-cursor-target`（値 `"ring"`）、`data-fandhe-cursor-target-label`（hover 中にカーソルへ表示するラベル）、`data-fandhe-cursor-target-magnetic`（値なし存在属性、カーソルをカード中心へ吸着）はいずれも `fandhe-frontend-wasm-full` の `cursor` feature（既定 on）が消費する opt-in マーカー。追従演算は `fandhe-frontend-animation::cursor` が `--fandhe-motion-cursor-x` / `-y` の 2 個の CSS カスタムプロパティを書き込む。docs サイトは JS ハイドレーションを行わないため、この Demo ではカーソル追従・hover バリアント変化は発生せず、マークアップと opt-in 属性の使い方のみを示す。
- 出典（pin SHA `cf5edb9b8f1bf2a63d51dcf50a8d2806e2d8f9f9`）: `crates/docs-site/src/blocks/application/card/cursor_hover_cards.rs`（コードは `// blocks-code:begin`〜`end` の範囲）、公式 md は `site/blocks/<slug>.md`。他 3 件も同ディレクトリの `card_<slug_snake>.rs`。

## Related

- [Application Blocks overview](./overview.md)
- [Card](../../themes/data-display/card.md)
- [Profile（Application Blocks）](./profile.md)
