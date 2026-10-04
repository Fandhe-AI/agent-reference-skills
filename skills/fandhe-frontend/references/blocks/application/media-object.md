# Media Object（Application Blocks）

Media Object は、画像（またはアイコン）と見出し・説明文を横並びにする media object の整列パターン集 1 件。blocks は新規 API ではなく既存の Themes / Primitives / core 部品の合成例で、各 block の公開物は未公開 crate docs-site 内部の `pub fn demo() -> Node` と `pub const BLOCK: Block` だけである。

## Signature / Usage

`media-object`（カテゴリ唯一の block）の `## Rust コード` の冒頭抜粋。

```rust
use crate::blocks::dummy_assets;
use fandhe_frontend_core::{div, el, text, Node};
use fandhe_frontend_pre_styled_ui::image::{self, ImageProps};
use fandhe_frontend_pre_styled_ui::item::{self, ItemMediaVariant, ItemRootProps};

/// media（画像）パーツを組み立てる。`extra_attr` は `variant` 固有の
/// フック用 `data-*` 属性（例: `-media-nested`）。
fn media_image(extra_attr: (&'static str, &'static str)) -> Node {
    item::media(
        ItemMediaVariant::Image,
        vec![extra_attr],
        vec![image::image(
            &ImageProps::new(dummy_assets::PRODUCT_SRC, ""),
            vec![],
        )],
    )
}

/// content（見出し + 説明文）パーツを組み立てる。
fn body(title: &str, description: &str) -> Node {
    body_with_extra(title, description, Vec::new())
}

/// content（見出し + 説明文 + 追加の子ノード）パーツを組み立てる。`nested`
/// インスタンスが入れ子の media object を本文末尾へ追加するために使う
/// （[`body`] はこの追加子ノードが空の特殊形）。
fn body_with_extra(title: &str, description: &str, extra: Vec<Node>) -> Node {
    let mut children = vec![
        item::title(vec![], vec![text(title)]),
        item::description(vec![], vec![text(description)]),
    ];
    children.extend(extra);
    item::content(vec![], children)
}

/// パネル見出し（短い説明、[`el`] で `<p>` として直接組み立てる。見出し
/// 階層は docs ページ H1 → 生成 H2「Demo」の配下のため `h2`/`h3` を増やさず
/// `p` で十分）。
fn caption(text_content: &str) -> Node {
    el(
        "p",
        vec![("class", "blocks-media-object-caption")],
        vec![text(text_content)],
    )
}

/// パネル外枠。`narrow` が `true` のパネルは
/// `data-blocks-media-object-narrow`（[`LAYOUT_CSS`] の `max-width: 20rem`
/// 規則）を追加で持つ。`stack`/`stack-full` は `@container` 分岐の実測幅
/// 確保用、`stretch`（Bugbot 指摘、イシュー #3228 PR #3402）は説明文を
/// 折り返させて行高を media の既定 6rem 角より高くし、`align-items:
/// stretch` が実際に media を伸長させる様子を可視化する用途で使う
/// （デモ幅が広いままだと 1 行に収まり `top` と見分けがつかない）。
fn panel(variant: &'static str, caption_text: &str, narrow: bool, item_node: Node) -> Node {
    let mut attrs: Vec<(&str, &str)> = vec![
        ("class", "blocks-media-object-panel"),
        ("data-blocks-media-object-variant", variant),
    ];
    if narrow {
        attrs.push(("data-blocks-media-object-narrow", ""));
    }
    div(attrs, vec![caption(caption_text), item_node])
}

/// `root`（item）パーツ。`variant` を `data-blocks-media-object-variant`
/// へ渡し、既定の整列（`top`）以外は [`LAYOUT_CSS`] の対応セレクタが上書く。
fn media_object_root(variant: &'static str, media: Node, content: Node) -> Node {
    item::root(
        ItemRootProps::default(),
        vec![
            ("data-blocks-media-object-root", ""),
            ("data-blocks-media-object-variant", variant),
        ],
        vec![media, content],
    )
}
// ...（以下省略。全文は公式ページ https://fandhe-ai.github.io/fandhe-frontend/blocks/media-object/ の「Rust コード」を参照）
```

## Blocks

| slug | 説明 | 使用部品 | 公式 URL |
|------|------|----------|----------|
| media-object | 画像と見出し・説明文を横並びにする整列パターン集。上揃え（基準形）・縦中央揃え・下揃え・画像を行高いっぱいに伸ばす・画像を右側に配置・狭幅で縦積み・狭幅で画像を全幅化・本文内への入れ子の 8 インスタンス | [Item](../../themes/data-display/item.md) / [Image](../../themes/data-display/image.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/media-object/ |

## Notes

- 上記コードは公式 md `## Rust コード` の冒頭抜粋（元は約 250 行）。全文は公式ページを参照する。
- docs-site は crates.io 未公開の crate で、`demo()` は利用者が `use` できる API ではない。コードの `crate::blocks::dummy_assets`（`PRODUCT_SRC` のモノトーン抽象図形 SVG）も docs-site 内部で未公開のため、コピー利用時は自前の画像へ差し替える。
- Demo は静的な整列パターン集で、`<form>`・ボタン・リンク・`id` 属性を持たず、データ取得・送信・状態管理を行わない。画像は装飾用のプレースホルダ（`alt=""`）で、見出し・説明文は架空のもの。
- 狭幅パターン（`stack` / `stack-full`）はビューポート幅ではなくパネル自体の実測幅（`@container`）で折り返しを切り替え、パネルへ `max-width: 20rem` を与えて同一ビューポートのまま狭幅後の見た目を再現する。`nested` は本文（`item::content`）の末尾へ、より小さい media object（media `2.5rem` 角）を入れ子にし、入れ子側の `item::root` には外側専用の上書きフック（`data-blocks-media-object-root`）を付与せず既定の折り返しレイアウトを継承させる。
- 出典（pin SHA `cf5edb9b8f1bf2a63d51dcf50a8d2806e2d8f9f9`）: `crates/docs-site/src/blocks/application/media_object/media_object_alignments.rs`（slug `media-object` に対し rs ファイル名は `media_object_alignments.rs`。コードは `// blocks-code:begin`〜`end` の範囲）、公式 md は `site/blocks/media-object.md`。

## Related

- [Application Blocks overview](./overview.md)
- [Item](../../themes/data-display/item.md)
- [Image](../../themes/data-display/image.md)
