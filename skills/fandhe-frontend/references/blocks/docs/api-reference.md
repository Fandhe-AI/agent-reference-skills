# API Reference（Docs Blocks）

API リファレンス表示（プロパティ表・パラメータ一覧・開閉式パラメータ・リクエスト/レスポンスパネル）の Blocks 4 件。Blocks は新規 API ではなく既存の Themes / Primitives / core 部品の合成例であり、各 block の公開物は未公開 crate `docs-site` 内部の `pub fn demo() -> Node` と `pub const BLOCK: Block` だけである。

## Signature / Usage

カテゴリ内で最も短い `api-reference-props-table` の `## Rust コード` の冒頭抜粋。

```rust
use fandhe_frontend_core::{div, text, Node};
use fandhe_frontend_pre_styled_ui::code::{self, CodeProps};
use fandhe_frontend_pre_styled_ui::heading::{heading, HeadingLevel, HeadingProps, HeadingSize};
use fandhe_frontend_pre_styled_ui::table::{self, TableProps, TableVariant};
use fandhe_frontend_pre_styled_ui::text::{self as styled_text, TextProps, TextVariant};
use fandhe_frontend_pre_styled_ui::ColorPalette;

/// プロパティ表 1 行分（架空コンポーネントのプロパティ）。
struct PropRow {
    name: &'static str,
    ty: &'static str,
    default: &'static str,
    description: &'static str,
}

/// 架空コンポーネント（`Toast`）のプロパティ一覧。`<` と `&` を含む型表記
/// （`Option<&str>`）を 1 件含め、既定エスケープ経路を実演する
/// （ファイル内ユニットテストで固定する不変条件）。
const PROPS: [PropRow; 5] = [
    PropRow {
        name: "title",
        ty: "Option<&str>",
        default: "None",
        description: "通知の見出し文言。省略時は本文のみ表示します。",
    },
    PropRow {
        name: "variant",
        ty: "ToastVariant",
        default: "Info",
        description: "見た目の種別（Info / Success / Warning / Danger）。",
    },
    PropRow {
        name: "dismissible",
        ty: "bool",
        default: "true",
        description: "閉じるボタンを表示するかどうか。",
    },
    PropRow {
        name: "duration_ms",
        ty: "u32",
        default: "4000",
        description: "自動で閉じるまでの表示時間（ミリ秒）。",
    },
    PropRow {
        name: "on_dismiss",
        ty: "Option<fn()>",
        default: "None",
        description: "閉じられた際に呼び出すコールバック。",
    },
];

/// プロパティ 1 行分（`table::row`）を組み立てる。
///
/// プロパティ名は `table::row_header`（`<th scope="row">`、モジュール doc
/// 「行見出しに `table::row_header` を使う理由」節）の中に accent palette の
/// `code` を置いて強調する。型・既定値は `table::cell` の中に既定
/// （Neutral）palette の `code`、説明は `styled_text::text`（Muted）。
fn prop_row(row: &PropRow) -> Node {
    table::row(
        vec![],
        vec![
            table::row_header(
                vec![("data-blocks-api-reference-props-table-name", "")],
                vec![code::code(
                    &CodeProps {
                        palette: ColorPalette::Accent,
                        ..CodeProps::default()
                    },
                    vec![],
                    vec![text(row.name)],
                )],
            ),
            table::cell(
                vec![("data-blocks-api-reference-props-table-type", "")],
                vec![code::code(
                    &CodeProps::default(),
                    vec![],
                    vec![text(row.ty)],
                )],
            ),
// ...（以下省略。全文は公式ページ https://fandhe-ai.github.io/fandhe-frontend/blocks/api-reference-props-table/ の「Rust コード」を参照）
```

## Blocks

| slug | 説明 | 使用部品（BLOCK.parts） | 公式 URL |
|------|------|------------------------|----------|
| api-reference-param-accordion | API パラメータ一覧の開閉式表示。枠の上端に列見出し行（名前・型）、その下にパラメータ 1 件ごとの開閉項目 | [Heading](../../themes/typography/heading.md) / [Text](../../themes/typography/text.md) / [Badge](../../themes/data-display/badge.md) / [Code](../../themes/typography/code.md) / [Accordion](../../themes/disclosure/accordion.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/api-reference-param-accordion/ |
| api-reference-param-list | API パラメータ一覧の縦並び表示 | [Heading](../../themes/typography/heading.md) / [Badge](../../themes/data-display/badge.md) / [Text](../../themes/typography/text.md) / [Link](../../themes/typography/link.md) / [Code](../../themes/typography/code.md) / [Separator](../../themes/utilities/separator.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/api-reference-param-list/ |
| api-reference-playground | API のリクエスト/レスポンスパネル。レスポンス・リクエスト・エラー・未送信の 4 版を 1 つの Demo 内に静的に並記 | [Badge](../../themes/data-display/badge.md) / [Code](../../themes/typography/code.md) / [Select](../../themes/collections/select.md) / [Button](../../themes/forms/button.md) / [Text](../../themes/typography/text.md) / [Empty State](../../themes/feedback/empty-state.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/api-reference-playground/ |
| api-reference-props-table | プロパティ名・型・既定値・説明の 4 列を持つ枠付き `<table>`。横スクロール領域で包み狭い幅でも枠内に収まる | [Table](../../themes/data-display/table.md) / [Code](../../themes/typography/code.md) / [Text](../../themes/typography/text.md) / [Heading](../../themes/typography/heading.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/api-reference-props-table/ |

## Notes

- 上記コードは公式 md `## Rust コード` の冒頭抜粋（元は約 174 行）。全文は公式ページを参照する。
- `docs-site` は crates.io 未公開 crate のため `use` できる API ではない。コードをコピーして `fandhe_frontend_pre_styled_ui::*` / `fandhe_frontend_core::*` の呼び出し規約の見本として使う前提。
- 全 block は静的な表示例で、`<form>` を持たず、データ取得・送信を行わない。`api-reference-playground` は docs サイトが JS を使わないため言語選択を閉じたまま固定し、コピー・送信・Try it のボタンは `disabled`（すべて `type="button"`）。API の経路・トークン・値・プロパティ名は架空の UI 部品（`Toast`）のもので、実在の製品名ではない。
- 差分メモ（`api-reference-props-table`）: 参照（対応表 ID R0196、集約元 1 件・4 列構成）からの意図的な差分は、説明を独立した 4 列目にしたこと（既定値の下へ続ける形は不採用）、プロパティ名を行見出し `table::row_header`（`<th scope="row">`）に置いたこと、見出しレベルを `h3`（ページ側が `## Demo` として `h2` を出すため）にしたこと、配色は既存トークンのみで参照元の装飾を持ち込まないこと。プロパティ名は accent の等幅 `code`、型・既定値は Neutral の等幅 `code`、各セルは上揃え。
- 他 3 block の差分メモは公式 md を参照（`api-reference-param-accordion` は主参照 R0197、`api-reference-param-list` は主参照 R0194・集約元 R0195）。
- 出典（pin SHA `cf5edb9b8f1bf2a63d51dcf50a8d2806e2d8f9f9`）: 公式 md `site/blocks/<slug>.md`、Rust ソース `crates/docs-site/src/blocks/docs/api_reference/<slug_snake>.rs`。

## Related

- [Docs Blocks overview](./overview.md)
- [Docs Layout](./docs-layout.md)
- [Code Block](./code-block.md)
- [Example Preview](./example-preview.md)
