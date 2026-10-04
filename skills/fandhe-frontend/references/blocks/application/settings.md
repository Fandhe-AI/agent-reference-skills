# Settings（Application Blocks）

設定画面（API キー・請求・連携アプリ・通知・チーム・共有・Webhook・環境設定・ページ骨格）の合成例 30 件。Blocks は新規 API ではなく既存の Themes / Primitives / core 部品の合成例で、各 block の公開物は未公開 crate `docs-site` 内部の `pub fn demo() -> Node` と `pub const BLOCK: Block` だけである。

## Signature / Usage

カテゴリ内で最も短い `settings-api-key-created`（API キー発行直後のキー提示カード）の `## Rust コード` の冒頭抜粋。

```rust
use fandhe_frontend_core::{div, text, Node};
use fandhe_frontend_pre_styled_ui::button::{button, ButtonProps};
use fandhe_frontend_pre_styled_ui::callout::{self, CalloutProps};
use fandhe_frontend_pre_styled_ui::card::{self, CardProps, CardVariant};
use fandhe_frontend_pre_styled_ui::clipboard;
use fandhe_frontend_pre_styled_ui::field::{
    self, FieldIds, FieldOrientation, FieldProps, FieldRootProps,
};
use fandhe_frontend_pre_styled_ui::input::{self, InputProps};
use fandhe_frontend_pre_styled_ui::input_group::{self, InputGroupAlign, InputGroupProps};
use fandhe_frontend_pre_styled_ui::visually_hidden;

/// 版 A（単一キー、R0241）で提示するダミーキー値。実在サービスの
/// シークレット形式を避けた明白な架空パターン（モジュール doc「ダミー値は
/// 明白な架空パターン」節参照）。
const KEY_A: &str = "fd_demo_0000-1111-2222-3333";

/// 版 B（複数キー、R0242）で提示するダミーキー値 3 件（用途ラベルと対）。
const KEYS_B: &[(&str, &str)] = &[
    ("本番用", "fd_demo_4444-5555-6666-7777"),
    ("ステージング用", "fd_demo_8888-9999-aaaa-bbbb"),
    ("読み取り専用", "fd_demo_cccc-dddd-eeee-ffff"),
];

/// 「発行完了」見出し + 注意 + コピー欄 + 完了ボタンを束ねるカード骨格。
/// `key_area` は版ごとに異なるキー表示領域（A: 単一 clipboard、B: 複数行）。
fn card_with(key_area: Node) -> Node {
    card::root(
        CardProps::from(CardVariant::Outline),
        vec![],
        vec![
            card::header(
                vec![],
                vec![
                    card::title(vec![], vec![text("API キーを発行しました")]),
                    card::description(
                        vec![],
                        vec![text(
                            "この API キーはアプリケーションが外部サービスへ認証するために使います。",
                        )],
                    ),
                ],
            ),
            card::body(
                vec![("class", "blocks-settings-api-key-created-body")],
                vec![
                    callout::root(
                        &CalloutProps::default(),
                        vec![],
                        vec![callout::text(
                            vec![],
                            vec![text(
                                "このキーは今回のみ表示されます。閉じる前に安全な場所へ保管してください。",
                            )],
                        )],
                    ),
                    key_area,
                ],
            ),
            card::footer(
                vec![("class", "blocks-settings-api-key-created-footer")],
                vec![button(&ButtonProps::default(), vec![], vec![text("完了")])],
            ),
        ],
    )
}
// ...（以下省略。全文は公式ページ https://fandhe-ai.github.io/fandhe-frontend/blocks/settings-api-key-created/ の「Rust コード」を参照）
```

## Blocks

