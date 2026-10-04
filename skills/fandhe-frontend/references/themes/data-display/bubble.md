# Bubble

AI チャット UI の「吹き出し 1 個」を表現するスタイル済み部品。塗り・枠線・無装飾の 3 形態、連続発言の角丸連結、リアクションチップ、折りたたみ詳細を持つ。

## Signature / Usage

```rust
use fandhe_frontend_core::text;
use fandhe_frontend_pre_styled_ui::bubble::{
    self, BubbleGroupPosition, BubbleRootProps, BubbleVariant, MessageAlign,
};

let node = bubble::root(
    BubbleRootProps {
        variant: BubbleVariant::Solid,
        align: MessageAlign::Start,
        group_position: BubbleGroupPosition::Single,
    },
    vec![],
    vec![bubble::content(vec![], vec![text("hi")])],
);
let css = bubble::stylesheet();
```

## Anatomy

`root` → `content` / `reactions`（→ `reaction`）/ `collapse-trigger` / `collapse-content`

## Options / Props

`BubbleRootProps`（headless 層の型を再エクスポート。`Default` 実装あり）:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `BubbleVariant`（`Solid` \| `Outline` \| `Plain`） | `Solid` | 形態（`data-variant`）。`solid` はアクセント塗り、`outline` は枠線のみ、`plain` は無装飾 |
| `align` | `MessageAlign`（`Start` \| `End`） | `Start` | 整列（`data-align`）。`End` で右寄せ |
| `group_position` | `BubbleGroupPosition`（`Single` \| `First` \| `Middle` \| `Last`） | `Single` | 連続発言内の位置（`data-group-position`）。`Single` は角丸が潰れない |

パーツ関数（すべて `#[must_use]`、呼び出し側 `class` は除去される）:

| Function | Signature |
|----------|-----------|
| `root` | `(props: BubbleRootProps, attrs: Vec<(&str, &str)>, children: Vec<Node>) -> Node` |
| `content` | `(attrs: Vec<(&str, &str)>, children: Vec<Node>) -> Node` |
| `reactions` | `(label: &str, attrs: Vec<(&str, &str)>, children: Vec<Node>) -> Node`（`label` は `aria-label`） |
| `reaction` | `(selected: bool, attrs: Vec<(&str, &str)>, children: Vec<Node>) -> Node`（`selected` で `data-selected`） |
| `collapse_trigger` | `(state: OpenState, controls: Option<&str>, attrs: Vec<(&str, &str)>, children: Vec<Node>) -> Node`（`controls` は `aria-controls`） |
| `collapse_content` | `(state: OpenState, id: Option<&str>, attrs: Vec<(&str, &str)>, children: Vec<Node>) -> Node` |
| `stylesheet` | `() -> String` |

再エクスポート: `BubbleRootProps` / `BubbleVariant` / `BubbleGroupPosition` / `MessageAlign` / `OpenState`。

## Notes

- 出典: https://fandhe-ai.github.io/fandhe-frontend/themes/bubble/
- `@chakra-ui/react` の JS/TS API とは別物（Rust 製）
- `variant` / `align` / `group-position` / `selected` / `state` は headless 層の `data-*` を CSS セレクタとして参照するだけで、class ベースの軸は持たない
- 実際の色調選択は `ColorPalette` 軸ではなく、`root` が公開する custom property `--fandhe-bubble-bg` / `--fandhe-bubble-fg` / `--fandhe-bubble-border` を呼び出し側が上書きするフックで行う。最大幅は `--fandhe-bubble-max-width`（既定 `32rem`）
- `reactions` / `reaction` は表示のみの非対話パーツ。押下・集計・トグル、`group-position` の算出、折りたたみのトグル自体はアプリケーションロジックで、この部品では実装しない
- 開閉は headless 層が出力する `hidden` 属性で行う。`calc-size()` 対応ブラウザでは `@starting-style` + `transition-behavior: allow-discrete` による高さトランジションになり、未対応ブラウザでは `hidden` の即時切替になる（`collapsible` / `accordion` と同じ共通機構）
- `(bubble, collapse-trigger)` は `fandhe-frontend-wasm-full` の `MAPPING_TABLE` に未配線のため、`wire_headless_component` 経由のクリックでは `hidden` の切替が dispatch されない。呼び出し側が独自に `data-state` / `hidden` を切り替える必要がある

## Related

- [Primitives: Bubble](../../primitives/display/bubble.md)
- [Message](./message.md)
- [Marker](./marker.md)
- [Attachment](./attachment.md)
