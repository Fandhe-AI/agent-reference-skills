# Emoji

`fandhe-frontend-wireframe-ui` の絵文字プレースホルダー。画面設計図中に絵文字 1 個を置く非インタラクティブな部品。API は `emoji(glyph, size)` の 2 引数で、props 構造体は導入していない。

## Signature / Usage

```rust
pub fn emoji(glyph: &str, size: Size) -> Node
```

```rust
use fandhe_frontend_wireframe_ui::{emoji, Size};

emoji("🙂", Size::Md);
emoji("👩\u{200d}💻", Size::Md); // ZWJ シーケンス
emoji("", Size::Md);            // 破線の円プレースホルダー
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| glyph | `&str` | （必須・既定値なし） | 表示する絵文字。空文字列のときは CSS の `:empty` 規則で破線の円プレースホルダーになる。複数コードポイントのシーケンス（ZWJ 等）も検証・切り詰めなしでそのまま出力する。 |
| size | `Size` | `Size::Md` | サイズ段階（xs〜xl）。フォントサイズに反映される。 |

## Notes

- 出典: https://fandhe-ai.github.io/fandhe-frontend/wireframes/emoji/
- 低忠実度ワイヤーフレーム部品。Primitives / Themes のコンポーネントとは別物で、`@ark-ui/react` / `@chakra-ui/react` の JS/TS API とも無関係（Rust 製）。
- アクセシブルな絵文字表示（`role="img"` / `aria-label` 付き）や任意ノードの差し込みが必要な場合は、Themes / Primitives 側の部品か `icon` モジュールを使う。
- 原案差分: `Option<Node>` スロット規約（§11.4）から意図的に逸脱し、`glyph: &str` の 1 引数へ畳み込み。
- モノクロ化は CSS の `filter: grayscale(1)`（色値リテラルなし）。
- 入力の検証・切り詰めはしない（「ちょうど 1 絵文字」は強制しない）。
- 非対話・ARIA なし: `role` / `aria-*` / `tabindex` / `style` / `href` / `src` / `on*` は出力しない。
- スクリーンショットは非掲載（視覚的参照元は blocks.pm の Emoji）。

## Related

- [Data Display wireframes](./overview.md)
- [Icon (wireframe)](./icon.md)
