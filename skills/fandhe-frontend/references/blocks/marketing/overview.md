# Marketing Blocks（概要）

Blocks の Marketing 区分（23 カテゴリ・138 block）の集約ページ。Blocks は新規 API ではなく、既存の Themes（`fandhe_frontend_pre_styled_ui`）・Primitives・core（`fandhe_frontend_core`）部品を組み合わせた画面単位のコード例集で、カテゴリ単位のページ（`<category>.md`）に block 一覧と代表 1 件の実コードを収録する。

## Signature / Usage

各 block は未公開 crate `docs-site`（`crates/docs-site`、crates.io 未公開）内の 1 ファイルで、公開物は次の 2 つだけである。引数・Props・Options は存在しない。

```rust
pub fn demo() -> Node
```

```rust
pub const BLOCK: Block = Block {
    path: "/blocks/hero-terminal/",
    title: "hero-terminal",
    category: BlockCategory::Hero,
    rust_source: "crates/docs-site/src/blocks/marketing/hero/hero_terminal.rs",
    demo_class: "blocks-hero-terminal",
    parts: &[
        Part { label: "Code", path: "/themes/code/" },
        Part { label: "Kbd", path: "/themes/kbd/" },
    ],
    layout_css: LayoutCss::Static(LAYOUT_CSS),
    demo,
};
```

`demo()` は呼び出しごとに同一の `Node`（`fandhe_frontend_core::Node`）を返す純関数。利用者が使うのは `demo()` ではなく、その中身（Themes / Primitives / core 部品の呼び出し方）をコピーして自アプリに組み込むという使い方である。

`Block` の定義（レジストリ登録用メタデータ。`crates/docs-site/src/blocks/mod.rs`、原文のまま）。

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

```rust
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
```

```rust
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

Marketing 区分の全 23 カテゴリ。

| カテゴリ | block 件数 | ページ |
| --- | --- | --- |
| Hero | 16 | [hero.md](./hero.md) |
| Feature | 13 | [feature.md](./feature.md) |
| CTA | 6 | [cta.md](./cta.md) |
| Pricing | 10 | [pricing.md](./pricing.md) |
| Testimonial | 8 | [testimonial.md](./testimonial.md) |
| Logo Cloud | 3 | [logo-cloud.md](./logo-cloud.md) |
| Stats | 6 | [stats.md](./stats.md) |
| Team | 4 | [team.md](./team.md) |
| FAQ | 6 | [faq.md](./faq.md) |
| Contact | 8 | [contact.md](./contact.md) |
| Newsletter | 3 | [newsletter.md](./newsletter.md) |
| Blog | 7 | [blog.md](./blog.md) |
| Content | 6 | [content.md](./content.md) |
| Header | 4 | [header.md](./header.md) |
| Footer | 6 | [footer.md](./footer.md) |
| Banner | 5 | [banner.md](./banner.md) |
| Bento | 4 | [bento.md](./bento.md) |
| Comparison | 4 | [comparison.md](./comparison.md) |
| Careers | 3 | [careers.md](./careers.md) |
| Changelog | 4 | [changelog.md](./changelog.md) |
| Error Page | 5 | [error-page.md](./error-page.md) |
| Gallery | 4 | [gallery.md](./gallery.md) |
| Section Heading | 3 | [section-heading.md](./section-heading.md) |

合計 23 カテゴリ・138 block（Blocks 全体は Marketing 138 / Application 124 / Ecommerce 52 / Docs 15 の計 329 件、65 カテゴリ）。

## Notes

- `docs-site` crate は crates.io 未公開で、`demo()` と `BLOCK` は利用者が `use` できる API ではない。Blocks は「コピーして改変する前提のコード例」として使う。
- 公式 md の `## Rust コード` のフェンスは `.rs` の `// blocks-code:begin`〜`end` の範囲と完全一致する。`use crate::blocks::dummy_assets;` と `dummy_assets::*_SRC`（ダミー画像素材）、`REPO` 定数（固定の GitHub リポジトリ URL）などは docs サイト固有のため、コピー時は自前の値に差し替える。
- フェンスには含まれないが、各 block は `Block.layout_css`（`LayoutCss::Static` / `LayoutCss::Dynamic`）で固有のレイアウト CSS を登録している。`demo_class` や `blocks-<slug>-*` のクラス名に対応する CSS であり、Rust コードだけをコピーしてもレイアウトのスタイルは付かない。
- Content〜Section Heading の 11 カテゴリ（本ディレクトリ後半）のフェンスが `use` するのは `fandhe_frontend_core` と `fandhe_frontend_pre_styled_ui` のみ（`fandhe_frontend_headless_ui` / `fandhe_frontend_interactive` / `fandhe_frontend_app` は未使用）。
- Blocks は無 JS の静的な表示例で、公式 md の導入文は `<form>` を使わず、ボタンは `type="button"` で送信先を持たない旨を述べる（`docs/policy/intentional-non-adoption.md` §3.25 の責務境界）。送信・Cookie 保存・検証などのアプリケーションロジックは利用者側の実装に委ねる。文言・数値・人名は架空。
- docs-site の `BlockCategory` enum には nav 未掲載で 0 件の空カテゴリ `Calendar` と `Drawer` が存在し、`mod.rs` の doc は「66 カテゴリ」と記すが、nav 上の実カテゴリは 65 で、本スキルは実数を正とする。
- 公式 md は 1 block 1 ページで、導入文 → `## Rust コード` → 任意の差分メモ（`## 原案差分メモ` / `## 集約元との差分メモ` / `## 差分メモ`）の構成。本スキルではカテゴリ単位に集約している。個別 block の全文は公式 URL `https://fandhe-ai.github.io/fandhe-frontend/blocks/<slug>/` を参照。
- 出典（pin SHA `cf5edb9b8f1bf2a63d51dcf50a8d2806e2d8f9f9`）: `crates/docs-site/src/blocks/mod.rs`、`crates/docs-site/src/blocks/marketing/<category_snake>/<slug_snake>.rs`、`site/blocks/<slug>.md`。

## Related

- [Content](./content.md)
- [Header](./header.md)
- [Footer](./footer.md)
- [Hero](./hero.md)
- [Feature](./feature.md)