| Slug | Description | Parts | Official URL |
|------|-------------|-------|--------------|
| `settings-api-key-created` | API キー発行直後に「一度しか表示しない」注意とともにキー値を提示しコピーできるカード（単一キー版と複数キー行表示版） | [Card](../../themes/data-display/card.md), [Callout](../../themes/feedback/callout.md), [Clipboard](../../themes/data-display/clipboard.md), [Input Group](../../themes/forms/input-group.md), [Field](../../themes/forms/field.md), [Input](../../themes/forms/input.md), [Button](../../themes/forms/button.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/settings-api-key-created/ |
| `settings-api-keys-table` | API キー一覧テーブル（名前・伏せ字の値・権限・作成日・最終使用日・失効操作）+ 作成ダイアログ + 失効確認ダイアログ | [Table](../../themes/data-display/table.md), [Badge](../../themes/data-display/badge.md), [Button](../../themes/forms/button.md), [Dialog](../../themes/overlays/dialog.md), [Field](../../themes/forms/field.md), [Input](../../themes/forms/input.md), [Native Select](../../themes/forms/native-select.md), [Segment Group](../../themes/collections/segment-group.md), [Heading](../../themes/typography/heading.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/settings-api-keys-table/ |
| `settings-billing-overview` | 請求統計 3 件（今月の請求額・利用シート数・次回請求日）、現在プラン・候補プランのカード 2 枚、サブスクリプション一覧テーブル | [Stat](../../themes/data-display/stat.md), [Card](../../themes/data-display/card.md), [Badge](../../themes/data-display/badge.md), [Button](../../themes/forms/button.md), [Table](../../themes/data-display/table.md), [Toggle Tip](../../themes/overlays/toggle-tip.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/settings-billing-overview/ |
| `settings-billing-usage` | 現在プランの定義リスト・使用量の進捗バー・支払方法と請求詳細（プラン・使用量・支払方法の 3 カード + 請求履歴テーブル） | [Data List](../../themes/data-display/data-list.md), [Progress](../../themes/feedback/progress.md), [Badge](../../themes/data-display/badge.md), [Button](../../themes/forms/button.md), [Card](../../themes/data-display/card.md), [Table](../../themes/data-display/table.md), [Toggle Tip](../../themes/overlays/toggle-tip.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/settings-billing-usage/ |
| `settings-event-accordion` | 展開式の Webhook 配信イベントログ。イベント 1 件を accordion 1 項目とし、見出し行に状態バッジを置く | [Accordion](../../themes/disclosure/accordion.md), [Code](../../themes/typography/code.md), [Badge](../../themes/data-display/badge.md), [Heading](../../themes/typography/heading.md), [Text](../../themes/typography/text.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/settings-event-accordion/ |
| `settings-export-data` | エクスポート対象のチェックボックス一覧・ファイル形式の選択欄・実行ボタンの下に、過去のエクスポート履歴テーブルを置くデータエクスポート設定 | [Checkbox](../../themes/forms/checkbox.md), [Native Select](../../themes/forms/native-select.md), [Field](../../themes/forms/field.md), [Button](../../themes/forms/button.md), [Table](../../themes/data-display/table.md), [Badge](../../themes/data-display/badge.md), [Heading](../../themes/typography/heading.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/settings-export-data/ |
| `settings-integration-detail` | 連携アプリの詳細画面（ヘッダー・メタ情報・概要・主な機能・導入手順または利点・関連する連携・作成導線を縦に並べる） | [Badge](../../themes/data-display/badge.md), [Button](../../themes/forms/button.md), [Link](../../themes/typography/link.md), [List](../../themes/typography/list.md), [Separator](../../themes/utilities/separator.md), [Card](../../themes/data-display/card.md), [Heading](../../themes/typography/heading.md), [Image](../../themes/data-display/image.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/settings-integration-detail/ |
| `settings-integrations-grid` | 連携アプリを 2 列のカードグリッドで並べる（ロゴ・アプリ名・説明・接続状態バッジ・接続操作） | [Card](../../themes/data-display/card.md), [Badge](../../themes/data-display/badge.md), [Button](../../themes/forms/button.md), [Switch](../../themes/forms/switch.md), [Link](../../themes/typography/link.md), [Image](../../themes/data-display/image.md), [Heading](../../themes/typography/heading.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/settings-integrations-grid/ |
| `settings-integrations-list` | 連携アプリを枠付きの行リストで並べる（ロゴ・名前・接続状態バッジ・説明・詳細リンク・接続/解除操作）。`image` は使用部品一覧に無いロゴ表示のため追加 | [Badge](../../themes/data-display/badge.md), [Button](../../themes/forms/button.md), [Separator](../../themes/utilities/separator.md), [Link](../../themes/typography/link.md), [Image](../../themes/data-display/image.md), [Switch](../../themes/forms/switch.md), [Clipboard](../../themes/data-display/clipboard.md), [Field](../../themes/forms/field.md), [Input Group](../../themes/forms/input-group.md), [Input](../../themes/forms/input.md), [Empty State](../../themes/feedback/empty-state.md), [Heading](../../themes/typography/heading.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/settings-integrations-list/ |
| `settings-integrations-search` | 上部に検索欄とカテゴリ絞り込みボタン群、下部に連携アプリの一覧を置く検索付き連携アプリ一覧 | [Field](../../themes/forms/field.md), [Input Group](../../themes/forms/input-group.md), [Input](../../themes/forms/input.md), [Button](../../themes/forms/button.md), [Card](../../themes/data-display/card.md), [Link](../../themes/typography/link.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/settings-integrations-search/ |
| `settings-item-cards` | 設定対象（認証方式・ロール・ログイン中のセッション）を 1 件 1 カードで縦に並べるカード列挙型の設定一覧 | [Card](../../themes/data-display/card.md), [Badge](../../themes/data-display/badge.md), [Icon](../../themes/data-display/icon.md), [Button](../../themes/forms/button.md), [Heading](../../themes/typography/heading.md), [Text](../../themes/typography/text.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/settings-item-cards/ |
| `settings-log-table` | 絞り込み UI・ログテーブル・ページ送りを縦に積んだ設定ログ（タブによる結果絞り込み、選択欄 3 種 + ページ送り） | [Native Select](../../themes/forms/native-select.md), [Tabs](../../themes/disclosure/tabs.md), [Table](../../themes/data-display/table.md), [Badge](../../themes/data-display/badge.md), [Avatar](../../themes/data-display/avatar.md), [Button](../../themes/forms/button.md), [Pagination](../../themes/collections/pagination.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/settings-log-table/ |
| `settings-notification-matrix` | 通知の種類（行）× 配信経路（列）の交点を checkbox で表す設定表 | [Checkbox](../../themes/forms/checkbox.md), [Table](../../themes/data-display/table.md), [Field](../../themes/forms/field.md), [Button](../../themes/forms/button.md), [Heading](../../themes/typography/heading.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/settings-notification-matrix/ |
| `settings-org-switcher` | 組織名・アバター・メンバー数を持つトリガーからメニューを開き、組織一覧と「作成」「設定」操作を提示する組織切替（組織 / プロジェクトを `/` 区切りで並べた版を含む） | [Menu](../../themes/collections/menu.md), [Avatar](../../themes/data-display/avatar.md), [Badge](../../themes/data-display/badge.md), [Button](../../themes/forms/button.md), [Icon](../../themes/data-display/icon.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/settings-org-switcher/ |
| `settings-page-aside-nav` | 上段にアプリのナビバー、その下にページ見出し（アバター + 氏名/メール + プランバッジ）、下段を「左ナビ + 本文」の 2 カラムへ分割する設定ページの骨格と主要領域 | [Navigation Menu](../../themes/navigation/navigation-menu.md), [Nav List](../../themes/navigation/nav-list.md), [Avatar](../../themes/data-display/avatar.md), [Heading](../../themes/typography/heading.md), [Text](../../themes/typography/text.md), [Badge](../../themes/data-display/badge.md), [Card](../../themes/data-display/card.md), [Field](../../themes/forms/field.md), [Input](../../themes/forms/input.md), [Input Group](../../themes/forms/input-group.md), [Native Select](../../themes/forms/native-select.md), [Toggle Group](../../themes/forms/toggle-group.md), [Table](../../themes/data-display/table.md), [Button](../../themes/forms/button.md), [Checkbox](../../themes/forms/checkbox.md), [Separator](../../themes/utilities/separator.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/settings-page-aside-nav/ |
| `settings-page-sidebar` | アイコン幅へ折りたたみ可能な左サイドバー、右上のパンくず付きヘッダー、本文のタブ列 + 設定カード（スイッチ行）、サイドバー footer のユーザー行を持つ設定ページ | [Sidebar](../../themes/navigation/sidebar.md), [Breadcrumb](../../themes/navigation/breadcrumb.md), [Separator](../../themes/utilities/separator.md), [Card](../../themes/data-display/card.md), [Switch](../../themes/forms/switch.md), [Button](../../themes/forms/button.md), [Icon](../../themes/data-display/icon.md), [Menu](../../themes/collections/menu.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/settings-page-sidebar/ |
| `settings-page-tabs` | 上部にアプリ用ナビバー、その下にタブ状のセクション切替を持つページ見出し、本文に設定カードを並べる（版 A: API 設定、版 B: プランの 2 版） | [Navigation Menu](../../themes/navigation/navigation-menu.md), [Tab Nav](../../themes/navigation/tab-nav.md), [Card](../../themes/data-display/card.md), [Table](../../themes/data-display/table.md), [Badge](../../themes/data-display/badge.md), [Menu](../../themes/collections/menu.md), [Input Group](../../themes/forms/input-group.md), [Input](../../themes/forms/input.md), [Button](../../themes/forms/button.md), [Progress](../../themes/feedback/progress.md), [Checkbox](../../themes/forms/checkbox.md), [Pagination](../../themes/collections/pagination.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/settings-page-tabs/ |
| `settings-preferences` | 表示テーマ・文字サイズ・配置をラジオカード群で、言語・地域・タイムゾーン・日付形式・通貨をネイティブセレクトで選ばせる環境設定 | [Radio Card](../../themes/forms/radio-card.md), [Native Select](../../themes/forms/native-select.md), [Switch](../../themes/forms/switch.md), [Field](../../themes/forms/field.md), [Button](../../themes/forms/button.md), [Heading](../../themes/typography/heading.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/settings-preferences/ |
| `settings-profile-form` | プロフィール設定フォームの 3 variant（ラベル横並び版ほか）を並記 | [Field](../../themes/forms/field.md), [Fieldset](../../themes/forms/fieldset.md), [Input](../../themes/forms/input.md), [Input Group](../../themes/forms/input-group.md), [Textarea](../../themes/forms/textarea.md), [Avatar](../../themes/data-display/avatar.md), [File Upload](../../themes/forms/file-upload.md), [Radio Card](../../themes/forms/radio-card.md), [Switch](../../themes/forms/switch.md), [Button](../../themes/forms/button.md), [Separator](../../themes/utilities/separator.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/settings-profile-form/ |
| `settings-share-link` | 共有の有効化スイッチ・共有 URL のコピー欄・リンクコピー / プレビューのボタン群を持つ共有リンク設定カード（閲覧範囲の radio card・QR コード等を含む） | [Card](../../themes/data-display/card.md), [Switch](../../themes/forms/switch.md), [Clipboard](../../themes/data-display/clipboard.md), [Button](../../themes/forms/button.md), [Button Group](../../themes/forms/button-group.md), [Radio Card](../../themes/forms/radio-card.md), [QR Code](../../themes/data-display/qr-code.md), [Select](../../themes/collections/select.md), [Separator](../../themes/utilities/separator.md), [Input](../../themes/forms/input.md), [Input Group](../../themes/forms/input-group.md), [Text](../../themes/typography/text.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/settings-share-link/ |
| `settings-share-members` | 共有範囲の選択・メール招待・アクセス権選択付きメンバー一覧・共有リンクのコピー操作を 1 枚のカードにまとめた共有設定（版 A「招待したメンバーのみ」ほか） | [Card](../../themes/data-display/card.md), [Select](../../themes/collections/select.md), [Input Group](../../themes/forms/input-group.md), [Input](../../themes/forms/input.md), [Text](../../themes/typography/text.md), [Avatar](../../themes/data-display/avatar.md), [Clipboard](../../themes/data-display/clipboard.md), [Separator](../../themes/utilities/separator.md), [Field](../../themes/forms/field.md), [Heading](../../themes/typography/heading.md), [QR Code](../../themes/data-display/qr-code.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/settings-share-members/ |
| `settings-switch-sections` | 見出し付きセクション内に、ラベル・説明・右端スイッチの行を区切り線で並べ、末尾に保存ボタンを置く定番レイアウト（2 セクション構成・条件選択の派生を含む） | [Switch](../../themes/forms/switch.md), [Field](../../themes/forms/field.md), [Fieldset](../../themes/forms/fieldset.md), [Radio Group](../../themes/forms/radio-group.md), [Card](../../themes/data-display/card.md), [Button](../../themes/forms/button.md), [Separator](../../themes/utilities/separator.md), [Heading](../../themes/typography/heading.md), [Kbd](../../themes/typography/kbd.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/settings-switch-sections/ |
| `settings-team-invite` | 上段のメンバー招待フォーム（メールアドレス・ロール選択・招待ボタン）と、下段の既存メンバー一覧（アバター・名前・メール・ロール・操作） | [Field](../../themes/forms/field.md), [Input](../../themes/forms/input.md), [Native Select](../../themes/forms/native-select.md), [Button](../../themes/forms/button.md), [Separator](../../themes/utilities/separator.md), [Avatar](../../themes/data-display/avatar.md), [Badge](../../themes/data-display/badge.md), [Menu](../../themes/collections/menu.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/settings-team-invite/ |
| `settings-team-table` | 検索欄・並び替え・招待ボタンのツールバーと、アバター付き氏名・メール・ロールバッジ・追加日・行末の操作メニューを持つメンバー一覧テーブル（版 A「検索欄あり」/ 版 B「検索欄なし基本版」） | [Table](../../themes/data-display/table.md), [Avatar](../../themes/data-display/avatar.md), [Badge](../../themes/data-display/badge.md), [Input Group](../../themes/forms/input-group.md), [Input](../../themes/forms/input.md), [Button](../../themes/forms/button.md), [Menu](../../themes/collections/menu.md), [Heading](../../themes/typography/heading.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/settings-team-table/ |
| `settings-webhook-detail` | Webhook 1 件の詳細画面（戻る導線・宛先 URL の見出し・概要の定義リスト・署名シークレット表示・有効スイッチ・直近の配信テーブル） | [Link](../../themes/typography/link.md), [Heading](../../themes/typography/heading.md), [Button](../../themes/forms/button.md), [Menu](../../themes/collections/menu.md), [Card](../../themes/data-display/card.md), [Data List](../../themes/data-display/data-list.md), [Clipboard](../../themes/data-display/clipboard.md), [Switch](../../themes/forms/switch.md), [Code](../../themes/typography/code.md), [Table](../../themes/data-display/table.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/settings-webhook-detail/ |
| `settings-webhook-form` | Webhook の作成・編集フォームの 3 variant（代表構成・ペイロード形式ラジオ + 開閉式詳細設定・セクションごとにカードへ分けた編集版）を並記 | [Field](../../themes/forms/field.md), [Input](../../themes/forms/input.md), [Input Group](../../themes/forms/input-group.md), [Textarea](../../themes/forms/textarea.md), [Radio Group](../../themes/forms/radio-group.md), [Collapsible](../../themes/disclosure/collapsible.md), [Switch](../../themes/forms/switch.md), [Card](../../themes/data-display/card.md), [Badge](../../themes/data-display/badge.md), [Button](../../themes/forms/button.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/settings-webhook-form/ |
| `settings-webhook-stats` | 統計付きの Webhook 詳細画面（配信数・成功率・平均応答時間・失敗件数の統計カード、配信の推移バー、署名シークレットの伏せ字静的表示、直近の配信一覧テーブル、イベントタイムライン） | [Stat](../../themes/data-display/stat.md), [Card](../../themes/data-display/card.md), [Table](../../themes/data-display/table.md), [Timeline](../../themes/data-display/timeline.md), [Progress](../../themes/feedback/progress.md), [Button](../../themes/forms/button.md), [Clipboard](../../themes/data-display/clipboard.md), [Badge](../../themes/data-display/badge.md), [Visually Hidden](../../themes/utilities/visually-hidden.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/settings-webhook-stats/ |
| `settings-webhook-tester` | Webhook のテスト送信画面（宛先エンドポイントとイベント種類の選択、ペイロードのコード表示、送信結果の成功・失敗 2 状態） | [Native Select](../../themes/forms/native-select.md), [Field](../../themes/forms/field.md), [Code](../../themes/typography/code.md), [Button](../../themes/forms/button.md), [Badge](../../themes/data-display/badge.md), [Heading](../../themes/typography/heading.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/settings-webhook-tester/ |
| `settings-webhook-wizard` | Webhook を「宛先 → イベント → 確認」の 3 段ステップで作るステップ式フロー | [Steps](../../themes/collections/steps.md), [Field](../../themes/forms/field.md), [Input](../../themes/forms/input.md), [Checkbox](../../themes/forms/checkbox.md), [Button](../../themes/forms/button.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/settings-webhook-wizard/ |
| `settings-webhooks-list` | Webhook エンドポイントの一覧画面。同じ一覧データをテーブル / カード / 区切り線のみの簡素版の 3 版で併記 | [Table](../../themes/data-display/table.md), [Card](../../themes/data-display/card.md), [Badge](../../themes/data-display/badge.md), [Switch](../../themes/forms/switch.md), [Menu](../../themes/collections/menu.md), [Button](../../themes/forms/button.md), [Clipboard](../../themes/data-display/clipboard.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/settings-webhooks-list/ |

## Notes

- 上記コードは公式 md `## Rust コード` の冒頭抜粋（元は約 184 行）。全文は公式ページを参照する。
- Blocks は Themes / Primitives / core 部品の合成例で、公開 crate の API を使う側のコード例。`docs-site` crate は crates.io 未公開のため `use` できず、コードをコピーして利用する前提。
- 各 block の `BLOCK.parts` の label と公式 md 冒頭の使用部品は一致する（`BLOCK` の構造は [overview.md](./overview.md) を参照）。
- 静的表示（docs サイトは JS ハイドレーションを行わない）。送信・取得は行わず、ダイアログ・メニュー・アコーディオンの開閉などは固定状態の併記。キー値は `fd_demo_` 接頭辞の架空データ、組織名・氏名・金額・URL も架空で、実在の企業・人物・PII・クレデンシャルを含まない。
- 差分メモの要点（`settings-api-key-created`）: 版 B（複数キー行）は各行のコピーボタンを `clipboard` scope の外側の `input_group::button` にして `disabled` とする。`headless_clipboard` 配線は 1 root : 1 状態機械の契約で、Demo 内に `clipboard` root を複数置くと 1 つのコピーで他のキーまで「コピーしました」表示になるため、`clipboard` root は版 A の 1 個に限る。行ごとにコピーさせる実アプリでは `clipboard` を行ごとに別のマウントルートへ置き個別に `mount` / `hydrate` する。他の block も主参照 + 集約元の複数版を併記する構成で、配色・文言・アイコンは持ち込まない。
- 出典（pin SHA `cf5edb9b8f1bf2a63d51dcf50a8d2806e2d8f9f9`）: 公式 md は `site/blocks/<slug>.md`、Rust ソースは `crates/docs-site/src/blocks/application/settings/<slug_snake>.rs`。

## Related

- [Application Blocks overview](./overview.md)
- [Form Layout](./form-layout.md)
- [Sidebar](./sidebar.md)
- [Table](./table.md)
- [Auth](./auth.md)
