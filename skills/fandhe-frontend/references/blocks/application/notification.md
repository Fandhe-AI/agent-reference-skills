# Notification（Application Blocks）

Notification は、ベルボタンから開く通知トレイ（ポップオーバー）の合成例 2 件。blocks は新規 API ではなく既存の Themes / Primitives / core 部品の合成例で、各 block の公開物は未公開 crate docs-site 内部の `pub fn demo() -> Node` と `pub const BLOCK: Block` だけである。

## Signature / Usage

`notification-tray-tabs`（カテゴリ内で最も短い block）の `## Rust コード` の冒頭抜粋。

```rust
use crate::blocks::dummy_assets;
use fandhe_frontend_core::{div, el, text, Node};
use fandhe_frontend_pre_styled_ui::avatar::{self, AvatarProps, ImageStatus};
use fandhe_frontend_pre_styled_ui::badge::{self, BadgeProps, BadgeVariant};
use fandhe_frontend_pre_styled_ui::button::{button, ButtonProps, ButtonVariant};
use fandhe_frontend_pre_styled_ui::empty_state::{self, EmptyStateProps};
use fandhe_frontend_pre_styled_ui::icon::{icon, IconProps};
use fandhe_frontend_pre_styled_ui::menu;
use fandhe_frontend_pre_styled_ui::popover::{self, OpenState};
use fandhe_frontend_pre_styled_ui::recipe::Size;
use fandhe_frontend_pre_styled_ui::tabs::{
    self, ActivationMode, Orientation, TabItem, TabsProps, TabsVariant,
};
use fandhe_frontend_pre_styled_ui::visually_hidden;

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

/// ベルアイコン（釣鐘形 + 下端の房）。
fn bell_icon() -> Node {
    geo_icon("M6 9a6 6 0 0 1 12 0v4l2 4H4l2-4z M10 20a2 2 0 0 0 4 0")
}

/// 縦 3 点アイコン（操作メニュー用）。
fn kebab_icon() -> Node {
    geo_icon("M12 5v.01 M12 12v.01 M12 19v.01")
}

/// 1 件の通知行（アバター + 本文 + 相対時刻。`unread` のとき未読ドットを
/// `data-unread` 経由の CSS 疑似要素で表示する）。
fn notification_item(
    name: &'static str,
    message: &'static str,
    when: &'static str,
    unread: bool,
) -> Node {
    let mut attrs: Vec<(&str, &str)> = vec![("class", "blocks-notification-tray-tabs-item")];
    if unread {
        attrs.push(("data-unread", ""));
    }
    div(
        attrs,
        vec![
            avatar::root(
                &AvatarProps {
                    size: Size::Sm,
                    ..AvatarProps::default()
                },
                vec![],
                vec![
                    avatar::image(ImageStatus::Loaded, dummy_assets::AVATAR_SRC, name, vec![]),
                    avatar::fallback(
                        ImageStatus::Loaded,
                        vec![],
                        vec![text(name.chars().take(1).collect::<String>())],
                    ),
                ],
            ),
            div(
                vec![("class", "blocks-notification-tray-tabs-item-body")],
                vec![
                    text(format!("{name} が{message}")),
                    div(
                        vec![("class", "blocks-notification-tray-tabs-item-time")],
                        vec![text(when)],
                    ),
                ],
            ),
        ],
    )
}
// ...（以下省略。全文は公式ページ https://fandhe-ai.github.io/fandhe-frontend/blocks/notification-tray-tabs/ の「Rust コード」を参照）
```

## Blocks

| slug | 説明 | 使用部品 | 公式 URL |
|------|------|----------|----------|
| notification-tray-tabs | ベルボタンから開くポップオーバー内にタブ（すべて・未読、件数バッジ付き）を置き、タブごとの通知一覧を静的に並記する。空の状態版・「すべて」選択版・「未読」選択版の計 3 インスタンス | [Popover](../../themes/overlays/popover.md) / [Tabs](../../themes/disclosure/tabs.md) / [Badge](../../themes/data-display/badge.md) / [Button](../../themes/forms/button.md) / [Avatar](../../themes/data-display/avatar.md) / [Menu](../../themes/collections/menu.md) / [Empty State](../../themes/feedback/empty-state.md) / [Visually Hidden](../../themes/utilities/visually-hidden.md) / [Icon](../../themes/data-display/icon.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/notification-tray-tabs/ |
| notification-tray | ベルのアイコンボタンから開く通知ポップオーバー。ヘッダー（表題・既読化ボタン・絞り込みメニュー）・本体・全件表示導線で構成。空状態・読み込み中・通知ありの 3 版を並記 | [Popover](../../themes/overlays/popover.md) / [Button](../../themes/forms/button.md) / [Avatar](../../themes/data-display/avatar.md) / [Menu](../../themes/collections/menu.md) / [Empty State](../../themes/feedback/empty-state.md) / [Skeleton](../../themes/feedback/skeleton.md) / [Icon](../../themes/data-display/icon.md) / [Visually Hidden](../../themes/utilities/visually-hidden.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/notification-tray/ |

## Notes

- 上記コードは公式 md `## Rust コード` の冒頭抜粋（元は約 350 行）。全文は公式ページを参照する。
- docs-site は crates.io 未公開の crate で、`demo()` は利用者が `use` できる API ではない。コードの `crate::blocks::dummy_assets`（架空の人名・アバター画像等）も docs-site 内部で未公開のため、コピー利用時は自前のデータ・画像へ差し替える。
- すべての Demo は無 JS の静的表示で、ポップオーバーは開いた状態・操作メニューは閉じた状態で固定し、`<form>` を持たない。ベルボタン・メニュートリガー・フッターボタンは `disabled` 固定（押しても何も起きない dead control を避けるため）。人名は架空のデータ。
- `notification-tray-tabs` の差分メモ: `popover` の `positioner` は既定でオーバーレイ配置（`position: absolute`）だが、掲示用に `position: static` へ中和している。タブは実物の `tabs` 部品で、選択状態は初期値で固定。無 JS のため「未読」パネルを可視化する目的で代表構成を `selected` 違いの 2 インスタンスで併記する。
- 出典（pin SHA `cf5edb9b8f1bf2a63d51dcf50a8d2806e2d8f9f9`）: `crates/docs-site/src/blocks/application/notification/notification_tray_tabs.rs`（コードは `// blocks-code:begin`〜`end` の範囲）、公式 md は `site/blocks/<slug>.md`。`notification-tray` は同ディレクトリの `notification_tray.rs`。

## Related

- [Application Blocks overview](./overview.md)
- [Popover](../../themes/overlays/popover.md)
- [Tabs](../../themes/disclosure/tabs.md)
