# Table（Application Blocks）

グループ行・レスポンシブ・リッチ行・並び替え + 一括選択・合計行・見出し付き・ツールバー付きのテーブルの合成例 7 件。Blocks は新規 API ではなく既存の Themes / Primitives / core 部品の合成例で、各 block の公開物は未公開 crate `docs-site` 内部の `pub fn demo() -> Node` と `pub const BLOCK: Block` だけである。

## Signature / Usage

カテゴリ内で最も短い `table-summary-rows`（小計・消費税・合計の集計行を持つ明細テーブル）の `## Rust コード` の冒頭抜粋。

```rust
use fandhe_frontend_core::{div, el, text, Node};
use fandhe_frontend_pre_styled_ui::recipe::Size;
use fandhe_frontend_pre_styled_ui::strong;
use fandhe_frontend_pre_styled_ui::table::{self, TableProps};
use fandhe_frontend_pre_styled_ui::text::{self as styled_text, TextProps, TextSize, TextVariant};

/// 明細データ（品目名・数量・単価）。行金額・小計・税・合計はすべて
/// ここから [`demo`] が計算する（金額の手書きを避けるための単一の正）。
const ITEMS: &[(&str, u32, u32)] = &[
    ("ノートスタンド", 2, 3_200),
    ("ワイヤレスキーボード", 1, 8_900),
    ("USB-C ハブ", 3, 2_400),
    ("デスクマット", 1, 4_500),
];

/// 消費税率（10%）。整数演算で丸め誤差を避けるため、税額は
/// `小計 * TAX_RATE_PERCENT / 100` で求める。
const TAX_RATE_PERCENT: u32 = 10;

/// 金額（円単位の整数）を 3 桁区切りの表示文字列へ整形する（内部専用の
/// 小さな helper。`format!` は数値のみを扱い HTML を組み立てないため
/// REQ-1 の既定エスケープ経路に影響しない）。
fn yen(amount: u32) -> String {
    let digits = amount.to_string();
    let mut grouped = String::with_capacity(digits.len() + digits.len() / 3);
    for (index, ch) in digits.chars().rev().enumerate() {
        if index > 0 && index % 3 == 0 {
            grouped.push(',');
        }
        grouped.push(ch);
    }
    let grouped: String = grouped.chars().rev().collect();
    format!("¥{grouped}")
}

/// `<col>` 1 本を組み立てる（`table.rs` に `colgroup`/`col` の anatomy が
/// ないため `fandhe_frontend_core::el` で直接組み立てる、モジュール doc
/// 「狭幅で数量列を隠し」節参照）。
fn col<'a>(attrs: Vec<(&'a str, &'a str)>) -> Node {
    el("col", attrs, vec![])
}

/// `<colgroup>`（品目・数量・金額の 3 列）を組み立てる。数量列の `<col>`
/// にのみ `data-blocks-table-summary-rows-qty-col` を付け、狭幅時に
/// [`LAYOUT_CSS`] がこの列を `visibility: collapse` で縮める。
fn column_group() -> Node {
    el(
        "colgroup",
        vec![],
        vec![
            col(vec![]),
            col(vec![("data-blocks-table-summary-rows-qty-col", "")]),
            col(vec![]),
        ],
    )
}

/// 明細 1 行（`tbody` の `tr`）を組み立てる。品目名セルには狭幅専用の
/// 「数量 n」補足（[`ITEMS`] の doc「狭幅で数量列を隠し」節参照）を持つ。
fn item_row(name: &str, qty: u32, unit_price: u32) -> Node {
    let amount = qty * unit_price;
    let note = styled_text::text(
        &TextProps {
            size: TextSize::Xs,
            variant: TextVariant::Muted,
            ..TextProps::default()
        },
        vec![("data-blocks-table-summary-rows-note", "")],
        vec![text(format!("数量 {qty}"))],
    );
    table::row(
        vec![],
        vec![
            table::row_header(vec![], vec![text(name), note]),
            table::cell(
                vec![
                    ("data-align", "end"),
                    ("data-blocks-table-summary-rows-qty", ""),
                ],
                vec![text(qty.to_string())],
            ),
            table::cell(vec![("data-align", "end")], vec![text(yen(amount))]),
        ],
    )
}
// ...（以下省略。全文は公式ページ https://fandhe-ai.github.io/fandhe-frontend/blocks/table-summary-rows/ の「Rust コード」を参照）
```

## Blocks

