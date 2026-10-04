# Form Layout（Application Blocks）

フォームのレイアウト（ラベル横並び・縦積み・見出し列 + 入力列の 2 カラム・デザインツール風プロパティパネル）の合成例 4 件。Blocks は新規 API ではなく既存の Themes / Primitives / core 部品の合成例で、各 block の公開物は未公開 crate `docs-site` 内部の `pub fn demo() -> Node` と `pub const BLOCK: Block` だけである。

## Signature / Usage

カテゴリ内で最も短い `form-layout-inline-labels`（ラベルを入力欄の左に並べる編集フォーム）の `## Rust コード` の冒頭抜粋。

```rust
use crate::blocks::dummy_assets::{COMPANY_NAMES, PERSON_NAMES};
use fandhe_frontend_core::{el, text, Node};
use fandhe_frontend_pre_styled_ui::button::{self, ButtonProps, ButtonVariant};
use fandhe_frontend_pre_styled_ui::data_list::{self, DataListOrientation, DataListProps};
use fandhe_frontend_pre_styled_ui::field::{self, FieldOrientation, FieldRootProps};
use fandhe_frontend_pre_styled_ui::heading::{
    heading, HeadingLevel, HeadingProps, HeadingSize, HeadingWeight,
};
use fandhe_frontend_pre_styled_ui::input::{self, FieldIds, FieldProps, InputProps};
use fandhe_frontend_pre_styled_ui::native_select::{self, NativeSelectProps};
use fandhe_frontend_pre_styled_ui::separator::{self, SeparatorProps};
use fandhe_frontend_pre_styled_ui::textarea::{self, TextareaProps};

/// 一意な id を組み立てる（`blocks-form-layout-inline-labels-` 接頭辞を
/// 共通化し、フィールド追加時の綴り間違いを防ぐ）。
fn field_id(suffix: &str) -> String {
    format!("blocks-form-layout-inline-labels-{suffix}")
}

/// 縦積み（label 上・control 下）の共通 orientation（コンテナクエリで
/// 広い幅のときのみ横並びへ切り替わる、モジュール doc「レイアウト方式」
/// 参照）。
fn orientation() -> FieldRootProps {
    FieldRootProps {
        orientation: FieldOrientation::Vertical,
    }
}

/// variant A の 1 行を組み立てる（`field::root` + `field::label` +
/// 呼び出し側が渡すコントロール）。
fn row(id: &str, label_text: &'static str, control: Node) -> Node {
    let props = FieldProps {
        id,
        ids: FieldIds::default(),
        disabled: false,
        invalid: false,
        required: false,
        readonly: false,
        has_helper_text: false,
    };
    field::root(
        &orientation(),
        &props,
        vec![("data-blocks-form-layout-inline-labels-row", "")],
        vec![
            field::label(&props, vec![], vec![text(label_text)]),
            control,
        ],
    )
}

/// variant A: 自己紹介欄のみ `helper_text` を伴う行（`has_helper_text:
/// true` を反映した独立 `FieldProps` を要するため専用ヘルパにする）。
fn bio_row(id: &str) -> Node {
    let props = FieldProps {
        id,
        ids: FieldIds::default(),
        disabled: false,
        invalid: false,
        required: false,
        readonly: false,
        has_helper_text: true,
    };
    field::root(
        &orientation(),
        &props,
        vec![("data-blocks-form-layout-inline-labels-row", "")],
        vec![
            field::label(&props, vec![], vec![text("自己紹介")]),
            textarea::textarea(
                &TextareaProps::default(),
                &props,
                false,
                vec![(
                    "placeholder",
                    "これまでの経歴や興味のある分野をご記入ください。",
                )],
                vec![],
            ),
            field::helper_text(&props, vec![], vec![text("プロフィールに公開されます。")]),
        ],
    )
}
// ...（以下省略。全文は公式ページ https://fandhe-ai.github.io/fandhe-frontend/blocks/form-layout-inline-labels/ の「Rust コード」を参照）
```

## Blocks

| Slug | Description | Parts | Official URL |
|------|-------------|-------|--------------|
| `form-layout-inline-labels` | ラベルを入力欄の左に並べる編集フォーム。見出しとキャンセル/保存ボタンの下に氏名・メール・所属・自己紹介の 4 行を並べる版と、説明リストの値を入力欄に置き換えた編集画面の 2 variant（コンテナ幅 `36rem` 以上でラベル列と入力列が横並び、狭い幅は上下積み） | [Heading](../../themes/typography/heading.md), [Field](../../themes/forms/field.md), [Input](../../themes/forms/input.md), [Textarea](../../themes/forms/textarea.md), [Native Select](../../themes/forms/native-select.md), [Data List](../../themes/data-display/data-list.md), [Separator](../../themes/utilities/separator.md), [Button](../../themes/forms/button.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/form-layout-inline-labels/ |
| `form-layout-property-panel` | デザインツール風プロパティパネル。4 版を並記: A 基本（「位置」「レイアウト」「文字」の 3 節を区切り線で縦積み）、B テーマ選択 + 開閉式の節（`collapsible` の開閉 2 状態）、C カード枠 + パンくずのヘッダー + CSS コピーの `clipboard` フッター、D 極小サイズ（`Size::Xs`）の狭幅パネル（位置節の X/Y/幅/高さと単位選択のみ） | [Fieldset](../../themes/forms/fieldset.md), [Field](../../themes/forms/field.md), [Number Input](../../themes/forms/number-input.md), [Native Select](../../themes/forms/native-select.md), [Select](../../themes/collections/select.md), [Color Picker](../../themes/forms/color-picker.md), [Color Swatch](../../themes/data-display/color-swatch.md), [Segment Group](../../themes/collections/segment-group.md), [Collapsible](../../themes/disclosure/collapsible.md), [Tooltip](../../themes/overlays/tooltip.md), [Card](../../themes/data-display/card.md), [Breadcrumb](../../themes/navigation/breadcrumb.md), [Clipboard](../../themes/data-display/clipboard.md), [Separator](../../themes/utilities/separator.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/form-layout-property-panel/ |
| `form-layout-stacked` | 縦積みの設定フォームレイアウト。プロフィール（ユーザー名・自己紹介・写真とカバー画像のアップロード）・個人情報（姓名・メール・国と地域・住所）・通知（メールのチェックボックス群とプッシュのラジオ群）の 3 セクションを縦に積み、各入力欄はラベル上・コントロール下 | [Heading](../../themes/typography/heading.md), [Field](../../themes/forms/field.md), [Fieldset](../../themes/forms/fieldset.md), [Input](../../themes/forms/input.md), [Textarea](../../themes/forms/textarea.md), [Native Select](../../themes/forms/native-select.md), [Checkbox](../../themes/forms/checkbox.md), [Radio Group](../../themes/forms/radio-group.md), [File Upload](../../themes/forms/file-upload.md), [Avatar](../../themes/data-display/avatar.md), [Button](../../themes/forms/button.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/form-layout-stacked/ |
| `form-layout-two-column` | 各セクションを左列（見出しと説明文）・右列（入力欄）に分けた 2 カラムフォーム（コンテナクエリ `min-width: 48rem` で 2 カラム grid へ切り替え）。variant A はパネル末尾でキャンセル・保存を共有する 3 セクション、variant B は右列をカードに入れセクションごとに保存ボタンを持つ 2 セクション | [Heading](../../themes/typography/heading.md), [Text](../../themes/typography/text.md), [Field](../../themes/forms/field.md), [Fieldset](../../themes/forms/fieldset.md), [Input](../../themes/forms/input.md), [Textarea](../../themes/forms/textarea.md), [Native Select](../../themes/forms/native-select.md), [Checkbox](../../themes/forms/checkbox.md), [Radio Group](../../themes/forms/radio-group.md), [Card](../../themes/data-display/card.md), [Button](../../themes/forms/button.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/form-layout-two-column/ |

## Notes

- 上記コードは公式 md `## Rust コード` の冒頭抜粋（元は約 361 行）。全文は公式ページを参照する。
- Blocks は Themes / Primitives / core 部品の合成例で、公開 crate の API を使う側のコード例。`docs-site` crate は crates.io 未公開のため `use` できず、コードをコピーして利用する前提。`crate::blocks::dummy_assets` は docs-site 内部のダミー素材で、コピー時に置き換える。
- 各 block の `BLOCK.parts` の label と公式 md 冒頭の使用部品は一致する（`BLOCK` の構造は [overview.md](./overview.md) を参照）。
- 静的表示で、`<form>` 要素は一切持たず、データの取得・送信・バリデーションを行わない（ボタンはすべて `type="button"`）。実際の送信処理は利用側の Rust / JS コードで実装する。文言・氏名・会社名は架空。
- 差分メモの要点: `form-layout-stacked` のチェックボックス・ラジオは初期状態を固定した静的表示で、操作を許すと見た目の状態と実際の値が食い違うため `disabled: true` を指定する。ファイル選択欄の `<input type="file">` はすべて `hidden` で、ネイティブのファイル選択 UI は表示されない。`form-layout-inline-labels` は説明リスト版（集約元）の統合で、variant B は保存ボタンを持たない。`form-layout-property-panel` は集約元 4 件で、`number_input` の増減ボタンと入力本体は静的固定のため `readonly`（`aria-valuenow` が初期値のまま更新されず表示値とずれるのを防ぐ）、`segment_group` / `collapsible` の trigger は開閉・切替が JS ハイドレーション前提のためネイティブ `disabled` で操作不能にする。
- 出典（pin SHA `cf5edb9b8f1bf2a63d51dcf50a8d2806e2d8f9f9`）: 公式 md は `site/blocks/<slug>.md`、Rust ソースは `crates/docs-site/src/blocks/application/form_layout/<slug_snake>.rs`。

## Related

- [Application Blocks overview](./overview.md)
- [Settings](./settings.md)
- [Auth](./auth.md)
- [Field](../../themes/forms/field.md)
