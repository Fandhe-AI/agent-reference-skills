# Dashboard（Application Blocks）

Dashboard は、サイドバー・統計カード・面グラフ・タブ付きテーブルを組み合わせた管理画面ダッシュボードの合成例 1 件。blocks は新規 API ではなく既存の Themes / Primitives / core 部品の合成例で、各 block の公開物は未公開 crate docs-site 内部の `pub fn demo() -> Node` と `pub const BLOCK: Block` だけである。

## Signature / Usage

`dashboard-01`（カテゴリ唯一の block）の `## Rust コード` の冒頭抜粋。

```rust
use fandhe_frontend_core::{div, span, text, Node};
use fandhe_frontend_pre_styled_ui::area_chart::{self, AreaChartProps, AreaCurve, AreaFill};
use fandhe_frontend_pre_styled_ui::avatar::{self, AvatarProps, ImageStatus};
use fandhe_frontend_pre_styled_ui::badge::{self, BadgeProps, BadgeVariant};
use fandhe_frontend_pre_styled_ui::button::{self, ButtonProps, ButtonVariant};
use fandhe_frontend_pre_styled_ui::card::{self, CardProps};
use fandhe_frontend_pre_styled_ui::charts::data::{ChartData, Series};
use fandhe_frontend_pre_styled_ui::checkbox::{self, CheckboxProps, CheckedState};
use fandhe_frontend_pre_styled_ui::link;
use fandhe_frontend_pre_styled_ui::link::LinkProps;
use fandhe_frontend_pre_styled_ui::menu::{self, OpenState};
use fandhe_frontend_pre_styled_ui::separator::{self, SeparatorProps, SeparatorVariant};
use fandhe_frontend_pre_styled_ui::sidebar;
use fandhe_frontend_pre_styled_ui::sidebar::{
    Sidebar, SidebarMenuButtonProps, SidebarProps, SidebarState, SidebarVariant,
};
use fandhe_frontend_pre_styled_ui::stat;
use fandhe_frontend_pre_styled_ui::table::{self, TableProps};
use fandhe_frontend_pre_styled_ui::tabs::{
    self, ActivationMode, Orientation, TabItem, TabsProps, TabsVariant,
};
use fandhe_frontend_pre_styled_ui::toggle_group::{self, ToggleGroupVariant};
use fandhe_frontend_pre_styled_ui::{ColorPalette, Size};

/// 週次カテゴリラベル（Apr 3 〜 Jun 30 の 13 週、shadcn 側の日次 90 点を
/// 週次へ縮約する。x 軸ラベルの重なり回避が理由、モジュール doc参照）。
fn visitors_categories() -> Vec<String> {
    [
        "Apr 3", "Apr 10", "Apr 17", "Apr 24", "May 1", "May 8", "May 15", "May 22", "May 29",
        "Jun 5", "Jun 12", "Jun 19", "Jun 26",
    ]
    .into_iter()
    .map(str::to_string)
    .collect()
}

/// 1 枚の統計カード（Total Revenue 等）を組み立てる。
fn stat_card(
    label: &'static str,
    value: &'static str,
    trend_up: bool,
    trend_label: &'static str,
    help: &'static str,
) -> Node {
    let trend_badge = badge::badge(
        &BadgeProps {
            variant: BadgeVariant::Outline,
            ..BadgeProps::default()
        },
        vec![],
        vec![
            if trend_up {
                stat::up_indicator(vec![])
            } else {
                stat::down_indicator(vec![])
            },
            text(trend_label),
        ],
    );
// ...（以下省略。全文は公式ページ https://fandhe-ai.github.io/fandhe-frontend/blocks/dashboard-01/ の「Rust コード」を参照）
```

## Blocks

| slug | 説明 | 使用部品 | 公式 URL |
|------|------|----------|----------|
| dashboard-01 | shadcn/ui Blocks の `dashboard-01` に相当する管理画面ダッシュボード。inset サイドバー、統計カード 4 枚、期間切替付き面グラフ、タブ付きテーブル（行選択 checkbox 列）で構成 | [Sidebar](../../themes/navigation/sidebar.md) / [Card](../../themes/data-display/card.md) / [Stat](../../themes/data-display/stat.md) / [Badge](../../themes/data-display/badge.md) / [Area Chart](../../themes/charts/area-chart.md) / [Toggle Group](../../themes/forms/toggle-group.md) / [Tabs](../../themes/disclosure/tabs.md) / [Table](../../themes/data-display/table.md) / [Checkbox](../../themes/forms/checkbox.md) / [Avatar](../../themes/data-display/avatar.md) / [Menu](../../themes/collections/menu.md) / [Separator](../../themes/utilities/separator.md) / [Link](../../themes/typography/link.md) / [Button](../../themes/forms/button.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/dashboard-01/ |

## Notes

- 上記コードは公式 md `## Rust コード` の冒頭抜粋（元は約 714 行）。全文は公式ページ、または pin SHA のソースを参照する。
- docs-site は crates.io 未公開の crate で、`demo()` は利用者が `use` できる API ではない。利用者は block のコード例をコピーし、既存部品を合成して使う。
- Demo は静的な表示例で、`<form>` 要素を持たず、値の送信・検証・認証処理・データ取得を行わない。期間切替（toggle-group）・タブ切替・行選択（checkbox）は初期状態を固定して掲示する。ブランド名・ユーザー名・メールアドレス・統計値はすべて架空のもの。
- shadcn/ui 側との差分メモ: data table のドラッグハンドル・列表示切替・ページネーション・行ごとのアクションメニューは未合成（公式 md は、その時点で `data-table` 系部品が未実装だったため既存の `table` + `checkbox` の合成で静的な行選択の見た目のみを再現すると記す）。チャートは日次 90 点ではなく週次 13 点（Apr 3 〜 Jun 30）。sidebar の Quick Create はドロップダウンではなく単一の `button::button`（Outline）。Cmd/Ctrl+B によるサイドバー開閉は wasm-full 側の実行時責務で、この SSR 合成例の対象外。統計カードのトレンドバッジは `badge::badge`（Outline）+ `stat::up_indicator` / `down_indicator` で代替。
- `sidebar::root` と `sidebar::inset` は同じ `provider` の直接の子として並べる（`variant: Inset` の面パネル化が `provider[data-variant="inset"] > inset` の子結合子 CSS で効くため）。
- 出典（pin SHA `cf5edb9b8f1bf2a63d51dcf50a8d2806e2d8f9f9`）: `crates/docs-site/src/blocks/application/dashboard/dashboard_01.rs`（コードは `// blocks-code:begin`〜`end` の範囲）、公式 md は `site/blocks/dashboard-01.md`。

## Related

- [Application Blocks overview](./overview.md)
- [Sidebar](../../themes/navigation/sidebar.md)
- [Chart（Application Blocks）](./chart.md)
