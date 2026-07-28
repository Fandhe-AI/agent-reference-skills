# VisuallyHidden

視覚的には隠すが支援技術（スクリーンリーダー）には読ませ続けるテキストコンテナを提供する headless コンポーネント。単一パーツ（`root`）のみで、時間変化する内部状態を持たない。

## Signature / Usage

```rust
use fandhe_frontend_headless_ui::visually_hidden::root;
use fandhe_frontend_core::text;

let node = root(vec![], vec![text("補足テキスト")]);
```

## Anatomy

```
root
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `root: attrs` | `Vec<(&str, &str)>` | `vec![]` | 呼び出し側が追加する属性。`data-scope`/`data-part` は上書き不可 |
| `root: children` | `Vec<Node>` | `vec![]` | 視覚的には隠れるが支援技術には読み上げられるコンテンツ |

## Notes

- `aria-hidden` を一切出力しない不変条件を持つ（他の装飾的コンポーネントとは逆に、支援技術には読ませ続けることが存在意義）。
- CSS による視覚的な非表示（clip 手法）は styled 層（`fandhe-frontend-pre-styled-ui::visually_hidden`）の責務であり、本モジュール自体はスタイリングを持たない。
- `@ark-ui/react`/chakra-ui の JS/TS API とは別物（Rust 製）。`asChild`/`as` 合成 API は提供しない（ノード木 API のため対象外）。

## Related

- [Avatar](./avatar.md)
