# List

`fandhe-frontend-wireframe-ui` の箇条書きリストプレースホルダー。項目を縦に積んだ箇条書き（先頭マーカー + テキストの繰り返し）の配置イメージだけを示す非インタラクティブな部品。API は `list(items, ordered)` の 2 引数。

## Signature / Usage

```rust
pub fn list(items: Vec<Node>, ordered: bool) -> Node
```

```rust
use fandhe_frontend_core::text;
use fandhe_frontend_wireframe_ui::list;

list(vec![text("最初の手順"), text("次の手順"), text("最後の手順")], true);
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| items | `Vec<Node>` | - | 項目ノード列。渡した順序どおりに描画する。空でもルート div は出力する。 |
| ordered | `bool` | `false` | true のとき部品固有の修飾 class（`fw-wire-list-ordered`）を付与し、マーカーを箇条書きの小円から CSS カウンタによる番号へ切り替える。 |

## Notes

- 出典: https://fandhe-ai.github.io/fandhe-frontend/wireframes/list/
- 低忠実度ワイヤーフレーム部品。Themes の `List` とは別物で、`@ark-ui/react` / `@chakra-ui/react` の JS/TS API とも無関係（Rust 製）。操作可能なリストが必要な場合は Themes の List を使う。
- blocks.pm に対応部品がない wireframe-ui 独自追加部品。
- `items` は `Vec<Node>`（`grid` / `frame` / `stack` と同じく所有権を受け取る）。`Size` 引数は持たない（子孫へ `--fw-wire-font-size` が意図せず継承されるのを避けるため）。マーカー寸法は継承フォントに合わせた `em` 基準。
- `<ul>` / `<ol>` / `<li>` は出力せず `div` / `span` のみ。マーカーは CSS 擬似要素（`::before` の小円、または CSS カウンタ）で描き、DOM にマーカーノードを出さない。
- 入れ子: ある項目に「本文 + 入れ子 `list()`」を持たせるときは `div(vec![], vec![text("本文"), list(...)])` で 1 つの `Node` に合成してから渡す。入れ子 `list()` を `items` の別要素として並べると単なる隣接項目になり、`ordered` のカウンタも余分に進む。
- 行頭アイコンのスロットは持たない（項目 `Node` 自体で表現する）。`data-*` は出力しない。件数の上限は設けず、空の `Vec` でも panic しない。
- 配色は `--fw-wire-ink`（本文）・`--fw-wire-ink-muted`（マーカー・番号）のトークン。

## Related

- [Data Display wireframes](./overview.md)
- [List (Themes)](../../themes/typography/list.md)
