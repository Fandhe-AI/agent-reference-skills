# Frame (wireframe)

`fandhe-frontend-wireframe-ui` の配置コンテナ部品。padding と境界線だけを持つ矩形のコンテナで、画面設計図上で領域をまとめる用途を想定する。blocks.pm に同名部品はなく、wireframe-ui 独自の追加部品。

## Signature / Usage

```rust
// fandhe-frontend-wireframe-ui 0.52.0 / src/frame.rs
#[must_use]
pub fn frame(children: Vec<Node>, padding: Size, bordered: bool) -> Node

// 呼び出し例
use fandhe_frontend_core::{p, text};
use fandhe_frontend_wireframe_ui::{annotation, frame, Primary, Size};

frame(
    vec![
        annotation("配置メモ", None, Size::Sm, Primary(false)),
        p(vec![], vec![text("フレーム内の段落。")]),
    ],
    Size::Md,
    true,
)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| children | `Vec<Node>` | - | 子ノード群。空でも空要素（`<div>`）が出力される。 |
| padding | `Size` | - | padding のサイズ段階（xs〜xl）。境界線幅・角丸には影響しない。 |
| bordered | `bool` | - | true のとき境界線を表示する。false でも境界線幅は透明で確保される。 |

## Notes

- 出典: https://fandhe-ai.github.io/fandhe-frontend/wireframes/frame/
- 低忠実度のワイヤーフレーム部品。Themes の Card（header / body / footer の anatomy を持つ）とは別物で、Frame は境界線と padding のみの単純な配置コンテナ
- `@ark-ui/react` / `@chakra-ui/react` の JS/TS API とは無関係（Rust 製）
- `children` は借用の `&[Node]` ではなく所有渡しの `Vec<Node>`（子ツリー全体の `clone()` を避けるため）
- `bordered=false` でも `border-color: transparent` として境界線幅を確保し、切り替えでレイアウト幅がずれない
- padding は共有 `fw-wire-size-*` ではなく Frame 専用 class `fw-wire-frame-padding-<段階>`（`0.75rem`〜`1.5rem`）で表現する。共有 class は `--fw-wire-font-size` も定義して子孫へ継承され、子部品の文字サイズまで変えてしまうため
- クレートは補助関数 `pub fn frame_padding_css() -> String` も公開する（`.fw-wire-frame.fw-wire-frame-padding-<段階> { padding: calc(<control_size> / 2); }` の 5 段 CSS を生成し、`wireframe_css` から呼ばれる）
- `role` / `aria-*` / `tabindex` は付与せず、`button` / `a[href]` も出力しない

## Related

- [Layout overview](./overview.md)
- [共通型 (Size)](../foundations/common-types.md)
- [Stack (wireframe)](./stack.md)
- [Card (Themes)](../../themes/data-display/card.md)