| Slug | Description | Parts | Official URL |
|------|-------------|-------|--------------|
| `table-grouped-rows` | 地域・日付ごとにグループ見出し行を挟んで行をまとめるテーブル（列見出し可視 + 地域グループの版と、列見出しを視覚的に隠した + 日付グループの版） | [Table](../../themes/data-display/table.md), [Badge](../../themes/data-display/badge.md), [Visually Hidden](../../themes/utilities/visually-hidden.md), [Heading](../../themes/typography/heading.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/table-grouped-rows/ |
| `table-responsive-stacked` | 広幅では氏名・メール・役職・所属・操作の 5 列、コンテナ幅 `40rem` 未満では副次列を隠して氏名セル内の定義リストへ畳むテーブル | [Table](../../themes/data-display/table.md), [Data List](../../themes/data-display/data-list.md), [Heading](../../themes/typography/heading.md), [Button](../../themes/forms/button.md), [Visually Hidden](../../themes/utilities/visually-hidden.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/table-responsive-stacked/ |
| `table-rich-rows` | 先頭列にアバター + 氏名/メールの 2 段テキスト、状態列にバッジを置くリッチテーブル（members と deploys の 2 インスタンス） | [Table](../../themes/data-display/table.md), [Avatar](../../themes/data-display/avatar.md), [Badge](../../themes/data-display/badge.md), [Status](../../themes/data-display/status.md), [Link](../../themes/typography/link.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/table-rich-rows/ |
| `table-sortable-bulk` | 列見出しに並び替え印、先頭列に行選択チェックボックスを置くデータテーブル。選択時は一括操作ツールバー（アーカイブ/削除）を重ねる。「未選択」「選択中（4 行中 3 行）」の 2 状態を静的に併記 | [Data Table](../../themes/data-display/data-table.md), [Table](../../themes/data-display/table.md), [Checkbox](../../themes/forms/checkbox.md), [Button](../../themes/forms/button.md), [Icon](../../themes/data-display/icon.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/table-sortable-bulk/ |
| `table-summary-rows` | 品目・数量・金額の明細行の下に小計・消費税・合計の集計行（`tfoot`）を持つ明細テーブル | [Table](../../themes/data-display/table.md), [Text](../../themes/typography/text.md), [Strong](../../themes/typography/strong.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/table-summary-rows/ |
| `table-with-heading` | 表題・説明・右端の「追加」ボタンの下に一覧テーブルを置く基本形に、カード枠・全幅・縞模様・小型大文字の列見出しなどの派生形を併記 | [Heading](../../themes/typography/heading.md), [Text](../../themes/typography/text.md), [Button](../../themes/forms/button.md), [Table](../../themes/data-display/table.md), [Card](../../themes/data-display/card.md), [Badge](../../themes/data-display/badge.md), [Link](../../themes/typography/link.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/table-with-heading/ |
| `table-with-toolbar` | 見出し帯・検索・絞り込み/新規作成ボタン・横スクロール対応の表・フッターの件数表示/ページ送りを持つツールバー付きテーブル | [Heading](../../themes/typography/heading.md), [Text](../../themes/typography/text.md), [Input Group](../../themes/forms/input-group.md), [Input](../../themes/forms/input.md), [Button](../../themes/forms/button.md), [Icon](../../themes/data-display/icon.md), [Table](../../themes/data-display/table.md), [Badge](../../themes/data-display/badge.md), [Pagination](../../themes/collections/pagination.md), [Scroll Area](../../themes/disclosure/scroll-area.md), [Tabs](../../themes/disclosure/tabs.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/table-with-toolbar/ |

## Notes

- 上記コードは公式 md `## Rust コード` の冒頭抜粋（元は約 176 行）。全文は公式ページを参照する。
- Blocks は Themes / Primitives / core 部品の合成例で、公開 crate の API を使う側のコード例。`docs-site` crate は crates.io 未公開のため `use` できず、コードをコピーして利用する前提。
- 各 block の `BLOCK.parts` の label と公式 md 冒頭の使用部品は一致する（`BLOCK` の構造は [overview.md](./overview.md) を参照）。
- 無 JS の静的表示で `<form>` は含まない。取引先名・担当者名・金額・日付・コミット情報はすべて架空データで、実在の企業・人物・PII を含まない。
- 差分メモの要点: `table-summary-rows` は集計行を `tfoot` に置き、ラベルは `colspan="2"` の行見出し（`th scope="row"`）で右寄せ、狭幅（`47.99rem` 以下）では数量列を DOM から削除せず非表示にして数量の補足を品目名の下へ回す。`table-rich-rows` は副次列のみ `@container` で狭幅時に非表示にし、各テーブルを `table::scroll_area`（`role="region"` + `aria-label` + `tabindex="0"`）で包んで横スクロール可能にする。`table-sortable-bulk` は開閉・選択の JS 配線を持たないため状態を固定して併記する。
- 出典（pin SHA `cf5edb9b8f1bf2a63d51dcf50a8d2806e2d8f9f9`）: 公式 md は `site/blocks/<slug>.md`、Rust ソースは `crates/docs-site/src/blocks/application/table/<slug_snake>.rs`。

## Related

- [Application Blocks overview](./overview.md)
- [List](./list.md)
- [Card Heading](./card-heading.md)
- [Table](../../themes/data-display/table.md)
