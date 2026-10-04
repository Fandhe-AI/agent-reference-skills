# Application Blocks（概要）

Blocks の Application 区分（26 カテゴリ・124 block）の集約ページ。Blocks は新規 API ではなく既存の Themes / Primitives / core 部品の合成例で、各 block の公開物は未公開 crate `docs-site` 内部の `pub fn demo() -> Node` と `pub const BLOCK: Block` の 2 つだけである（引数付き関数・Props 構造体・Options は無い）。

## Signature / Usage

各 block のソース（`crates/docs-site/src/blocks/application/<category_snake>/<slug_snake>.rs`）は同一形で、`demo()` が `fandhe_frontend_core::Node` を返す純関数、`BLOCK` がレジストリ登録用メタデータ。利用者が使うのは `demo()` の本体（Themes / Primitives / core 部品の呼び出しコード）であり、コピーして自アプリに組み込む。

```rust
/// `auth-otp-verify` の Demo 本体。呼び出しごとに同一の `Node` を返す純関数。
pub fn demo() -> Node
```

`login-01`（`application/auth/login_01.rs`）の `BLOCK` の実例。

```rust
pub const BLOCK: Block = Block {
    path: "/blocks/login-01/",
    title: "login-01",
    category: BlockCategory::Auth,
    rust_source: "crates/docs-site/src/blocks/application/auth/login_01.rs",
    demo_class: "blocks-login-01",
    parts: &[
        Part {
            label: "Card",
            path: "/themes/card/",
        },
        Part {
            label: "Field",
            path: "/themes/field/",
        },
        Part {
            label: "Input",
            path: "/themes/input/",
        },
        Part {
            label: "Button",
            path: "/themes/button/",
        },
    ],
    layout_css: LayoutCss::Static(LAYOUT_CSS),
    demo,
};
```

`Block` / `Part` / `LayoutCss` の定義（`crates/docs-site/src/blocks/mod.rs`。`Block` と `Part` は doc comment を含め原文のまま、`LayoutCss` は enum 直前の説明コメントのみ省略）。

```rust
/// block 1 件分のレジストリエントリ（モジュール doc「レジストリ構造」節）。
#[derive(Clone, Copy)]
pub struct Block {
    /// `site/nav.toml` の `page.path` と一致する block ページの絶対パス。
    pub path: &'static str,
    /// block 名（`## Demo` 節の見出しにはならないが `title` 属性等の将来利用
    /// に備え保持する。現状は [`insert_generated_sections`] からは未使用）。
    pub title: &'static str,
    /// この block が属するカテゴリ（イシュー #2733）。`/blocks/` 索引ページの
    /// 「区分 → カテゴリ」節分類に用いる唯一の入力。新規カテゴリが必要な
    /// 場合は [`category`] モジュールの [`BlockCategory`] へ追加すること
    /// （未知カテゴリは全域 `match` によりコンパイル時に弾かれる）。
    pub category: BlockCategory,
    /// 対応する実装ファイルの repo 相対パス（`blocks_code_drift.rs` が
    /// マーカー内容と手書き Markdown のフェンスを突合する際に使う）。
    pub rust_source: &'static str,
    /// Demo ラッパへ [`DEMO_CLASS`] に加えて付与する block 固有 class
    /// （[`Block::layout_css`] のセレクタと一致させる）。
    pub demo_class: &'static str,
    /// Demo が使用する Themes/Primitives 部品一覧（`## 使用部品`）。
    pub parts: &'static [Part],
    /// この block が [`stylesheet`] へ寄与する固有 CSS（イシュー #2734）。
    pub layout_css: LayoutCss,
    /// Demo 本体を組み立てる純関数。呼び出しごとに決定的な `Node` を返す
    /// （状態機械を持たない、他の Rust 生成コンテンツ供給元と同じ設計）。
    pub demo: fn() -> Node,
}

/// 使用部品一覧の 1 件（`## 使用部品` の `<li><a>`）。`path` は
/// `/themes/<kebab>/` または `/primitives/<kebab>/` を指す。
#[derive(Debug, Clone, Copy)]
pub struct Part {
    /// リンクの表示テキスト（部品名）。
    pub label: &'static str,
    /// リンク先ページの絶対パス（`base_path` を含まない、`layout::asset_href`
    /// が付与する）。
    pub path: &'static str,
}

