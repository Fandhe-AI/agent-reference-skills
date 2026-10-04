# Profile（Application Blocks）

Profile は、プロフィールカード・プロフィール見出し・プロフィール詳細の合成例 4 件。blocks は新規 API ではなく既存の Themes / Primitives / core 部品の合成例で、各 block の公開物は未公開 crate docs-site 内部の `pub fn demo() -> Node` と `pub const BLOCK: Block` だけである。

## Signature / Usage

`profile-header-follow`（カテゴリ内で最も短い block）の `## Rust コード` の冒頭抜粋。

```rust
use crate::blocks::dummy_assets;
use fandhe_frontend_core::{div, text, Node};
use fandhe_frontend_pre_styled_ui::avatar::{self, AvatarProps, ImageStatus};
use fandhe_frontend_pre_styled_ui::badge::{badge, BadgeProps};
use fandhe_frontend_pre_styled_ui::button::{button, ButtonProps, ButtonVariant};
use fandhe_frontend_pre_styled_ui::heading::{heading, HeadingLevel, HeadingProps, HeadingSize};
use fandhe_frontend_pre_styled_ui::stat;
use fandhe_frontend_pre_styled_ui::text::{self as styled_text, TextProps, TextSize, TextVariant};
use fandhe_frontend_pre_styled_ui::Size;

/// プロフィール 1 件分の架空データ。
struct ProfileEntry {
    name: &'static str,
    title: &'static str,
    company: &'static str,
    bio: &'static str,
    followers: &'static str,
    following: &'static str,
}

/// 代表版（架空、1 件）。両インスタンスで同一データを使い、レイアウト差分
/// （アバター位置）のみを見せる。
const PROFILE: ProfileEntry = ProfileEntry {
    name: dummy_assets::PERSON_NAMES[0],
    title: dummy_assets::JOB_TITLES[0],
    company: dummy_assets::COMPANY_NAMES[0],
    bio: "新しい体験を形にする仕事をしています。休日は写真を撮りながら街を歩くのが好きです。",
    followers: "1,280",
    following: "312",
};

/// アバター（`AvatarProps::size` は `Xl`。氏名は隣接の見出しが伝えるため
/// `alt=""` とする、`content_article_toc` と同型の判断）。
fn profile_avatar() -> Node {
    avatar::root(
        &AvatarProps {
            size: Size::Xl,
            ..AvatarProps::default()
        },
        vec![("data-blocks-profile-header-follow-avatar", "")],
        vec![
            avatar::image(ImageStatus::Loaded, dummy_assets::AVATAR_SRC, "", vec![]),
            avatar::fallback(
                ImageStatus::Loaded,
                vec![],
                vec![text(PROFILE.name.chars().take(1).collect::<String>())],
            ),
        ],
    )
}

/// 名前行（氏名 + 認証バッジ）。
fn name_row() -> Node {
    div(
        vec![("class", "blocks-profile-header-follow-name-row")],
        vec![
            heading(
                HeadingLevel::H3,
                &HeadingProps {
                    size: HeadingSize::Lg,
                    ..HeadingProps::default()
                },
                vec![("data-blocks-profile-header-follow-name", "")],
                vec![text(PROFILE.name)],
            ),
            badge(
                &BadgeProps {
                    size: Size::Sm,
                    ..BadgeProps::default()
                },
                vec![("data-blocks-profile-header-follow-verified", "")],
                vec![text("認証済み")],
            ),
        ],
    )
}
// ...（以下省略。全文は公式ページ https://fandhe-ai.github.io/fandhe-frontend/blocks/profile-header-follow/ の「Rust コード」を参照）
```

## Blocks

