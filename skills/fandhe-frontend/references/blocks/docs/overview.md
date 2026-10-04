# Docs Blocks overview

Blocks の Docs 区分（4 カテゴリ・15 block）の集約ページ。Blocks は新規 UI 部品ではなく、既存の Themes（`fandhe_frontend_pre_styled_ui`）/ Primitives / core 部品を組み合わせた実例集で、ドキュメントサイトのレイアウト・コードブロック・コード例プレビュー・API リファレンス表示を扱う。

## Signature / Usage

block 1 件の公開物は、未公開 crate `docs-site`（`crates/docs-site`）内の `pub fn demo() -> Node`（引数なし、戻り値は `fandhe_frontend_core::Node`）と `pub const BLOCK: Block`（レジストリ登録用メタデータ）の 2 つだけ。Props 構造体・Options・引数付き関数は無い。`Block` 構造体は `crates/docs-site/src/blocks/mod.rs` で次のように定義される（verbatim）。

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
```

`parts` の要素 `Part` は `label`（部品名）と `path`（`/themes/<slug>/` 形式の絶対パス）の 2 フィールド。`BLOCK` の実例（`code-block-language-tabs`、原文どおり）。

```rust
pub const BLOCK: Block = Block {
    path: "/blocks/code-block-language-tabs/",
    title: "code-block-language-tabs",
    category: BlockCategory::CodeBlock,
    rust_source: "crates/docs-site/src/blocks/docs/code_block/code_block_language_tabs.rs",
    demo_class: "blocks-code-block-language-tabs",
    parts: &[
        Part {
            label: "Tabs",
            path: "/themes/tabs/",
        },
        Part {
            label: "Code",
            path: "/themes/code/",
        },
        Part {
            label: "Clipboard",
            path: "/themes/clipboard/",
        },
        Part {
            label: "Text",
            path: "/themes/text/",
        },
    ],
    layout_css: LayoutCss::Static(LAYOUT_CSS),
    demo,
};
```

## Categories

| カテゴリ | block 数 | ページ |
|----------|---------|--------|
| Docs Layout | 7 | [docs-layout.md](./docs-layout.md) |
| Code Block | 2 | [code-block.md](./code-block.md) |
| Example Preview | 2 | [example-preview.md](./example-preview.md) |
| API Reference | 4 | [api-reference.md](./api-reference.md) |

## Notes

- `docs-site` は crates.io 未公開 crate のため、`demo()` は利用者が `use` できる API ではない。利用はコピー前提で、`fandhe_frontend_pre_styled_ui::*` / `fandhe_frontend_core::*` の部品の実際の呼び出し規約（引数順・Props の組み立て・`id` の対応付け）を読み取る見本として使う。
- block 固有の CSS（`Block::layout_css`、`LAYOUT_CSS` 定数）と `data-blocks-*` / `blocks-<slug>-*` クラスは docs-site 側にあり、各ページ掲載の `demo()` コードだけでは再現されない。レイアウトまで再現するにはソース（`crates/docs-site/src/blocks/docs/<category_snake>/<slug_snake>.rs`）の `LAYOUT_CSS` も参照する。
- 全 block は無 JS の静的表示で `<form>` を持たない。タブの切替・コピー・外部で開く・Try it などの操作要素は `disabled` 固定のものが多く、実際の動作は利用者側のハイドレーション（`fandhe-frontend-wasm-full`）で実装する。ページタイトル・コード・API 名は架空データ。
- 公式 md の `## Rust コード` フェンスは Rust ソースの `// blocks-code:begin`〜`end` の範囲と一致する（`blocks_code_drift.rs` で保証）。各カテゴリページの `## Signature / Usage` はそのカテゴリで最も短い block の当該フェンスの転記。
- 出典（pin SHA `cf5edb9b8f1bf2a63d51dcf50a8d2806e2d8f9f9`）: 公式 md `site/blocks/<slug>.md`（`https://fandhe-ai.github.io/fandhe-frontend/blocks/<slug>/`）、`crates/docs-site/src/blocks/mod.rs`、`crates/docs-site/src/blocks/docs/`。

## Related

- [Ecommerce Blocks overview](../ecommerce/overview.md)
- [Themes: typography](../../themes/typography/README.md)
- [Themes: data-display](../../themes/data-display/README.md)
- [Themes: disclosure](../../themes/disclosure/README.md)