#[derive(Clone, Copy)]
pub enum LayoutCss {
    /// ビルド時に確定する静的な CSS 文字列。
    Static(&'static str),
    /// 実行時に組み立てる CSS 文字列（トークン参照の展開等、静的文字列の
    /// リテラル結合だけでは表現できない block が使う）。
    Dynamic(fn() -> String),
}
```

## Categories

Application 区分は 26 カテゴリ・計 124 block。各カテゴリページに block 一覧（slug / 説明 / 使用部品 / 公式 URL）と、カテゴリ内で最も短い block のコード全文を収録する。

| Category | Blocks | Page |
|----------|--------|------|
| App Shell | 6 | [app-shell.md](./app-shell.md) |
| Sidebar | 4 | [sidebar.md](./sidebar.md) |
| Navbar | 4 | [navbar.md](./navbar.md) |
| Page Heading | 6 | [page-heading.md](./page-heading.md) |
| Card Heading | 2 | [card-heading.md](./card-heading.md) |
| List | 5 | [list.md](./list.md) |
| Table | 7 | [table.md](./table.md) |
| Grid List | 5 | [grid-list.md](./grid-list.md) |
| Description List | 3 | [description-list.md](./description-list.md) |
| Feed | 2 | [feed.md](./feed.md) |
| Form Layout | 4 | [form-layout.md](./form-layout.md) |
| Auth | 10 | [auth.md](./auth.md) |
| Settings | 30 | [settings.md](./settings.md) |
| Action Panel | 5 | [action-panel.md](./action-panel.md) |
| Empty State | 5 | [empty-state.md](./empty-state.md) |
| Notification | 2 | [notification.md](./notification.md) |
| Dialog | 1 | [dialog.md](./dialog.md) |
| Command Palette | 1 | [command-palette.md](./command-palette.md) |
| Onboarding | 4 | [onboarding.md](./onboarding.md) |
| Card | 4 | [card.md](./card.md) |
| Profile | 4 | [profile.md](./profile.md) |
| Chart | 3 | [chart.md](./chart.md) |
| Dashboard | 1 | [dashboard.md](./dashboard.md) |
| AI Chat | 3 | [ai-chat.md](./ai-chat.md) |
| Help Center | 2 | [help-center.md](./help-center.md) |
| Media Object | 1 | [media-object.md](./media-object.md) |

## Notes

- `docs-site` crate は crates.io 未公開で、利用者が `use` できる API ではない。各 block のコードを自アプリへコピーし、`fandhe_frontend_pre_styled_ui::*` / `fandhe_frontend_headless_ui::*` / `fandhe_frontend_core::*` の公開 API を呼ぶ部分を利用する。
- コード中の `crate::blocks::dummy_assets::*`（ダミーの人名・画像 URL 等）や `crate::layout` 参照、`LAYOUT_CSS`（block 固有のレイアウト CSS。`BLOCK.layout_css` 経由でサイト全体のスタイルシートへ集約される）は docs-site 内部のもの。コピー時は自前のデータ・スタイルに置き換える。
- 公式 md の ` ```rust ` フェンスは Rust ソースの `// blocks-code:begin` 〜 `end` 範囲と完全一致する（`blocks_code_drift.rs` で保証）。公式 md の構造は H1（slug）→ 導入文（使用部品・静的表示例である旨）→ `## Rust コード` → 任意の差分メモ（`## 原案差分メモ` / `## 集約元との差分メモ` / `## 差分メモ` / `## shadcn 側との差分メモ`）。
- 静的表示の前提: docs サイトは JS ハイドレーションを行わないため、Demo は `<form>` を持たず、ボタンは `type="button"` のまま、メニュー・ダイアログ・サイドバー等の開閉は固定状態の併記になる。開閉などの対話には `fandhe-frontend-wasm-full` の JS 配線が必要。送信処理・データ取得は利用側で実装する。
- 文言・人名・金額・日時は架空で、実在の企業名・人物・PII・クレデンシャルを含まない。他社製品名は一般名へ置換されている。
- `BLOCK.parts` の `path` は `/themes/<kebab>/` または `/primitives/<kebab>/`（本スキルでは各カテゴリページの Parts 列から対応する Themes ページへリンクする）。
- 出典（pin SHA `cf5edb9b8f1bf2a63d51dcf50a8d2806e2d8f9f9`）: 公式 md は `site/blocks/<slug>.md`、Rust ソースは `crates/docs-site/src/blocks/application/<category_snake>/<slug_snake>.rs`、`Block` 定義は `crates/docs-site/src/blocks/mod.rs`。公式 URL は `https://fandhe-ai.github.io/fandhe-frontend/blocks/<slug>/`。

## Related

- [Sidebar](./sidebar.md)
- [Settings](./settings.md)
- [Auth](./auth.md)