| slug | 説明 | 使用部品 | 公式 URL |
|------|------|----------|----------|
| profile-card-centered | 中央寄せのプロフィールカード。avatar → 氏名 + 認証 badge → 肩書・所在地 → 自己紹介を縦積みし、SNS アイコンリンクと主操作ボタンを置く代表構成と、全幅ボタン + テキスト付きリンク一覧の最小版の 2 インスタンス | [Card](../../themes/data-display/card.md) / [Avatar](../../themes/data-display/avatar.md) / [Badge](../../themes/data-display/badge.md) / [Heading](../../themes/typography/heading.md) / [Text](../../themes/typography/text.md) / [Button](../../themes/forms/button.md) / [Link](../../themes/typography/link.md) / [Icon](../../themes/data-display/icon.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/profile-card-centered/ |
| profile-detail-datalist | アバター・氏名・役職・操作ボタン群と、連絡先・経歴の定義リスト（data-list）を組み合わせたプロフィール詳細。操作ボタン 2 個 + 縦積みの定義リスト版と、4 個 + 横並び版 | [Avatar](../../themes/data-display/avatar.md) / [Heading](../../themes/typography/heading.md) / [Text](../../themes/typography/text.md) / [Button](../../themes/forms/button.md) / [Data List](../../themes/data-display/data-list.md) / [Badge](../../themes/data-display/badge.md) / [Icon](../../themes/data-display/icon.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/profile-detail-datalist/ |
| profile-detail-skills | 統計値とスキルを持つプロフィール詳細。見出しにアバター・名前・肩書・所在地・オンライン状態、本文に単価・評価・実績の統計値 → 自己紹介 → スキル（バッジ群 + チェック付き 2 列リスト）。フル構成と中量版の 2 インスタンス | [Avatar](../../themes/data-display/avatar.md) / [Badge](../../themes/data-display/badge.md) / [Status](../../themes/data-display/status.md) / [Stat](../../themes/data-display/stat.md) / [Heading](../../themes/typography/heading.md) / [Text](../../themes/typography/text.md) / [List](../../themes/typography/list.md) / [Icon](../../themes/data-display/icon.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/profile-detail-skills/ |
| profile-header-follow | アバター・氏名・認証バッジ・所属・自己紹介・フォロワー数を束ねたプロフィール見出しと、フォロー操作ボタン群。アバター左（`avatar-start`）・右（`avatar-end`）の 2 インスタンス | [Avatar](../../themes/data-display/avatar.md) / [Badge](../../themes/data-display/badge.md) / [Heading](../../themes/typography/heading.md) / [Text](../../themes/typography/text.md) / [Button](../../themes/forms/button.md) / [Stat](../../themes/data-display/stat.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/profile-header-follow/ |

## Notes

- 上記コードは公式 md `## Rust コード` の冒頭抜粋（元は約 169 行）。全文は公式ページを参照する。
- docs-site は crates.io 未公開の crate で、`demo()` は利用者が `use` できる API ではない。上記コードの `crate::blocks::dummy_assets`（架空の人名・役職・社名・アバター画像）も docs-site 内部で未公開のため、コピー利用時は自前のデータ・画像へ差し替える。
- すべての Demo は無 JS の静的表示で `<form>` を含まない。氏名・役職・社名・自己紹介・数値はすべて架空のデータで、フォロー状態は「未フォロー」固定。
- `profile-header-follow` の差分メモ: フォロワー数・フォロー中数は `stat` 部品（`<dl>` / `<dt>` / `<dd>`）で表現し、独自の数値整形ロジックは実装しない。アバター右配置版は CSS の `grid-template-columns` / `order` 切り替えのみで実現し、DOM 構造・データは左配置版と同一。
- 出典（pin SHA `cf5edb9b8f1bf2a63d51dcf50a8d2806e2d8f9f9`）: `crates/docs-site/src/blocks/application/profile/profile_header_follow.rs`（コードは `// blocks-code:begin`〜`end` の範囲）、公式 md は `site/blocks/<slug>.md`。他 3 件も同ディレクトリの `profile_<slug_snake>.rs`。

## Related

- [Application Blocks overview](./overview.md)
- [Avatar](../../themes/data-display/avatar.md)
- [Card（Application Blocks）](./card.md)
