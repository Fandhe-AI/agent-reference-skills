# App Shell（Application Blocks）

ナビバー・サイドバー・見出し帯・メイン領域を組み合わせたアプリケーション全体の外枠（シェル）の合成例 6 件。Blocks は新規 API ではなく既存の Themes / Primitives / core 部品の合成例で、各 block の公開物は未公開 crate `docs-site` 内部の `pub fn demo() -> Node` と `pub const BLOCK: Block` だけである。

## Signature / Usage

カテゴリ内で最も短い `app-shell-navbar-columns`（固定ナビバー + 2〜3 列の本体）の `## Rust コード` の冒頭抜粋。

```rust
use fandhe_frontend_core::{aside, div, el, footer, header, li, p, section, span, text, ul, Node};
use fandhe_frontend_pre_styled_ui::avatar::{self, AvatarProps, ImageStatus};
use fandhe_frontend_pre_styled_ui::button::{self, ButtonProps};
use fandhe_frontend_pre_styled_ui::icon::{icon, IconProps};
use fandhe_frontend_pre_styled_ui::navigation_menu::{self, NavigationMenuProps, OpenState};
use fandhe_frontend_pre_styled_ui::separator::{self, SeparatorProps};
use fandhe_frontend_pre_styled_ui::visually_hidden;
use fandhe_frontend_pre_styled_ui::{Orientation, Size};

/// 実在の自リポジトリ URL（`href` の方針、モジュール doc 参照）。
const REPO: &str = "https://github.com/Fandhe-AI/fandhe-frontend";
/// 実在の自組織 URL。
const ORG: &str = "https://github.com/Fandhe-AI";

/// メインナビの項目一覧（value, label, href）。両 variant で共有する
/// （`header_simple_bar::NAV_ITEMS` と同型、別々の `navigation-menu` root
/// インスタンスへ渡すため value の重複は実害を持たない）。
const NAV_ITEMS: &[(&str, &str, &str)] = &[
    ("dashboard", "ダッシュボード", REPO),
    ("projects", "プロジェクト", REPO),
    ("reports", "レポート", REPO),
    ("settings", "設定", ORG),
];

/// 左カラムのダミー補助ナビ項目（架空、静的表示のみ）。
const SIDE_NAV_ITEMS: &[&str] = &["概要", "アクティビティ", "メンバー", "アーカイブ"];

/// メイン本文のダミー行（架空、スクロールを見せるための分量確保）。
const CONTENT_ROWS: &[&str] = &[
    "四半期の売上サマリを更新しました。",
    "新規メンバーが 2 名参加しました。",
    "レポート #128 がレビュー待ちです。",
    "バックアップジョブが正常に完了しました。",
    "ストレージ使用量が 68% に達しました。",
    "週次ダイジェストを送信しました。",
];

/// 装飾用の幾何図形アイコン（`label: None`、実在ブランドのロゴを模さない
/// 自作 SVG）。
fn geo_icon(size: Size, d: &str) -> Node {
    icon(
        &IconProps {
            size,
            label: None,
            ..IconProps::default()
        },
        vec![],
        vec![el("path", vec![("d", d)], vec![])],
    )
}

/// ベル（通知）の幾何図形アイコン。
fn bell_icon() -> Node {
    geo_icon(
        Size::Sm,
        "M12 3a5 5 0 0 0-5 5v3l-2 4h14l-2-4V8a5 5 0 0 0-5-5zM10 18a2 2 0 0 0 4 0h-4z",
    )
}

/// ロゴ（幾何図形アイコン + ブランド名テキスト、リンクにしない。
/// モジュール doc「使用部品」節参照）。
fn logo() -> Node {
    div(
        vec![("data-blocks-app-shell-navbar-columns-logo", "")],
        vec![
            geo_icon(Size::Md, "M4 4h16v6H4zM4 14h16v6H4z"),
            span(vec![], vec![text("Fandhe Frontend")]),
        ],
    )
}
// ...（以下省略。全文は公式ページ https://fandhe-ai.github.io/fandhe-frontend/blocks/app-shell-navbar-columns/ の「Rust コード」を参照）
```

## Blocks

