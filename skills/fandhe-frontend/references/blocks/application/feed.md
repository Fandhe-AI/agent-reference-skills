# Feed（Application Blocks）

コメントとイベントが混在するアクティビティフィード、投票数付き投稿カードのフィードの合成例 2 件。Blocks は新規 API ではなく既存の Themes / Primitives / core 部品の合成例で、各 block の公開物は未公開 crate `docs-site` 内部の `pub fn demo() -> Node` と `pub const BLOCK: Block` だけである。

## Signature / Usage

カテゴリ内で最も短い `feed-upvote-cards`（投票数付き投稿カードのフィード）の `## Rust コード` の冒頭抜粋。

```rust
use crate::blocks::dummy_assets;
use fandhe_frontend_core::{div, el, li, span, text, ul, Node};
use fandhe_frontend_pre_styled_ui::avatar::{self, AvatarProps, ImageStatus};
use fandhe_frontend_pre_styled_ui::badge::{self, BadgeProps, BadgeVariant};
use fandhe_frontend_pre_styled_ui::button::{self, ButtonProps, ButtonVariant};
use fandhe_frontend_pre_styled_ui::card::{self, CardVariant};
use fandhe_frontend_pre_styled_ui::icon::{self, IconProps};
use fandhe_frontend_pre_styled_ui::status::{self, StatusProps};
use fandhe_frontend_pre_styled_ui::{ColorPalette, Size};

/// 投稿 1 件分のダミーデータ（架空、実在の人物・企業とは無関係）。
struct Post {
    /// [`dummy_assets::PERSON_NAMES`] への添字。
    author_index: usize,
    date_iso: &'static str,
    date_label: &'static str,
    title: &'static str,
    excerpt: &'static str,
    tags: &'static [&'static str],
    votes: u32,
    /// `true` の投稿のみ投票済み（モジュール doc「投票ボタンを 1 件だけ
    /// 『投票済み』で固定する理由」節）で固定表示する。
    voted: bool,
    status_label: &'static str,
    status_palette: ColorPalette,
}

/// 投稿一覧（架空、4 件）。`voted: true` はちょうど 1 件のみ。
const POSTS: [Post; 4] = [
    Post {
        author_index: 0,
        date_iso: "2026-09-20",
        date_label: "2026年9月20日",
        title: "既定エスケープの回帰テストを増強しました",
        excerpt:
            "SSR/SSG/CSR の各経路で XSS 回帰テストを追加した提案です。レビューをお願いします。",
        tags: &["設計", "テスト"],
        votes: 42,
        voted: false,
        status_label: "受付中",
        status_palette: ColorPalette::Info,
    },
    Post {
        author_index: 1,
        date_iso: "2026-09-18",
        date_label: "2026年9月18日",
        title: "block 追加 PR のレビュー時間を短縮する提案",
        excerpt: "レジストリと原稿を分離したことで、レビュー観点を絞り込めるようになりました。",
        tags: &["運用"],
        votes: 128,
        voted: true,
        status_label: "解決済み",
        status_palette: ColorPalette::Success,
    },
    Post {
        author_index: 2,
        date_iso: "2026-09-12",
        date_label: "2026年9月12日",
        title: "Wireframe UI のダークモード対応について",
        excerpt: "モノクロトークンをダークモードでどう反転させるか、意見を募集しています。",
        tags: &["デザイン", "アクセシビリティ"],
        votes: 7,
        voted: false,
        status_label: "受付中",
        status_palette: ColorPalette::Info,
    },
    Post {
        author_index: 3,
        date_iso: "2026-09-05",
        date_label: "2026年9月5日",
        title: "docs サイト検索インデックスのサイズ上限メモ",
        excerpt: "検索インデックスの決定性とサイズ上限の関係を整理したメモです。",
        tags: &["ドキュメント"],
        votes: 15,
        voted: false,
        status_label: "受付中",
        status_palette: ColorPalette::Info,
    },
];
// ...（以下省略。全文は公式ページ https://fandhe-ai.github.io/fandhe-frontend/blocks/feed-upvote-cards/ の「Rust コード」を参照）
```

## Blocks

| Slug | Description | Parts | Official URL |
|------|-------------|-------|--------------|
| `feed-comments-timeline` | 状態変更・担当者割り当て・タグ付けのイベントとアバター付きコメントカードが時系列で混在するフィードに、コメント投稿欄を添えた版と、イベントのみの簡易版の 2 インスタンス | [Timeline](../../themes/data-display/timeline.md), [Avatar](../../themes/data-display/avatar.md), [Card](../../themes/data-display/card.md), [Badge](../../themes/data-display/badge.md), [Textarea](../../themes/forms/textarea.md), [Select](../../themes/collections/select.md), [Button](../../themes/forms/button.md), [Tag](../../themes/data-display/tag.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/feed-comments-timeline/ |
| `feed-upvote-cards` | 投票ボタン + 得票数の列と、投稿者アバター・氏名・日付・状態・タグを持つ投稿カードのフィード | [Card](../../themes/data-display/card.md), [Avatar](../../themes/data-display/avatar.md), [Badge](../../themes/data-display/badge.md), [Button](../../themes/forms/button.md), [Status](../../themes/data-display/status.md), [Icon](../../themes/data-display/icon.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/feed-upvote-cards/ |

## Notes

- 上記コードは公式 md `## Rust コード` の冒頭抜粋（元は約 241 行）。全文は公式ページを参照する。
- Blocks は Themes / Primitives / core 部品の合成例で、公開 crate の API を使う側のコード例。`docs-site` crate は crates.io 未公開のため `use` できず、コードをコピーして利用する前提。`crate::blocks::dummy_assets` は docs-site 内部のダミー素材で、コピー時に置き換える。
- 各 block の `BLOCK.parts` の label と公式 md 冒頭の使用部品は一致する（`BLOCK` の構造は [overview.md](./overview.md) を参照）。
- 静的表示（docs サイトは JS ハイドレーションを行わない）。データ取得・送信は行わず `<form>` は使わない。ボタンは `type="button"` のまま送信先を持たず、`feed-comments-timeline` の公開範囲 select は常に閉じた静的表示（開閉には `fandhe-frontend-wasm-full` の JS 配線が必要）。文言・人名・日時は架空。
- 差分メモの要点: `feed-comments-timeline` の上のインスタンスは返信スレッドと投稿者バッジを 1 件のコメントへ組み込み、下のインスタンスはイベントのみを indicator の記号 + 本文 1 行 + 日時で簡潔に並べる。`feed-upvote-cards` は集約元が 1 件のみで、投票ボタンはちょうど 1 件だけ「投票済み」（`aria-pressed="true"`）で固定し、各ボタンのアクセシブル名は投稿ごとに一意にする。
- 出典（pin SHA `cf5edb9b8f1bf2a63d51dcf50a8d2806e2d8f9f9`）: 公式 md は `site/blocks/<slug>.md`、Rust ソースは `crates/docs-site/src/blocks/application/feed/<slug_snake>.rs`。

## Related

- [Application Blocks overview](./overview.md)
- [List](./list.md)
- [Card](./card.md)
- [Timeline](../../themes/data-display/timeline.md)
