# VisuallyHidden

`fandhe_frontend_headless_ui::visually_hidden` の唯一のパーツ `root` を薄く再利用し、clip 手法（chakra-ui の VisuallyHidden 相当）の既定 CSS を追加する styled ラッパー。見た目のバリエーションを持たない単一の振る舞い（常に clip される）のため variant 軸は提供しない。

## Signature / Usage

```rust
use fandhe_frontend_pre_styled_ui::visually_hidden::root;

let node = root(vec![], vec![/* text("補足テキスト") */]);
```

```rust
pub fn root<'a>(attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node;
```

## Anatomy

- `root` — 唯一のパーツ

## Notes

- `position: absolute` + `width`/`height: 1px` + `clip: rect(0, 0, 0, 0)` + `overflow: hidden` の clip 手法で、視覚的には縮小しつつ DOM 上には残す（スクリーンリーダーは読み上げ続ける）
- `display: none`/`visibility: hidden` は使わない（支援技術からも要素が除外されてしまうため）
- `aria-hidden` を一切出力しない不変条件を持つ
- `size`/`color-palette` いずれの標準 variant 軸も意味を持たないため提供しない
- 呼び出し側 `class` は除去してから合成する（本部品は variant クラスを持たないため `class` 属性自体を付与しない）
- Themes は Primitives（`fandhe_frontend_headless_ui::visually_hidden`）への薄いラッパーであり、clip_declarations による既定 CSS のみを追加する（`crate::skip_nav::link` の base 宣言とも共有する単一情報源）
- `@ark-ui/react`/chakra-ui の JS/TS API とは別物（Rust 製）

## Related

- [VisuallyHidden (primitives)](../../primitives/display/visually-hidden.md)
- [SkipNav](./skip-nav.md)