| Slug | Description | Parts | Official URL |
|------|-------------|-------|--------------|
| `app-shell-navbar-columns` | 上部に固定のナビバー（ロゴ・主要リンク・通知・プロフィール）と、その下に最大幅で中央寄せした 2〜3 列の本体。左右の補助カラムはナビバー下端に sticky、メインカラムだけが独立してスクロールする（3 列 / 2 列 + フッターの 2 variant） | [Navigation Menu](../../themes/navigation/navigation-menu.md), [Avatar](../../themes/data-display/avatar.md), [Button](../../themes/forms/button.md), [Icon](../../themes/data-display/icon.md), [Separator](../../themes/utilities/separator.md), [Visually Hidden](../../themes/utilities/visually-hidden.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/app-shell-navbar-columns/ |
| `app-shell-sidebar-header` | 左の固定サイドバーと、右上に常時表示するヘッダーバー（検索欄・通知ボタン・プロフィールメニュー）を組み合わせたシェル。標準 / メイン幅を制限 ほか 3 つの状態を静的に併記 | [Sidebar](../../themes/navigation/sidebar.md), [Input Group](../../themes/forms/input-group.md), [Input](../../themes/forms/input.md), [Button](../../themes/forms/button.md), [Menu](../../themes/collections/menu.md), [Avatar](../../themes/data-display/avatar.md), [Icon](../../themes/data-display/icon.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/app-shell-sidebar-header/ |
| `app-shell-sidebar` | 常設サイドバー型アプリシェル（collapsible なしの幅広サイドバー: ロゴ・アイコン付きナビ・チーム一覧・下端のプロフィール）。狭幅ではハンバーガー + 常時展開のモバイルナビパネル | [Sidebar](../../themes/navigation/sidebar.md), [Avatar](../../themes/data-display/avatar.md), [Collapsible](../../themes/disclosure/collapsible.md), [Icon](../../themes/data-display/icon.md), [Heading](../../themes/typography/heading.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/app-shell-sidebar/ |
| `app-shell-stacked-overlap` | 濃色のヒーロー帯（ナビバー + ページ見出し）の下端へ本文カードが重なるシェル。狭幅ではナビをメニューボタンで開く常時展開パネルへ畳む（帯の配色違い・ナビが 2 段で 2 行目に検索欄と主要リンクが入る版を集約） | [Navigation Menu](../../themes/navigation/navigation-menu.md), [Input Group](../../themes/forms/input-group.md), [Input](../../themes/forms/input.md), [Avatar](../../themes/data-display/avatar.md), [Menu](../../themes/collections/menu.md), [Button](../../themes/forms/button.md), [Card](../../themes/data-display/card.md), [Heading](../../themes/typography/heading.md), [Collapsible](../../themes/disclosure/collapsible.md), [Icon](../../themes/data-display/icon.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/app-shell-stacked-overlap/ |
| `app-shell-stacked` | 縦 3 段（水平ナビバー・見出し帯・メイン領域）のシェル。見出し帯はナビバーと一体化した版 / 独立した白帯の版（パンくず付き・タブ風ナビ付き）の 4 variant | [Navigation Menu](../../themes/navigation/navigation-menu.md), [Breadcrumb](../../themes/navigation/breadcrumb.md), [Avatar](../../themes/data-display/avatar.md), [Menu](../../themes/collections/menu.md), [Button](../../themes/forms/button.md), [Heading](../../themes/typography/heading.md), [Separator](../../themes/utilities/separator.md), [Card](../../themes/data-display/card.md), [Icon](../../themes/data-display/icon.md), [Collapsible](../../themes/disclosure/collapsible.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/app-shell-stacked/ |
| `app-shell-three-column` | 左の固定サイドバー・メイン・補助カラム（一覧/詳細用）の 3 列シェル。幅広（サイドバー展開 + 補助カラム）ほか 3 つの状態を静的に併記 | [Sidebar](../../themes/navigation/sidebar.md), [Avatar](../../themes/data-display/avatar.md), [Button](../../themes/forms/button.md), [Icon](../../themes/data-display/icon.md), [Input Group](../../themes/forms/input-group.md), [Input](../../themes/forms/input.md), [Menu](../../themes/collections/menu.md), [Visually Hidden](../../themes/utilities/visually-hidden.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/app-shell-three-column/ |

## Notes

- 上記コードは公式 md `## Rust コード` の冒頭抜粋（元は約 330 行）。全文は公式ページを参照する。
- Blocks は Themes / Primitives / core 部品の合成例で、公開 crate の API を使う側のコード例。`docs-site` crate は crates.io 未公開のため `use` できず、コードをコピーして利用する前提。
- 各 block の `BLOCK.parts` の label と公式 md 冒頭の使用部品は一致する（`BLOCK` の構造は [overview.md](./overview.md) を参照）。
- 無 JS の静的表示で `<form>` は出力しない。docs サイトは JS ハイドレーションを行わないため、サイドバーの開閉やメニューの開閉は固定状態を並記し、通知・プロフィールなどのボタンは `disabled` で固定する（開閉には `fandhe-frontend-wasm-full` の JS 配線が必要）。ブランド名・ユーザー名・本文は架空のサンプル。
- 差分メモの要点（`app-shell-navbar-columns`）: 集約元 3 件を 2 variant（左右カラム sticky の 3 列 / 2 列 + フッター）へ集約。集約元の配色・文言・アイコン・ハンバーガーメニュー・ドロップダウン開閉は持ち込まず、ナビバーは常に主要リンクが並んだ状態で、狭幅でも折り返しのみでリンクへ到達できる。sticky・列切り替えの判定はビューポート幅ではなく Demo 枠自体の幅（コンテナクエリ）基準で、sticky の確認には Demo 枠幅を `48rem` 以上にする必要がある。DOM 順はメイン → 左 → 右。
- 出典（pin SHA `cf5edb9b8f1bf2a63d51dcf50a8d2806e2d8f9f9`）: 公式 md は `site/blocks/<slug>.md`、Rust ソースは `crates/docs-site/src/blocks/application/app_shell/<slug_snake>.rs`。

## Related

- [Application Blocks overview](./overview.md)
- [Sidebar](./sidebar.md)
- [Navbar](./navbar.md)
- [Page Heading](./page-heading.md)
